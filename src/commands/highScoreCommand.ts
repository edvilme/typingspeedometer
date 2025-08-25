import * as vscode from 'vscode';

export default function generateHighScoreCommand(context: vscode.ExtensionContext) {
    return vscode.commands.registerCommand('typingspeedometer.showHighScore', async () => {
        const highScoreKPS = context.globalState.get<number>('typingspeedometer.highScoreKPS', 0);
        const highScoreWPM = context.globalState.get<number>('typingspeedometer.highScoreWPM', 0);
        const highScoreAccuracy = context.globalState.get<number>('typingspeedometer.highScoreAccuracy', 0);
        
        // Backward compatibility for legacy high score
        const legacyHighScore = context.globalState.get<number>('typingspeedometer.highScore', 0);
        const displayKPS = highScoreKPS || legacyHighScore;

        const message = `🏆 Your High Scores:\n\n` +
                       `⚡ Speed: ${highScoreWPM.toFixed(1)} WPM (${displayKPS.toFixed(1)} KPS)\n` +
                       `🎯 Accuracy: ${highScoreAccuracy.toFixed(1)}%`;

        const command = await vscode.window.showInformationMessage(
            message, 
            "Reset High Scores", 
            "Export Stats"
        );

        if (command === "Reset High Scores") {
            context.globalState.update('typingspeedometer.highScore', 0);
            context.globalState.update('typingspeedometer.highScoreKPS', 0);
            context.globalState.update('typingspeedometer.highScoreWPM', 0);
            context.globalState.update('typingspeedometer.highScoreAccuracy', 0);
            vscode.window.showInformationMessage(`All high scores have been reset.`);
        } else if (command === "Export Stats") {
            await exportTypingStats(context);
        }
    });
}

async function exportTypingStats(context: vscode.ExtensionContext) {
    const stats = {
        highScores: {
            wpm: context.globalState.get<number>('typingspeedometer.highScoreWPM', 0),
            kps: context.globalState.get<number>('typingspeedometer.highScoreKPS', 0),
            accuracy: context.globalState.get<number>('typingspeedometer.highScoreAccuracy', 0)
        },
        exportDate: new Date().toISOString(),
        extension: 'typing-speedometer',
        version: '1.1.0'
    };

    const statsJson = JSON.stringify(stats, null, 2);
    
    try {
        const document = await vscode.workspace.openTextDocument({
            content: statsJson,
            language: 'json'
        });
        await vscode.window.showTextDocument(document);
        vscode.window.showInformationMessage('📊 Typing statistics exported! Save this file to keep your records.');
    } catch (error) {
        vscode.window.showErrorMessage('Failed to export statistics');
    }
}