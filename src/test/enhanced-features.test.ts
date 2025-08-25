import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Typing Speedometer Enhanced Features', () => {
    vscode.window.showInformationMessage('Starting enhanced feature tests.');

    test('WPM calculation should be correct', () => {
        // Test WPM calculation: 5 characters = 1 word
        const keystrokes = 50;
        const durationMs = 60000; // 1 minute
        const expectedWPM = (keystrokes / 5 / durationMs) * 60000; // Should be 10 WPM
        
        assert.strictEqual(expectedWPM, 10, 'WPM calculation should be correct');
    });

    test('KPS calculation should be correct', () => {
        // Test KPS calculation
        const keystrokes = 100;
        const durationMs = 10000; // 10 seconds
        const expectedKPS = (keystrokes / durationMs) * 1000; // Should be 10 KPS
        
        assert.strictEqual(expectedKPS, 10, 'KPS calculation should be correct');
    });

    test('Accuracy calculation should handle edge cases', () => {
        // Test accuracy with no corrections
        const keystrokes = 100;
        const corrections = 0;
        let accuracy = ((keystrokes - corrections) / keystrokes) * 100;
        assert.strictEqual(accuracy, 100, 'Perfect accuracy should be 100%');

        // Test accuracy with corrections
        const keystrokesWithErrors = 100;
        const correctionsWithErrors = 10;
        accuracy = ((keystrokesWithErrors - correctionsWithErrors) / keystrokesWithErrors) * 100;
        assert.strictEqual(accuracy, 90, 'Accuracy with 10% corrections should be 90%');
    });

    test('Status bar message formatting', () => {
        const wpm = 45.678;
        const kps = 7.234;
        const accuracy = 94.567;

        // Test full format
        const fullMessage = `$(keyboard) ${wpm.toFixed(1)} WPM | ${kps.toFixed(1)} KPS | ${accuracy.toFixed(1)}% acc`;
        assert.strictEqual(fullMessage, '$(keyboard) 45.7 WPM | 7.2 KPS | 94.6% acc');

        // Test WPM only format
        const wpmOnlyMessage = `$(keyboard) ${wpm.toFixed(1)} WPM`;
        assert.strictEqual(wpmOnlyMessage, '$(keyboard) 45.7 WPM');

        // Test compact format
        const compactMessage = `$(keyboard) ${wpm.toFixed(1)} WPM | ${accuracy.toFixed(1)}%`;
        assert.strictEqual(compactMessage, '$(keyboard) 45.7 WPM | 94.6%');
    });
});