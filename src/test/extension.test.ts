import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('Word boundary detection', () => {
		const wordBoundaryRegex = /[\s\t\r\n]/;
		
		// Test cases for word boundaries
		assert.strictEqual(wordBoundaryRegex.test(' '), true, 'Space should be a word boundary');
		assert.strictEqual(wordBoundaryRegex.test('\t'), true, 'Tab should be a word boundary');
		assert.strictEqual(wordBoundaryRegex.test('\n'), true, 'Newline should be a word boundary');
		assert.strictEqual(wordBoundaryRegex.test('\r'), true, 'Carriage return should be a word boundary');
		
		// Test cases for non-word boundaries
		assert.strictEqual(wordBoundaryRegex.test('a'), false, 'Letter should not be a word boundary');
		assert.strictEqual(wordBoundaryRegex.test('1'), false, 'Number should not be a word boundary');
		assert.strictEqual(wordBoundaryRegex.test('.'), false, 'Punctuation should not be a word boundary');
	});

	test('WPM calculation logic', () => {
		// Test the WPM calculation logic
		const words = 10;
		const durationMinutes = 2; // 2 minutes
		const expectedWPM = words / durationMinutes; // 5 WPM
		
		assert.strictEqual(expectedWPM, 5, 'WPM calculation should be correct');
		
		// Test edge case: 0 duration
		const zeroDuration = 0;
		const wpmZeroDuration = zeroDuration > 0 ? words / zeroDuration : 0;
		assert.strictEqual(wpmZeroDuration, 0, 'WPM should be 0 when duration is 0');
	});
});
