import * as vscode from 'vscode';

interface TypingStats {
	kps: number;
	wpm: number;
	accuracy: number;
	duration: number;
	keystrokes: number;
	corrections: number;
}

export default function generateTypeCommand(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('typingspeedometer');
    const typingTimeoutMilliseconds = config.get<number>('sessionTimeout', 3000);
    const displayFormat = config.get<string>('displayFormat', 'full');
    const showAccuracy = config.get<boolean>('showAccuracy', true);
    
    return vscode.commands.registerTextEditorCommand('typingspeedometer.textType', (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, args: any) => {
		// Get the current time
		const currentTime = new Date();

		// Get the last session data
		const lastSessionKeystrokes: number = context.globalState.get<number>('typingspeedometer.sessionKeystrokes', 0);
		const lastSessionCorrections: number = context.globalState.get<number>('typingspeedometer.sessionCorrections', 0);
		const lastSessionStartTime: Date = new Date(context.globalState.get<Date>('typingspeedometer.sessionStartTime', new Date()));
		const lastSessionEndTime: Date = new Date(context.globalState.get<Date>('typingspeedometer.sessionEndTime', new Date()));
		
		// If last session ended more than <TYPING_TIMEOUT> seconds ago
		if (lastSessionEndTime && (currentTime.getTime() - lastSessionEndTime.getTime()) > typingTimeoutMilliseconds) {
			// Reset the session data
			context.globalState.update('typingspeedometer.sessionKeystrokes', 0);
			context.globalState.update('typingspeedometer.sessionCorrections', 0);
			context.globalState.update('typingspeedometer.sessionStartTime', new Date());
			context.globalState.update('typingspeedometer.sessionEndTime', new Date());
			return;
		}

		// Check if this is a correction (backspace or delete)
		const isCorrection = args && (args.text === '' || args.text === undefined) && args.rangeLength > 0;
		
		// Increment the session keystrokes and corrections
		const currentSessionKeyStrokes = lastSessionKeystrokes + 1;
		const currentSessionCorrections = isCorrection ? lastSessionCorrections + 1 : lastSessionCorrections;

		// Calculate typing metrics
		const duration: number = currentTime.getTime() - lastSessionStartTime.getTime();
		const kps: number = (currentSessionKeyStrokes / duration) * 1_000; // keystrokes per second
		const wpm: number = (currentSessionKeyStrokes / 5 / duration) * 60_000; // words per minute (5 chars = 1 word)
		const accuracy: number = duration > 0 ? Math.max(0, ((currentSessionKeyStrokes - currentSessionCorrections) / currentSessionKeyStrokes) * 100) : 100;
		
		// Update states
		context.globalState.update('typingspeedometer.sessionEndTime', new Date());
		context.globalState.update('typingspeedometer.sessionKeystrokes', currentSessionKeyStrokes);
		context.globalState.update('typingspeedometer.sessionCorrections', currentSessionCorrections);

		// Create typing stats object
		const stats: TypingStats = {
			kps,
			wpm,
			accuracy,
			duration,
			keystrokes: currentSessionKeyStrokes,
			corrections: currentSessionCorrections
		};

		// High Score tracking (now tracks multiple metrics)
		const highScoreKPS = context.globalState.get<number>('typingspeedometer.highScoreKPS', 0);
		const highScoreWPM = context.globalState.get<number>('typingspeedometer.highScoreWPM', 0);
		const highScoreAccuracy = context.globalState.get<number>('typingspeedometer.highScoreAccuracy', 0);
		
		let newHighScore = false;
		if (duration > typingTimeoutMilliseconds) {
			if (kps > highScoreKPS) {
				context.globalState.update('typingspeedometer.highScoreKPS', parseFloat(kps.toFixed(2)));
				context.globalState.update('typingspeedometer.highScore', parseFloat(kps.toFixed(2))); // Backward compatibility
				newHighScore = true;
			}
			if (wpm > highScoreWPM) {
				context.globalState.update('typingspeedometer.highScoreWPM', parseFloat(wpm.toFixed(2)));
				newHighScore = true;
			}
			if (accuracy > highScoreAccuracy) {
				context.globalState.update('typingspeedometer.highScoreAccuracy', parseFloat(accuracy.toFixed(1)));
				newHighScore = true;
			}
		}

		if (newHighScore) {
			vscode.window.showInformationMessage(`🎉 New High Score! ${wpm.toFixed(1)} WPM | ${kps.toFixed(1)} KPS | ${accuracy.toFixed(1)}% accuracy`);
		}

		// Enhanced status bar display with configurable format
		let statusMessage: string;
		switch (displayFormat) {
			case 'wpm-only':
				statusMessage = `$(keyboard) ${wpm.toFixed(1)} WPM`;
				break;
			case 'kps-only':
				statusMessage = `$(keyboard) ${kps.toFixed(1)} KPS`;
				break;
			case 'compact':
				statusMessage = showAccuracy ? 
					`$(keyboard) ${wpm.toFixed(1)} WPM | ${accuracy.toFixed(1)}%` :
					`$(keyboard) ${wpm.toFixed(1)} WPM`;
				break;
			case 'full':
			default:
				statusMessage = showAccuracy ?
					`$(keyboard) ${wpm.toFixed(1)} WPM | ${kps.toFixed(1)} KPS | ${accuracy.toFixed(1)}% acc` :
					`$(keyboard) ${wpm.toFixed(1)} WPM | ${kps.toFixed(1)} KPS`;
				break;
		}
		vscode.window.setStatusBarMessage(statusMessage, typingTimeoutMilliseconds);
	});
}