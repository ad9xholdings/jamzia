# JamZia™ — Auto-Deploy Setup

## How It Works

Every time you push code to the `main` branch on GitHub, it automatically:
1. Builds the project
2. Deploys everything to `jamzia.tv` via FTP

**You never have to manually upload files again.**

---

## Step 1 — Get Your Network Solutions FTP Credentials

1. Log in to your **Network Solutions** account
2. Go to **Hosting** → **Web Hosting** → **FTP Accounts**
3. Find or create your FTP credentials:
   - **Server/Host:** (usually `jamzia.tv` or an IP address they provide)
   - **Username:** (your FTP username)
   - **Password:** (your FTP password)

---

## Step 2 — Add Secrets to GitHub

1. Go to `https://github.com/ad9xholdings/jamzia/settings/secrets/actions`
2. Click **New repository secret**
3. Add these 3 secrets one at a time:

| Secret Name | Value |
|-------------|-------|
| `FTP_SERVER` | Your FTP server (e.g., `jamzia.tv`) |
| `FTP_USERNAME` | Your FTP username |
| `FTP_PASSWORD` | Your FTP password |

---

## Step 3 — Push Code = Auto Deploy

After secrets are set, every push to `main` will auto-deploy:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Then watch the deployment happen automatically at:
`https://github.com/ad9xholdings/jamzia/actions`

---

## Manual Deploy

You can also trigger a manual deploy anytime:

1. Go to `https://github.com/ad9xholdings/jamzia/actions`
2. Click **Deploy to jamzia.tv**
3. Click **Run workflow**

---

## What Gets Deployed

The workflow deploys everything from `dist/public/` which includes:
- `index.html`
- `assets/` (all JS/CSS chunks)
- `ar/` (AR creature images)
- `ar-creatures/`, `ar-crystals/`, `ar-scenes/`
- `videos/` (MP4 files)
- `nofear-injector.js`, images, etc.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Deploy fails | Check GitHub Actions logs for error details |
| FTP connection refused | Verify `FTP_SERVER` secret is correct |
| Authentication failed | Check `FTP_USERNAME` and `FTP_PASSWORD` |
| Site not updating | Check if Network Solutions has caching enabled — wait 5-10 minutes |

---

(c) 2026 Ad9x Holdings LLC
