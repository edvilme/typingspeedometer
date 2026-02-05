# Localization Guide

This extension supports localization using VS Code's `@vscode/l10n` package for runtime strings.

## Structure

- **`src/strings.ts`**: Central localization module that wraps user-facing runtime strings used in the extension code (commands, messages, status bar text, etc.)
- **Webview markup (HTML/attributes)**: User-facing text in webviews (including `alt`, `title`, `aria-*` attributes, headings, labels, etc.) should also be localized, typically by passing in strings from `src/strings.ts` or a similar helper
- **`l10n/bundle.l10n.json`**: Runtime string translations (English by default)

**Note:** Package.json metadata (commands, settings descriptions) is currently not localized. User-facing text in webviews must be localized explicitly as described above.

## Adding New Strings

1. Add the string to `src/strings.ts` using `l10n.t()`:
   ```typescript
   myNewString: l10n.t('My new string')
   ```

2. Add the string to `l10n/bundle.l10n.json`:
   ```json
   {
     "My new string": "My new string"
   }
   ```

3. Use the string in your code:
   ```typescript
   import { strings } from '../strings';
   vscode.window.showInformationMessage(strings.myNewString);
   ```

## Localizing Template Strings with Placeholders

For strings with dynamic content, use functions that accept arguments:

```typescript
// In src/strings.ts
myTemplate: (arg1: string, arg2: string) => 
    l10n.t('Hello {0}, welcome to {1}!', arg1, arg2)

// In your code
const message = strings.myTemplate('John', 'VS Code');
```

## Security: HTML Escaping

When displaying localized strings in webviews, always escape HTML to prevent XSS:

```typescript
import { strings, escapeHtml } from '../strings';

// Escape localized content before inserting into HTML
const safeText = escapeHtml(strings.myString);
panel.webview.html = `<div>${safeText}</div>`;
```

## Adding New Languages

To add support for a new language (e.g., Spanish):

1. Create a new bundle file: `l10n/bundle.l10n.es.json`
2. Translate all strings in the file
3. VS Code will automatically use the appropriate language based on the user's locale

## References

- [VS Code Localization Guide](https://code.visualstudio.com/api/references/vscode-api#l10n)
- [@vscode/l10n Package](https://www.npmjs.com/package/@vscode/l10n)
