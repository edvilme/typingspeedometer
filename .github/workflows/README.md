# GitHub Actions Workflows

This directory contains automated workflows for the Typing Speedometer extension.

## Workflows

### deploy.yml
Publishes the extension to Visual Studio Marketplace when changes are pushed to `main`.

**Triggers:**
- Push to `main` branch

**Requirements:**
- `VS_MARKETPLACE_TOKEN` secret

### crowdin.yml
Manages translations using Crowdin for automated localization.

**Triggers:**
- Push to `main` (uploads source strings when `l10n/bundle.l10n.json` changes)
- Daily at 2 AM UTC (downloads completed translations)
- Manual workflow dispatch

**Requirements:**
- `CROWDIN_PROJECT_ID` secret
- `CROWDIN_PERSONAL_TOKEN` secret

**See:** [docs/CROWDIN_SETUP.md](../../docs/CROWDIN_SETUP.md) for complete setup instructions.

## Setup Secrets

Add these secrets in **Settings** → **Secrets and variables** → **Actions**:

| Secret Name | Description | Required For |
|-------------|-------------|--------------|
| `VS_MARKETPLACE_TOKEN` | VS Code Marketplace PAT | deploy.yml |
| `CROWDIN_PROJECT_ID` | Crowdin project ID | crowdin.yml |
| `CROWDIN_PERSONAL_TOKEN` | Crowdin API token | crowdin.yml |
