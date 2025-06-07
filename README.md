# ez-stx

**EZ Onboarding to Stacks dApps with Email or Phone**

This repo implements a smooth Web2-style onboarding flow to Stacks dApps, allowing users to log in using their email or phone and automatically receive a Stacks wallet. Ideal for onboarding non-crypto users without friction.

## 🚀 Features

- 🔐 Email or phone-based login (OAuth or OTP)
- 🔑 Auto-generated Stacks wallet (via Stacks.js)
- 📩 Magic login links with encrypted seed delivery
- 🔄 Session-based authentication & wallet loading
- ⚡ Built with [Next.js](https://nextjs.org/), TypeScript, and TailwindCSS

---

## 🧩 Stack

- **Frontend**: Next.js + TailwindCSS
- **Wallet**: [Stacks.js](https://github.com/hirosystems/stacks.js)
- **Auth**: Magic link system (custom or Firebase Auth)
- **Storage**: Encrypted wallet seed (optionally in Supabase, Firebase, or your DB)

---

## 🛠 Setup

```bash
git clone https://github.com/fabohax/ez-stx
cd ez-stx
npm install
````
---

## 🧪 Run Locally

```bash
npm run dev
```

---

@fabohax
