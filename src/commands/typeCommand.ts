import * as vscode from 'vscode';

function checkAndNotifyHighScore({
    score,
    highScore,
    key,
    message,
    condition,
    context,
    command
}: {
    score: number;
    highScore: number;
    key: string;
    message: string;
    condition: boolean;
    context: vscode.ExtensionContext,
    command?: string;
}) {
    if (score > highScore && condition) {
        context.globalState.update(key, score.toFixed(2));
        vscode.window.showInformationMessage(
            message,
            'Share...'
        ).then(selection => {
            if (selection === 'Share...') {
                vscode.commands.executeCommand(command ?? 'typingspeedometer.shareStats');
            }
        });
    }
}

export function handleTyping(context: vscode.ExtensionContext, args?: { text: string }) {
    const typingTimeoutMilliseconds = vscode.workspace.getConfiguration('typingspeedometer').get<number>('sessionTimeout', 3000);

    // Get the current time
    const currentTime = new Date();

    // Get the last session data
    const lastSessionKeystrokes: number = context.globalState.get<number>('typingspeedometer.sessionKeystrokes', 0);
    const lastSessionWords: number = context.globalState.get<number>('typingspeedometer.sessionWords', 0);
    const lastSessionStartTime: Date = new Date(context.globalState.get<Date>('typingspeedometer.sessionStartTime', new Date()));
    const lastSessionEndTime: Date = new Date(context.globalState.get<Date>('typingspeedometer.sessionEndTime', new Date()));

    // If last session ended more than <TYPING_TIMEOUT> seconds ago
    if (lastSessionEndTime && (currentTime.getTime() - lastSessionEndTime.getTime()) > typingTimeoutMilliseconds) {
        // Reset the session data
        context.globalState.update('typingspeedometer.sessionKeystrokes', 0);
        context.globalState.update('typingspeedometer.sessionWords', 0);
        context.globalState.update('typingspeedometer.sessionStartTime', new Date());
        context.globalState.update('typingspeedometer.sessionEndTime', new Date());
        return;
    }

    // Increment the session keystrokes
    const currentSessionKeyStrokes = lastSessionKeystrokes + 1;

    // Check if this keystroke represents a word boundary (space, tab, or enter)
    const isWordBoundary = args?.text && /[\s\t\r\n]/.test(args.text);
    const currentSessionWords = isWordBoundary ? lastSessionWords + 1 : lastSessionWords;

    // Typing speed calculations
    const duration: number = currentTime.getTime() - lastSessionStartTime.getTime();
    const durationInMinutes: number = duration / (1_000 * 60); // Convert to minutes
    const typingspeedometer: number = (currentSessionKeyStrokes / duration) * 1_000; // keystrokes per second
    const wordsPerMinute: number = durationInMinutes > 0 ? currentSessionWords / durationInMinutes : 0;

    // Update states
    context.globalState.update('typingspeedometer.sessionEndTime', new Date());
    context.globalState.update('typingspeedometer.sessionKeystrokes', currentSessionKeyStrokes);
    context.globalState.update('typingspeedometer.sessionWords', currentSessionWords);

    // High Score
    const highScore = context.globalState.get<number>('typingspeedometer.highScore', 0);
    const wordsPerMinuteHighScore = context.globalState.get<number>('typingspeedometer.wordsPerMinuteHighScore', 0);

    checkAndNotifyHighScore({
        context: context,
        score: typingspeedometer,
        highScore: highScore,
        key: 'typingspeedometer.highScore',
        message: `Typing Speed New High Score: ${typingspeedometer.toFixed(2)} keys/sec!`,
        condition: duration > typingTimeoutMilliseconds,
    });

    checkAndNotifyHighScore({
        context: context,
        score: wordsPerMinute,
        highScore: wordsPerMinuteHighScore,
        key: 'typingspeedometer.wordsPerMinuteHighScore',
        message: `WPM New High Score: ${wordsPerMinute.toFixed(2)} words/min!`,
        condition: duration > typingTimeoutMilliseconds && currentSessionWords > 0,
    });

    vscode.window.setStatusBarMessage(`$(keyboard) ${typingspeedometer.toFixed(2)} keys/sec | ${wordsPerMinute.toFixed(1)} WPM`, typingTimeoutMilliseconds);
}

export default function generateTypeCommand(context: vscode.ExtensionContext) {
    return vscode.commands.registerTextEditorCommand('typingspeedometer.textType', (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, args?: { text: string }) => {
        handleTyping(context, args);
    });
}