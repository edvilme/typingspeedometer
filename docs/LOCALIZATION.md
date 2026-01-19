# Localization Guide

This extension supports localization using VS Code's `@vscode/l10n` package.

## Structure

- **`src/strings.ts`**: Central localization module that wraps all user-facing strings
- **`package.nls.json`**: Localization for package.json metadata (commands, settings descriptions)
- **`l10n/bundle.l10n.json`**: Runtime string translations (English by default)

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

## Adding New Languages

To add support for a new language (e.g., Spanish):

1. Create a new bundle file: `l10n/bundle.l10n.es.json`
2. Translate all strings in the file
3. Create `package.nls.es.json` with translated package.json strings
4. VS Code will automatically use the appropriate language based on the user's locale

## References

- [VS Code Localization Guide](https://code.visualstudio.com/api/references/vscode-api#l10n)
- [@vscode/l10n Package](https://www.npmjs.com/package/@vscode/l10n)
