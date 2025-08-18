import * as vscode from 'vscode';

// const TYPING_TIMEOUT_MS = 3_000;

export default function generateTypeCommand(context: vscode.ExtensionContext) {
    const TYPING_TIMEOUT_MS = vscode.workspace.getConfiguration('typingspeed').get<number>('sessionTimeout', 3000);
    return vscode.commands.registerTextEditorCommand('typingspeed.textType', (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
		// Get the current time
		const currentTime = new Date();

		// Get the last session data
		const lastSessionKeystrokes: number = context.globalState.get<number>('typingspeed.sessionKeystrokes', 0);
		const lastSessionStartTime: Date = new Date(context.globalState.get<Date>('typingspeed.sessionStartTime', new Date()));
		const lastSessionEndTime: Date = new Date(context.globalState.get<Date>('typingspeed.sessionEndTime', new Date()));
		
		// If last session ended more than <TYPING_TIMEOUT> seconds ago
		if (lastSessionEndTime && (currentTime.getTime() - lastSessionEndTime.getTime()) > TYPING_TIMEOUT_MS) {
			// Reset the session data
			context.globalState.update('typingspeed.sessionKeystrokes', 0);
			context.globalState.update('typingspeed.sessionStartTime', new Date());
			context.globalState.update('typingspeed.sessionEndTime', new Date());
			return;
		}

		// Increment the session keystrokes
		const currentSessionKeyStrokes = lastSessionKeystrokes + 1;

		// Typing speed
		const duration: number = currentTime.getTime() - lastSessionStartTime.getTime();
		const typingSpeed: number = (currentSessionKeyStrokes / duration) * 1_000; // keystrokes per second
		
		// Update states
		context.globalState.update('typingspeed.sessionEndTime', new Date());
		context.globalState.update('typingspeed.sessionKeystrokes', currentSessionKeyStrokes);

		// High Score
		const highScore = context.globalState.get<number>('typingspeed.highScore', 0);
		if (typingSpeed > highScore && duration > TYPING_TIMEOUT_MS) {
			context.globalState.update('typingspeed.highScore', typingSpeed.toFixed(2));
			vscode.window.showInformationMessage(`Typing Speed New High Score: ${typingSpeed.toFixed(2)} keys/sec!`);
		}

		vscode.window.setStatusBarMessage(`$(keyboard) Current typing speed: ${typingSpeed.toFixed(2)} keys/sec`, TYPING_TIMEOUT_MS);
	});
}