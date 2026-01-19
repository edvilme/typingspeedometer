import * as l10n from '@vscode/l10n';

/**
 * Escapes HTML special characters to prevent XSS vulnerabilities
 * Note: This is only needed for user-provided or external content.
 * Numeric values from .toFixed() and localized strings we control are inherently safe.
 */
function escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Localized strings for the Typing Speedometer extension
 */
export const strings = {
    // Status bar messages
    statusBar: {
        message: (keysPerSecond: string, wordsPerMinute: string) => 
            l10n.t('{0} keys/sec | {1} WPM', keysPerSecond, wordsPerMinute)
    },
    
    // High score notifications
    highScore: {
        keystrokeNewHighScore: (score: string) => 
            l10n.t('Typing Speed New High Score: {0} keys/sec!', score),
        wpmNewHighScore: (score: string) => 
            l10n.t('WPM New High Score: {0} words/min!', score),
        shareButton: l10n.t('Share...'),
        displayMessage: (keystrokeScore: string, wpmScore: string) => 
            l10n.t('High Scores - Keystrokes: {0} keys/sec | WPM: {1} words/min', keystrokeScore, wpmScore),
        resetButton: l10n.t('Reset High Scores'),
        resetConfirmation: l10n.t('High Scores have been reset.')
    },
    
    // Share stats
    shareStats: {
        title: l10n.t('Share Typing Stats'),
        howToShare: l10n.t('How to share:'),
        step1CopyImage: l10n.t('Copy Image'),
        step1SaveImage: l10n.t('Save Image As...'),
        step1Text: l10n.t('Right-click the image above and choose {0} (or {1} to download).'),
        step2: l10n.t('Go to your favorite social platform (X, LinkedIn, Facebook, etc.).'),
        step3: l10n.t('Paste (or upload) the image into your post or message.'),
        callToActionText: l10n.t('Show off your typing speed and tag {0}!'),
        hashtag: l10n.t('#typingspeedometer'),
        error: (error: string) => 
            l10n.t('There was an error generating the shareable stats image: {0}', escapeHtml(error))
    }
};
