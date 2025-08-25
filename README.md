![](docs/img/icon.png)

# Typing Speedometer

![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/edvilme.typingspeedometer) 
![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/edvilme.typingspeedometer)


Developers are weird, we flex over random non-technical skills such as typing speed. Use this extension to track your typing speed and keystrokes in Visual Studio Code.

## Features

- **Multiple Metrics**: Tracks keystrokes per second (KPS), words per minute (WPM), and typing accuracy
- **Real-time Display**: Configurable status bar showing your current typing performance
- **High Score Tracking**: Saves and displays personal bests for speed and accuracy
- **Accuracy Monitoring**: Tracks corrections and backspaces to calculate typing precision
- **Detailed Statistics**: Comprehensive session analytics and performance insights
- **Data Export**: Export your typing statistics for external analysis
- **Configurable Display**: Multiple status bar formats to suit your preference
- **Session Management**: Configurable timeout for typing sessions
- **Keyboard Shortcuts**: Quick access to statistics and high scores

## Usage

1. **Install the extension** from the VS Code marketplace.
2. **Start typing** in any editor window. The extension automatically tracks your typing metrics:
   - **WPM (Words Per Minute)**: Industry-standard typing speed measurement
   - **KPS (Keystrokes Per Second)**: Raw keystroke frequency  
   - **Accuracy**: Typing precision based on corrections and backspaces

![](docs/img/status_bar.png)

3. **High scores** are automatically saved when you achieve new personal bests!
![](docs/img/new_high_score.png)

4. **View your statistics**:
   - Press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>S</kbd> to see high scores
   - Press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> to view detailed statistics
   - Use the Command Palette and search for "Typing Speed"
![](docs/img/check_high_score.png)

5. **Export your data**: Click "Export Stats" in the high score dialog to save your typing analytics

## Settings

Configure the extension to match your preferences:

- **`typingspeedometer.sessionTimeout`**: Timeout duration for typing sessions in milliseconds (default: 3000)
- **`typingspeedometer.displayFormat`**: Choose status bar display format:
  - `full`: Show WPM, KPS, and accuracy (default)
  - `wmp-only`: Show only words per minute  
  - `kps-only`: Show only keystrokes per second
  - `compact`: Show WPM and accuracy only
- **`typingspeedometer.showAccuracy`**: Whether to track and display typing accuracy (default: true)

## Keyboard Shortcuts

- <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>S</kbd>: Show high scores and export options
- <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd>: Show detailed statistics and performance insights

## Development

- Source code in `src/`
- Main logic in `src/commands/`

## License

MIT
