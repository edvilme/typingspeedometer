# Change Log

All notable changes to the "typingspeedometer" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [1.1.0] - 2024-12-20

### Added
- Comprehensive CHANGELOG.md with complete feature history
- GitHub Copilot automation instructions for maintaining CHANGELOG.md
- Mandatory version bumping requirements for every pull request
- Automated maintenance guidelines with semantic versioning rules

### Changed
- Enhanced documentation structure following Keep a Changelog format
- Improved development workflow with automated changelog maintenance

## [1.0.2] - 2024-12-19

### Added
- Words Per Minute (WPM) calculation and display
- Real-time WPM tracking alongside keystroke speed
- High score tracking for both keystroke speed and WPM
- Word boundary detection for spaces, tabs, and enters
- High score notifications for both metrics
- Reset high scores functionality

### Changed
- Status bar now displays both keystroke speed and WPM: `$(keyboard) X.XX keys/sec | X.X WPM`
- Enhanced high score dialog to show both keystroke and WPM records
- Improved session management for tracking words and keystrokes

### Fixed
- Session timeout handling for better accuracy
- State persistence between VS Code sessions

## [1.0.1] - 2024-12-19

### Added
- Configurable session timeout setting
- Enhanced keystroke tracking accuracy

### Fixed
- Session reset logic improvements

## [1.0.0] - 2024-12-19

### Added
- Initial release
- Keystroke per second tracking
- Real-time typing speed display in status bar
- High score tracking and persistence
- Keyboard shortcut (Ctrl+Alt+S) to view high scores
- Command palette integration
- Configurable session timeout (default: 3000ms)