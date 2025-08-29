# GitHub Copilot Instructions for Typing Speedometer Extension

## Overview
This document provides instructions for GitHub Copilot to automatically maintain and update the CHANGELOG.md file for the Typing Speedometer VS Code extension.

## 🚨 CRITICAL REQUIREMENT: Version Bumping for Every PR

**MANDATORY**: Every single pull request MUST include a version bump in package.json, regardless of the type or size of the change. This is a non-negotiable requirement for the project.

### Version Bump Requirements
- **Every PR** must increment the version number in package.json
- **Every PR** must add a corresponding entry to CHANGELOG.md with the same version number
- **Both files** must be updated in the same commit
- **No exceptions** - even minor documentation changes require a version bump

### Quick Reference for Version Bumping
- Documentation updates, typos, minor fixes → PATCH version (e.g., 1.0.2 → 1.0.3)
- New features, enhancements, commands → MINOR version (e.g., 1.0.2 → 1.1.0)  
- Breaking changes, major API changes → MAJOR version (e.g., 1.0.2 → 2.0.0)

## CHANGELOG.md Maintenance Guidelines

### Format
Follow the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format:
- Use semantic versioning (MAJOR.MINOR.PATCH)
- Include release dates in YYYY-MM-DD format
- Organize changes under standard categories: Added, Changed, Deprecated, Removed, Fixed, Security

### Version Bumping Rules
1. **MAJOR version** (X.0.0): Breaking changes to extension API or fundamental behavior
2. **MINOR version** (1.X.0): New features, commands, or significant enhancements
3. **PATCH version** (1.0.X): Bug fixes, performance improvements, minor UI tweaks

### Categories and Examples

#### Added
- New features or functionality
- New commands or keyboard shortcuts
- New configuration options
- New tracking metrics or calculations

Example:
```markdown
### Added
- Words Per Minute (WPM) calculation and display
- New keyboard shortcut (Ctrl+Alt+R) for resetting session
- Configuration option for custom WPM calculation method
```

#### Changed
- Modifications to existing features
- UI/UX improvements
- Performance enhancements
- Default setting changes

Example:
```markdown
### Changed
- Status bar now displays both keystroke speed and WPM
- Improved high score dialog layout and messaging
- Default session timeout changed from 3000ms to 5000ms
```

#### Fixed
- Bug fixes
- Stability improvements
- Accuracy corrections

Example:
```markdown
### Fixed
- Session timeout handling for better accuracy
- Memory leak in keystroke tracking
- WPM calculation edge cases with rapid typing
```

#### Removed
- Removed features or commands
- Deprecated functionality cleanup

#### Deprecated
- Features marked for future removal
- Legacy API usage warnings

#### Security
- Security vulnerability fixes
- Permission changes

### Automatic Update Process

When making code changes, always:

1. **FIRST: Bump the version in package.json** (MANDATORY FOR EVERY PR):
   - Increment version number according to semantic versioning rules
   - This step is required before any other changes
   - No PR should be submitted without a version bump

2. **Identify the change type** based on the modifications:
   - Code additions → `Added`
   - Behavior modifications → `Changed` 
   - Bug fixes → `Fixed`
   - Removals → `Removed`

3. **Determine version bump** required:
   - New features or commands → MINOR version bump
   - Bug fixes or small improvements → PATCH version bump
   - Breaking changes → MAJOR version bump

4. **Update CHANGELOG.md**:
4. **Update CHANGELOG.md**:
   - Add new version section above `[Unreleased]`
   - Include current date
   - List changes under appropriate categories
   - Use clear, user-friendly descriptions
   - Reference specific features or commands affected

5. **Verify package.json version synchronization**:
   - Confirm the `"version"` field in package.json matches exactly the version being added to CHANGELOG.md
   - Ensure both files use the same version number format (e.g., "1.2.3")
   - This is required for VS Code extension publishing and marketplace consistency

### Extension-Specific Guidelines

#### Key Features to Document
- Typing speed calculations (keys/sec, WPM)
- High score tracking and notifications
- Session management and timeouts
- Status bar display changes
- Command palette commands
- Keyboard shortcuts
- Configuration options
- Performance improvements

#### Common Change Patterns
- **Calculation improvements**: Document under `Fixed` or `Changed`
- **New metrics**: Document under `Added`
- **UI changes**: Document under `Changed`
- **Performance**: Document under `Changed` or `Fixed`
- **Configuration**: Document under `Added` (new) or `Changed` (modified)

### Examples of Good Changelog Entries

```markdown
## [1.1.0] - 2024-12-20

### Added
- Character accuracy tracking with percentage display
- Export typing statistics to CSV functionality
- Dark mode support for high score dialogs

### Changed
- WPM calculation now uses standard 5-character word length
- Status bar updates every 100ms instead of 1000ms for smoother display
- High score notifications now include session duration

### Fixed
- Incorrect WPM calculation when typing very fast
- Session not resetting properly after VS Code restart
- Memory usage optimization for long typing sessions
```

### Validation Checklist

Before updating CHANGELOG.md, ensure:
- [ ] **Version number has been bumped in package.json (MANDATORY)**
- [ ] Version number follows semantic versioning
- [ ] Date is in YYYY-MM-DD format
- [ ] Changes are categorized correctly
- [ ] Descriptions are user-friendly and clear
- [ ] Technical details are explained in simple terms
- [ ] All user-facing changes are documented
- [ ] **package.json version matches CHANGELOG version exactly**
- [ ] Both files are updated in the same commit
- [ ] **No PR submitted without version bump**

## Commit Message Guidelines

When updating CHANGELOG.md and package.json:
- Use conventional commit format: `feat:`, `fix:`, `docs:`
- Include version number in commit message
- Reference specific features or bug fixes
- Update both CHANGELOG.md and package.json in the same commit

Examples:
- `docs: update CHANGELOG.md for v1.1.0 with WPM improvements`
- `chore: release v1.0.3 with session timeout fixes`
- `feat: bump to v1.2.0 with new accuracy tracking feature`

## Integration with Development Workflow

1. **Before starting any PR**: Bump version in package.json first
2. **Before merging PR**: Ensure both CHANGELOG.md and package.json are updated with matching version numbers
3. **On release**: Create git tag matching version number from both files
4. **After release**: Move unreleased changes to new version section

### Critical Note on Version Synchronization
**EVERY PR MUST INCLUDE VERSION BUMP**: Always ensure that:
- Every single PR includes a version bump in package.json, no exceptions
- The version in package.json matches exactly the version being added to CHANGELOG.md
- Both files are updated in the same commit to maintain consistency
- The version format follows semantic versioning (MAJOR.MINOR.PATCH)
- Even minor changes like documentation updates require a version bump

This ensures the CHANGELOG.md stays current and provides users with clear information about extension improvements and changes, while maintaining version consistency required for VS Code extension marketplace.