# Pushing to GitHub

The repository is already initialised with two commits and a clean tree.
You only need to add a remote and push.

---

## 1. Create the repository

On GitHub, create a new **empty** repository. Do not add a README, licence or
`.gitignore` — the repo already has them, and those files would cause a
conflict on the first push.

**Consider making it private.** Your own project record lists trademark
screening as incomplete and says the word mark is not cleared for public
launch. A public repo with GitHub Pages enabled is a public launch. Private
now, public when legal clears it, costs nothing.

## 2. Push

From inside the `athar` folder:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

If you already have a remote from an older build:

```bash
git remote set-url origin https://github.com/<your-username>/<repo-name>.git
```

If GitHub asks for a password, it wants a **personal access token**, not your
account password. Create one at Settings → Developer settings → Personal
access tokens → Fine-grained tokens, scoped to just this repository with
Contents: read and write. Better still, use the GitHub CLI (`gh auth login`)
or an SSH key so no token ever gets typed into a prompt.

## 3. Replacing an existing repo's contents

If you are pushing over the previous build and want this to become the new
history:

```bash
git push --force origin main
```

Force-push rewrites the remote branch and discards what was there. Take a
backup branch first if any of the old work still matters:

```bash
git fetch origin
git branch old-build origin/main
git push origin old-build
```

## 4. Turn on Pages

Repository → Settings → Pages → Build and deployment → Source:
**GitHub Actions**.

The included `.github/workflows/pages.yml` runs the test suite and only
publishes if all 122 assertions pass, so a broken build cannot reach
children. `.github/workflows/test.yml` runs the same suite on pull requests.

Note that GitHub Pages does not serve private repositories on free plans. If
you keep the repo private, deploy previews to Netlify or Cloudflare Pages
instead, both of which support password protection.

## 5. After it is live

Relative paths are used throughout, so the site works at either
`username.github.io` or `username.github.io/repo-name/` without changes.

---

## One thing to fix before a public launch

`index.html`, `learn.html` and `lesson.html` each load fonts from
`fonts.googleapis.com`. That is a third-party request which logs visitor IP
addresses, and it contradicts the "no third-party requests" claim in the
README — a claim that matters more than usual for a children's product
citing UNICEF and UNESCO guidance.

Two options:

1. **Self-host the fonts.** Download Baloo 2 and Rubik, put the `.woff2`
   files in `assets/fonts/`, and replace the `<link>` tags with a local
   `@font-face` block. No external requests at all.
2. **Drop the webfonts** and fall back to system fonts. Fastest, and removes
   a render-blocking request, at the cost of the distinctive type.

Option 1 is the right call for a pilot going in front of schools.
