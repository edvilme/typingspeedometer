# Change Log

All notable changes to the "typingspeedometer" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.1.0] - 2024-12-19

### Added
- **Words Per Minute (WPM) calculation** - Industry standard typing speed metric
- **Accuracy tracking** - Monitors typing precision by tracking corrections and backspaces
- **Enhanced status bar display** - Shows WPM, KPS, and accuracy with configurable formats
- **Detailed statistics command** - Comprehensive session analytics (Ctrl+Alt+T)
- **Data export functionality** - Export typing statistics as JSON
- **Multiple high score tracking** - Separate records for speed (WPM/KPS) and accuracy
- **Configurable display options** - Choose between full, compact, WMP-only, or KPS-only formats
- **Improved high score dialog** - Shows all metrics with export and reset options

### Enhanced
- **High score notifications** - Now shows WPM, KPS, and accuracy in new high score alerts
- **Status bar display** - More informative and customizable format
- **Configuration options** - Added display format and accuracy tracking preferences
- **Keyboard shortcuts** - Added Ctrl+Alt+T for detailed statistics

### Technical Improvements
- Better state management for new metrics
- Backward compatibility with existing high scores
- Type safety improvements with TypeScript interfaces
- Enhanced error handling for export functionality

## [1.0.1] - Previous Release
- Initial release with basic keystroke tracking