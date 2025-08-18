// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import generateHighScoreCommand from './commands/highScoreCommand';
import generateTypeCommand from './commands/typeCommand';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "typingspeed" is now active!');

	context.globalState.update('typingspeed.sessionKeystrokes', 0);
	context.globalState.update('typingspeed.sessionStartTime', new Date());
	context.globalState.update('typingspeed.sessionEndTime', new Date());
	context.globalState.update('typingspeed.highScore', 0);

	// High Score Command
	context.subscriptions.push(generateHighScoreCommand(context));

	// Text Type Command (for manual invocation, if needed)
	context.subscriptions.push(generateTypeCommand(context));

	// Override the built-in 'type' command
	const typeOverride = vscode.commands.registerCommand('type', async (args) => {
		vscode.commands.executeCommand('typingspeed.textType');
		await vscode.commands.executeCommand('default:type', args);
	});

	context.subscriptions.push(typeOverride);
}

// This method is called when your extension is deactivated
export function deactivate() {}
