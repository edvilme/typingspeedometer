import * as vscode from 'vscode';

export default function generateTypeCommand(context: vscode.ExtensionContext) {
    const typingTimeoutMilliseconds = vscode.workspace.getConfiguration('typingspeedometer').get<number>('sessionTimeout', 3000);
    return vscode.commands.registerTextEditorCommand('typingspeedometer.textType', (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
		// Get the current time
		const currentTime = new Date();

		// Get the last session data
		const lastSessionKeystrokes: number = context.globalState.get<number>('typingspeedometer.sessionKeystrokes', 0);
		const lastSessionStartTime: Date = new Date(context.globalState.get<Date>('typingspeedometer.sessionStartTime', new Date()));
		const lastSessionEndTime: Date = new Date(context.globalState.get<Date>('typingspeedometer.sessionEndTime', new Date()));
		
		// If last session ended more than <TYPING_TIMEOUT> seconds ago
		if (lastSessionEndTime && (currentTime.getTime() - lastSessionEndTime.getTime()) > typingTimeoutMilliseconds) {
			// Reset the session data
			context.globalState.update('typingspeedometer.sessionKeystrokes', 0);
			context.globalState.update('typingspeedometer.sessionStartTime', new Date());
			context.globalState.update('typingspeedometer.sessionEndTime', new Date());
			return;
		}

		// Increment the session keystrokes
		const currentSessionKeyStrokes = lastSessionKeystrokes + 1;

		// Typing speed
		const duration: number = currentTime.getTime() - lastSessionStartTime.getTime();
		const typingspeedometer: number = (currentSessionKeyStrokes / duration) * 1_000; // keystrokes per second
		
		// Update states
		context.globalState.update('typingspeedometer.sessionEndTime', new Date());
		context.globalState.update('typingspeedometer.sessionKeystrokes', currentSessionKeyStrokes);

		// High Score
		const highScore = context.globalState.get<number>('typingspeedometer.highScore', 0);
		if (typingspeedometer > highScore && duration > typingTimeoutMilliseconds) {
			context.globalState.update('typingspeedometer.highScore', typingspeedometer.toFixed(2));
			vscode.window.showInformationMessage(`Typing Speed New High Score: ${typingspeedometer.toFixed(2)} keys/sec!`);
		}

		vscode.window.setStatusBarMessage(`$(keyboard) Current typing speed: ${typingspeedometer.toFixed(2)} keys/sec`, typingTimeoutMilliseconds);
	});
}