# Akshay Hire — Portfolio

Personal portfolio site hosted at [akshayh.github.io](https://akshayh.github.io).

## Project structure

| File | Purpose |
|------|---------|
| `index.html` | Page shell — sections, meta tags, script/style links. Rarely needs editing. |
| `content.js` | **All portfolio content and render logic.** Edit this to update text, jobs, skills, etc. |
| `styles.css` | Visual design — colors, layout, typography, animations. |
| `app.js` | Interactions — theme toggle, scroll reveal, mobile nav, **Notify Me** feature. |

## How to update content

Open `content.js` and edit the `window.portfolioContent` object at the top of the file.

### Common updates

**Name / role / tagline**
```js
header: {
  name: 'Akshay Hire',
  genericrole: 'Software Architect & Gen AI Platform Designer',
  role: 'Head of Solution Engineering, APAC',
  // ...
}
```

**About section**
```js
about: {
  title: 'Learn More About Me',
  intro: '...',
  summary: '...',
  details: [
    { label: 'City', value: 'Singapore' },
  ]
}
```

**Skill proficiency bars**
```js
skillLevels: [
  { name: 'Cloud Architecture (AWS, GCP, Azure)', value: 95 },
]
```

**Add a job**
```js
resume: {
  experience: [
    {
      title: 'Your Title',
      period: 'Jan 2026 – Present',
      company: 'Company · Location',
      responsibilities: ['Bullet one', 'Bullet two']
    },
  ]
}
```

**Profile photo**
```js
about: {
  image: 'assets/profile.jpg',
  alt: 'Akshay Hire'
}
```

## Notify Me — free WhatsApp + lead recording

The **Notify Me** button lets visitors submit their contact details. You receive a WhatsApp message automatically, and submissions can be saved for your records.

Uses two free services:

| Service | Purpose | Free tier |
|---------|---------|-----------|
| [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/) | Sends WhatsApp to your phone automatically | Personal use, unlimited |
| [Formspree](https://formspree.io) | Saves visitor name, phone, message | 50 submissions/month |

### Step 1 — CallMeBot (automatic WhatsApp)

1. Add **+34 644 33 66 63** to your phone contacts (name it "CallMeBot").
2. On WhatsApp, send this message to that contact:
   ```
   I allow callmebot to send me messages
   ```
3. You'll receive a reply with your **API key** (may take up to 2 minutes).
4. Add the key to `content.js`:

```js
notify: {
  ownerPhone: '6592755920',       // your number with country code, no +
  callMeBotApiKey: 'YOUR_KEY_HERE',
  formspreeId: ''
}
```

When a visitor submits the form, CallMeBot sends a WhatsApp message to your phone with their name, number, and message — no action needed from the visitor.

### Step 2 — Formspree (record who contacted you)

1. Sign up at [formspree.io](https://formspree.io) (free).
2. Create a new form and copy the form ID (the part after `/f/` in the endpoint URL).
3. Add it to `content.js`:

```js
notify: {
  ownerPhone: '6592755920',
  callMeBotApiKey: 'YOUR_KEY_HERE',
  formspreeId: 'your_form_id'
}
```

Submissions appear in your Formspree dashboard and are emailed to you.

### Fallback behaviour

- **No API key set:** Opens WhatsApp via `wa.me` with a pre-filled message (visitor must tap Send).
- **API key set:** WhatsApp is sent to you automatically via CallMeBot.
- **Formspree not set:** WhatsApp still works; leads just aren't stored in a dashboard.

## How to change design

Edit `styles.css`. Key variables at the top:

```css
:root {
  --accent: #34d399;
  --bg: #07080d;
  --heading: #ffffff;
}
```

## Local preview

```bash
npx serve .
```

## Deploy

Push to the `main` branch — GitHub Pages serves automatically from this repo.

## Syncing with LinkedIn

Keep `content.js` aligned with [LinkedIn profile](https://www.linkedin.com/in/akshay-h/):

- **Experience** → `resume.experience`
- **Education** → `resume.education`
- **Certifications** → `certifications`
- **Skills** → `skills` and `skillLevels`

The site does not auto-sync with LinkedIn; update manually after profile changes.
