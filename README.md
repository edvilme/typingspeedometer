# Typing Speed VS Code Extension

Developers are weird, we flex over random non-technical skills such as typing speed. Use this extension to track your typing speed and keystrokes in Visual Studio Code.

## Features

- Counts keystrokes in the editor
- Persists keystroke count between sessions
- Shows high scores for different time ranges
- Configurable session timeout

## Usage

1. Install the extension.
2. Start typing in any editor window. The extension will automatically count your keystrokes per second.
3. Use the Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`) and run:
	- `Show High Score` to view your stats
	- `Text Typing` to trigger typing logic manually

## Settings

- `typingspeed.sessionTimeout`: Timeout duration for typing sessions in milliseconds (default: 3000)

## Development

- Source code in `src/`
- Main logic in `src/commands/`

## License

MIT
