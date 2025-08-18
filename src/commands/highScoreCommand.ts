import * as vscode from 'vscode';

export default function generateHighScoreCommand(context: vscode.ExtensionContext) {
    return vscode.commands.registerCommand('typingspeed.showHighScore', async () => {
        const highScore = context.globalState.get<number>('typingspeed.highScore', 0);

        const command = await vscode.window.showInformationMessage(`Typing Speed High Score: ${highScore}`, "Reset High Score");

        if (command === "Reset High Score") {
            context.globalState.update('typingspeed.highScore', 0);
            vscode.window.showInformationMessage(`High Score has been reset.`);
        }
    });
}