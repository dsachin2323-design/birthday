# 🌸 Dreamy Garden Birthday Website

A free, static birthday website designed for GitHub Pages.

## 1. Personalize it

Open `script.js` and edit the `CONFIG` section at the top:

- `birthdayDate`
- `secret`
- `name`
- `heroIntro`
- `storyText`
- `letterText`
- `finalText`
- `hint`

Example:

```js
birthdayDate: "2026-09-20T00:00:00",
secret: "sunshine",
name: "Her Name",
```

## 2. Add photos

Put your photos in the `photos` folder using these names:

- `hero.jpg`
- `story.jpg`
- `memory1.jpg`
- `memory2.jpg`
- `memory3.jpg`
- `memory4.jpg`
- `memory5.jpg`
- `memory6.jpg`
- `final.jpg`

JPG or PNG is fine. Keep photos reasonably compressed for faster phone loading.

## 3. Add music

Put an MP3 named:

`music/birthday-song.mp3`

The site starts the music after the visitor successfully enters the secret, because modern browsers normally block unsolicited autoplay.

## 4. GitHub Pages

Create a GitHub repository and upload the contents of this folder. Then enable:

Settings → Pages → Deploy from branch → main → / (root)

Your site will be available at:

`https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`

If the repository is named `birthday`, the URL will be:

`https://YOUR-USERNAME.github.io/birthday/`

## Important privacy note

The secret entrance is a client-side experience, NOT real security. Someone technically inspecting the website files could find the secret and the image URLs. Do not put highly sensitive information on a GitHub Pages site.

## Design

Dreamy Garden:
- soft cream / sage / rose palette
- animated petals
- subtle glow
- live countdown on the entrance
- password/secret gate
- music toggle
- interactive photo lightbox
- opening envelope letter
- reasons cards
- final surprise overlay
- responsive mobile design
- no frameworks or paid services required
