// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import generateHighScoreCommand from './commands/highScoreCommand';
import generateTypeCommand, { handleTyping } from './commands/typeCommand';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "typingspeedometer" is now active!');

	context.globalState.update('typingspeedometer.sessionKeystrokes', 0);
	context.globalState.update('typingspeedometer.sessionWords', 0);
	context.globalState.update('typingspeedometer.sessionStartTime', new Date());
	context.globalState.update('typingspeedometer.sessionEndTime', new Date());
	context.globalState.update('typingspeedometer.highScore', 0);
	context.globalState.update('typingspeedometer.wordsPerMinuteHighScore', 0);

	// High Score Command
	context.subscriptions.push(generateHighScoreCommand(context));

	// Text Type Command (for manual invocation, if needed)
	context.subscriptions.push(generateTypeCommand(context));

	// Override the built-in 'type' command
	const typeOverride = vscode.commands.registerCommand('type', async (args: { text: string }) => {
		const activeEditor = vscode.window.activeTextEditor;
		if (activeEditor) {
			handleTyping(context, args);
		}
		await vscode.commands.executeCommand('default:type', args);
	});

	context.subscriptions.push(typeOverride);
}

// This method is called when your extension is deactivated
export function deactivate() {}
