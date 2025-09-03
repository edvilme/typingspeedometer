// import nodeHtmlToImage from 'node-html-to-image';
import * as vscode from 'vscode';
import * as fs from 'fs';

export default function generateShareStatsCommand(context: vscode.ExtensionContext) {
    return vscode.commands.registerCommand('typingspeedometer.shareStats', async () => {
        const highScore = context.globalState.get<number>('typingspeedometer.highScore', 0);
        const wordsPerMinuteHighScore = context.globalState.get<number>('typingspeedometer.wordsPerMinuteHighScore', 0);

        // Generate the shareable image
        const imageSvg = await generateStatsShareableSvg(context, wordsPerMinuteHighScore, new Date());

        // Display the image
        const panel = vscode.window.createWebviewPanel(
            'shareStats',
            'Share Typing Stats',
            vscode.ViewColumn.One,
            {}
        );

        panel.webview.html = `
            <html>
            <body style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: #181818;">
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <img src="data:image/svg+xml;base64,${Buffer.from(imageSvg).toString('base64')}" alt="Typing Stats" style="margin: 0 auto; display: block; max-width: 100%; height: auto; box-shadow: 0 4px 24px rgba(0,0,0,0.18); border-radius: 12px; background: #222;" />
                    <div style="margin-top: 28px; max-width: 420px; text-align: center; color: #fff; font-family: 'Segoe UI', Arial, sans-serif; font-size: 1.1em;">
                        <strong>How to share:</strong><br />
                        <ol style="margin: 12px 0 0 1.2em; padding: 0; text-align: left; color: #eee;">
                            <li>Right-click the image above and choose <b>Copy Image</b> (or <b>Save Image As...</b> to download).</li>
                            <li>Go to your favorite social platform (X, LinkedIn, Facebook, etc.).</li>
                            <li>Paste (or upload) the image into your post or message.</li>
                        </ol>
                        <div style="margin-top: 16px; color: #ffd700; font-size: 1em;">Show off your typing speed and tag <b>#typingspeedometer</b>!</div>
                    </div>
                </div>
            </body>
            </html>
        `;
    });
};

export async function generateStatsShareableSvg(context: vscode.ExtensionContext, wordsPerMinuteHighScore: number, now: Date): Promise<string> {
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const logoPath = context.asAbsolutePath('docs/img/icon.png');
    const logoBase64 = await fs.promises.readFile(logoPath, { encoding: 'base64' });
    // Get svg from assets/shareableStats.svg
    const svgAssetPath = context.asAbsolutePath('src/commands/shareStats/shareableStats.svg');
    const svgAsset = await fs.promises.readFile(svgAssetPath, 'utf8');
    return svgAsset
        .replace('${today}', today)
        .replace('${wordsPerMinuteHighScore}', String(wordsPerMinuteHighScore))
        .replace('${logoUrl}', `data:image/png;base64,${logoBase64}`);
}