# ez-stx

## EZ Onboarding to Stacks dApps

![EZ-STX SCREENSHOT][./ezstx-screen.png]

This repo implements a smooth Web2-style onboarding flow to Stacks dApps, allowing users to create or connect a Stacks wallet in-browser. Ideal for onboarding non-crypto users without friction.

## 🚀 Features

- 🔑 Auto-generated Stacks wallet (via Stacks.js)
- 🦊 Connect with Stacks wallet browser extensions (e.g. Hiro Wallet)
- 🌐 In-browser account creation with seed phrase backup
- 🔄 Session-based authentication & wallet loading
- ⚡ Built with [Next.js](https://nextjs.org/), TypeScript, and TailwindCSS

---

## 🧩 Stack

- **Frontend**: Next.js + TailwindCSS
- **Wallet**: [Stacks.js](https://github.com/hirosystems/stacks.js), Hiro Wallet extension support

---

## 🛠 Setup

```bash
git clone https://github.com/fabohax/ez-stx
cd ez-stx
npm install
```

---

## 🧪 Run Locally

```bash
npm run dev
```

---

## 📝 How It Works

- **Connect Wallet**: Users can connect with a browser wallet extension (like Hiro Wallet) for instant login.
- **Create Account**: Users can create a new Stacks account directly in the browser. The app generates a seed phrase and private key, which the user must save. After confirmation, a session is started and the user is redirected to their profile.
- **Seed Phrase Login**: Users can log in using their existing seed phrase.
- **Session Management**: All authentication methods create a session in localStorage for seamless UX.

---

@fabohax
