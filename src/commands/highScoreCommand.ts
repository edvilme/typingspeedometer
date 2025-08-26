import * as vscode from 'vscode';

export default function generateHighScoreCommand(context: vscode.ExtensionContext) {
    return vscode.commands.registerCommand('typingspeedometer.showHighScore', async () => {
        const highScore = context.globalState.get<number>('typingspeedometer.highScore', 0);
        const wordsPerMinuteHighScore = context.globalState.get<number>('typingspeedometer.wordsPerMinuteHighScore', 0);

        const command = await vscode.window.showInformationMessage(
            `High Scores - Keystrokes: ${highScore} keys/sec | WPM: ${wordsPerMinuteHighScore} words/min`, 
            "Reset High Scores"
        );

        if (command === "Reset High Scores") {
            context.globalState.update('typingspeedometer.highScore', 0);
            context.globalState.update('typingspeedometer.wordsPerMinuteHighScore', 0);
            vscode.window.showInformationMessage(`High Scores have been reset.`);
        }
    });
}