import * as vscode from 'vscode';

export default function generateHighScoreCommand(context: vscode.ExtensionContext) {
    return vscode.commands.registerCommand('typingspeedometer.showHighScore', async () => {
        const highScore = context.globalState.get<number>('typingspeedometer.highScore', 0);
        const wpmHighScore = context.globalState.get<number>('typingspeedometer.wpmHighScore', 0);

        const command = await vscode.window.showInformationMessage(
            `High Scores - Keystrokes: ${highScore} keys/sec | WPM: ${wpmHighScore} words/min`, 
            "Reset High Scores"
        );

        if (command === "Reset High Scores") {
            context.globalState.update('typingspeedometer.highScore', 0);
            context.globalState.update('typingspeedometer.wpmHighScore', 0);
            vscode.window.showInformationMessage(`High Scores have been reset.`);
        }
    });
}