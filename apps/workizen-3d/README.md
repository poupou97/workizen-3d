# Workizen 3D

Founder Demo MVP for Workizen HQ Campus.

Workizen 3D presents Workizen as:

```text
Digital Citizen City
+
Opportunity Marketplace
```

## MVP v1

Default map:

- Workizen HQ Campus

Default spawn:

- Citizen Plaza

Main landmark:

- AI Agent Lab

Districts:

- AI Agent Lab
- Founder Tower
- Citizen Plaza
- Knowledge Library
- Opportunity Center
- Compute Center
- Team Office

## Demo Routes

```text
/
/demo
```

`/demo` starts Founder Demo Mode, which walks through:

- Vision
- Districts
- Citizens
- Opportunities
- Team Formation

## Tech Stack

- Next.js
- TypeScript
- React Three Fiber
- Three.js
- Drei
- Zustand
- Tailwind CSS

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Founder Demo Preview

Use this for the most stable local demo:

```bash
npm run demo
```

Then open:

```text
http://127.0.0.1:3000/demo
```

## Validate

```bash
npm run lint
npm run typecheck
npm run build
npm run smoke:campus
```

`npm run smoke:campus` uses Playwright to verify desktop, tablet, and mobile rendering and writes screenshots to:

```text
../../output/screenshots/
```

## MVP Boundaries

This is a frontend-only Founder Demo MVP using mock data.

Not included:

- Backend
- Blockchain
- NFT
- Wallet
- Multiplayer
- Laravel integration
- Open WebUI integration
- Ready Player Me
- Mixamo
- Colyseus
- Digital Twin expansion

The previous app `apps/workizen-3d-demo` remains a POC/reference only.
