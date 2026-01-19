import * as l10n from '@vscode/l10n';

/**
 * Localized strings for the Typing Speedometer extension
 */
export const strings = {
    // Status bar messages
    statusBar: {
        message: (keysPerSec: string, wpm: string) => 
            l10n.t('${0} keys/sec | ${1} WPM', keysPerSec, wpm)
    },
    
    // High score notifications
    highScore: {
        keystrokeNewHighScore: (score: string) => 
            l10n.t('Typing Speed New High Score: ${0} keys/sec!', score),
        wpmNewHighScore: (score: string) => 
            l10n.t('WPM New High Score: ${0} words/min!', score),
        shareButton: l10n.t('Share...'),
        displayMessage: (keystrokeScore: string, wpmScore: string) => 
            l10n.t('High Scores - Keystrokes: ${0} keys/sec | WPM: ${1} words/min', keystrokeScore, wpmScore),
        resetButton: l10n.t('Reset High Scores'),
        resetConfirmation: l10n.t('High Scores have been reset.')
    },
    
    // Share stats
    shareStats: {
        title: l10n.t('Share Typing Stats'),
        howToShare: l10n.t('How to share:'),
        step1: l10n.t('Right-click the image above and choose <b>Copy Image</b> (or <b>Save Image As...</b> to download).'),
        step2: l10n.t('Go to your favorite social platform (X, LinkedIn, Facebook, etc.).'),
        step3: l10n.t('Paste (or upload) the image into your post or message.'),
        callToAction: l10n.t('Show off your typing speed and tag <b>#typingspeedometer</b>!'),
        error: (error: string) => 
            l10n.t('There was an error generating the shareable stats image: ${0}', error)
    }
};
