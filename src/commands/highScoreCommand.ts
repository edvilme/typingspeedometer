import * as vscode from 'vscode';
import { strings } from '../strings';

export default function generateHighScoreCommand(context: vscode.ExtensionContext) {
    return vscode.commands.registerCommand('typingspeedometer.showHighScore', async () => {
        const highScore = context.globalState.get<number>('typingspeedometer.highScore', 0);
        const wordsPerMinuteHighScore = context.globalState.get<number>('typingspeedometer.wordsPerMinuteHighScore', 0);

        const command = await vscode.window.showInformationMessage(
            strings.highScore.displayMessage(String(highScore), String(wordsPerMinuteHighScore)), 
            strings.highScore.resetButton
        );

        if (command === strings.highScore.resetButton) {
            context.globalState.update('typingspeedometer.highScore', 0);
            context.globalState.update('typingspeedometer.wordsPerMinuteHighScore', 0);
            vscode.window.showInformationMessage(strings.highScore.resetConfirmation);
        }
    });
}