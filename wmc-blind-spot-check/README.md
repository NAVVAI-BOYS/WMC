# WMC Global · Mobile Blind Spot Check

Single self-contained HTML lead magnet. No build step, no dependencies, no backend.

- `public/index.html` — the whole app: questions, scoring, report, brand assets embedded as base64
- `render.yaml` — optional Render blueprint

## Deploy on Render

New + → Static Site → connect this repo.

| Field | Value |
|---|---|
| Build Command | *(leave empty)* |
| Publish Directory | `public` |
| Branch | `main` |

## Notes

- The only outbound request is Google Fonts. Everything else is inline.
- The gate collects name, email, company and role but **does not send them anywhere**. See "Lead capture" below.
- Auto-deploys on push to `main`.

## Lead capture

Not wired. The app is honest about this on screen ("Demo build"). To make it live,
POST the gate object to an endpoint in the `#gGo` click handler.
