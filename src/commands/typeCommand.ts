import * as vscode from 'vscode';

export default function generateTypeCommand(context: vscode.ExtensionContext) {
    const typingTimeoutMilliseconds = vscode.workspace.getConfiguration('typingspeedometer').get<number>('sessionTimeout', 3000);
    return vscode.commands.registerTextEditorCommand('typingspeedometer.textType', (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, args?: { text: string }) => {
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
		
		if (typingspeedometer > highScore && duration > typingTimeoutMilliseconds) {
			context.globalState.update('typingspeedometer.highScore', typingspeedometer.toFixed(2));
			vscode.window.showInformationMessage(`Typing Speed New High Score: ${typingspeedometer.toFixed(2)} keys/sec!`);
		}
		
		if (wordsPerMinute > wordsPerMinuteHighScore && duration > typingTimeoutMilliseconds && currentSessionWords > 0) {
			context.globalState.update('typingspeedometer.wordsPerMinuteHighScore', wordsPerMinute.toFixed(2));
			vscode.window.showInformationMessage(`WPM New High Score: ${wordsPerMinute.toFixed(2)} words/min!`);
		}

		vscode.window.setStatusBarMessage(`$(keyboard) ${typingspeedometer.toFixed(2)} keys/sec | ${wordsPerMinute.toFixed(1)} WPM`, typingTimeoutMilliseconds);
	});
}