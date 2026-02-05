# Crowdin Translation Setup Guide

This guide explains how to set up automated translations using Crowdin for the Typing Speedometer extension.

## Overview

The Crowdin integration:
- ✅ Automatically uploads source strings when `l10n/bundle.l10n.json` changes
- ✅ Downloads completed translations daily and creates pull requests
- ✅ Supports 30+ languages out of the box
- ✅ Free for open source projects

## Prerequisites

1. A Crowdin account (sign up at https://crowdin.com)
2. A Crowdin project for this extension
3. Repository admin access to add secrets

## Setup Steps

### 1. Create a Crowdin Project

1. Go to https://crowdin.com and sign in
2. Click **Create Project**
3. Choose **File-based** project type
4. Fill in project details:
   - **Name**: Typing Speedometer VS Code Extension
   - **Source language**: English
   - **Target languages**: Select languages you want to support
5. Click **Create Project**

### 2. Get Crowdin Credentials

#### Get Project ID:
1. Go to your project settings
2. Find **Project ID** (it's a number like `123456`)

#### Get Personal Access Token:
1. Go to https://crowdin.com/settings#api-key
2. Click **New Token**
3. Name it: `github-actions-typingspeedometer`
4. Scopes needed:
   - ✅ Projects (Read & Write)
   - ✅ Source files & strings (Read & Write)
   - ✅ Translations (Read & Write)
5. Click **Create**
6. Copy the token (you won't see it again!)

### 3. Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these two secrets:

   **Secret 1:**
   - Name: `CROWDIN_PROJECT_ID`
   - Value: Your project ID from step 2 (e.g., `123456`)

   **Secret 2:**
   - Name: `CROWDIN_PERSONAL_TOKEN`
   - Value: Your personal access token from step 2

### 4. Configure Crowdin Project

Upload the configuration file to understand your project structure:

```bash
# Install Crowdin CLI (optional, for manual operations)
npm install -g @crowdin/cli

# Upload source files manually (first time only)
crowdin upload sources
```

Or just push changes to the `main` branch - the GitHub Action will upload automatically!

### 5. How It Works

#### Automatic Upload (on push to main)
When you push changes to `l10n/bundle.l10n.json`:
1. GitHub Action triggers
2. Source strings are uploaded to Crowdin
3. Translators can start working on new strings

#### Automatic Download (daily at 2 AM UTC)
Every day:
1. GitHub Action checks for completed translations
2. Downloads translation files (e.g., `bundle.l10n.es.json`, `bundle.l10n.fr.json`)
3. Creates a pull request with new translations
4. You review and merge the PR

#### Manual Trigger
You can also trigger the workflow manually:
1. Go to **Actions** tab in GitHub
2. Select **Crowdin Translations** workflow
3. Click **Run workflow**
4. Choose to upload sources or download translations

## Managing Translations

### Inviting Translators

1. Go to your Crowdin project
2. Click **Members** → **Invite**
3. Add collaborators by email or share the project link
4. They can start translating immediately

### Translation Progress

Track progress in Crowdin dashboard:
- Overall completion percentage
- Per-language progress
- Translation quality scores

### Translation Memory

Crowdin automatically builds a translation memory:
- Reuses translations across similar strings
- Suggests translations for new strings
- Speeds up translation process

## Supported Languages

The configuration includes mappings for 30+ languages:

**European:**
- Spanish (es), French (fr), German (de), Italian (it)
- Portuguese (pt, pt-br), Dutch (nl), Swedish (sv)
- Danish (da), Finnish (fi), Norwegian (no)
- Polish (pl), Czech (cs), Hungarian (hu)
- Romanian (ro), Ukrainian (uk)

**Asian:**
- Chinese Simplified (zh-cn), Chinese Traditional (zh-tw)
- Japanese (ja), Korean (ko)
- Thai (th), Vietnamese (vi), Indonesian (id), Malay (ms)
- Hindi (hi), Bengali (bn)

**Middle Eastern:**
- Arabic (ar), Hebrew (he), Turkish (tr)

**Eastern European:**
- Russian (ru)

### Adding More Languages

To add a new language:

1. Add it to your Crowdin project
2. Update `crowdin.yml` with the locale mapping:
```yaml
locale_with_underscore:
  new-LOCALE: vscode-locale
```

## VS Code Extension Testing

After merging translation PRs, test translations locally:

1. Install the extension in VS Code
2. Change VS Code language: **File** → **Preferences** → **Settings**
3. Search for "display language"
4. Install language pack and reload
5. Extension strings should appear in the selected language

## Troubleshooting

### Workflow Not Triggering
- Check that secrets are correctly set
- Verify the workflow file is in `.github/workflows/`
- Check Actions tab for error messages

### Translations Not Uploading
- Verify `CROWDIN_PROJECT_ID` is correct
- Check that `CROWDIN_PERSONAL_TOKEN` has correct permissions
- Review Crowdin project settings

### Translation Files Not Created
- Ensure translations are approved in Crowdin
- Check that target languages are configured
- Verify locale mapping in `crowdin.yml`

## Best Practices

1. **Context for Translators**: Add translation context in Crowdin for ambiguous strings
2. **Glossary**: Create a glossary for technical terms
3. **Screenshots**: Upload screenshots to Crowdin to show string context
4. **Review PRs**: Always review translation PRs before merging
5. **Test Locally**: Test translations in VS Code before releasing

## Resources

- [Crowdin Documentation](https://support.crowdin.com/)
- [Crowdin GitHub Action](https://github.com/crowdin/github-action)
- [VS Code Localization Guide](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide)
- [@vscode/l10n Documentation](https://github.com/microsoft/vscode-l10n)

## Cost

Crowdin is **free for open source projects**! Just apply for an open source license:
1. Go to https://crowdin.com/page/open-source-project-setup-request
2. Fill in your project details
3. Get approved (usually within a few days)
4. Enjoy unlimited translations!

## Support

For issues with:
- **Crowdin integration**: Check Crowdin support docs
- **GitHub Actions**: Check workflow logs in Actions tab
- **VS Code localization**: Check VS Code extension docs
- **This extension**: Open an issue in the GitHub repository
