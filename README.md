![](docs/img/icon.png)

# Typing Speedometer

![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/edvilme.typingspeedometer) 
![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/edvilme.typingspeedometer)


Developers are weird, we flex over random non-technical skills such as typing speed. Use this extension to track your typing speed and keystrokes in Visual Studio Code.

## Features

- Counts keystrokes in the editor
- Persists keystroke count between sessions
- Shows high scores for different time ranges
- Configurable session timeout

## Usage

1. Install the extension.
2. Start typing in any editor window. The extension will automatically count your keystrokes per second.
![](docs/img/status_bar.png)
3. High scores will be automatically saved! Break your own records!
![](docs/img/new_high_score.png)
4. Check your high score with <key>Ctrl</key> <key>Alt</key> <key>S</key>, or by using the Command Palette.
![](docs/img/check_high_score.png)

## Settings

- `typingspeedometer.sessionTimeout`: Timeout duration for typing sessions in milliseconds (default: 3000)

## Development

- Source code in `src/`
- Main logic in `src/commands/`

## License

MIT
