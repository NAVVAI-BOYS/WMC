# WMC Global · Mobile Blind Spot Check

Lead magnet web app. Node + Express serving one self-contained HTML file.

```
public/index.html   the whole app - questions, scoring, report, brand assets inline
server.js           serves it, plus POST /lead
package.json        one dependency (express)
```

## Deploy on Render

New + → **Web Service** → connect this repo.

| Field | Value |
|---|---|
| Root Directory | *(leave empty)* |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Health Check Path | `/healthz` |

Node version is pinned to 18+ in `package.json`. Nothing else to configure.

## Routes

| Route | Does |
|---|---|
| `/` | the check |
| `/lead` (POST) | receives the captured lead |
| `/healthz` | health check for Render |
| anything else | serves the check |

## Leads

The gate posts to `/lead` on unlock: name, email, company, role, route taken,
verdict, weakest area and score, gap count, stated goal, recommended first move.

Right now `server.js` writes them to stdout, so they appear in the Render logs.
To send them somewhere real, change that one handler. Nothing in the front end moves.

The post is fire and forget: if it fails, the reader still gets their report.

## Note on the free tier

A free Render **web service sleeps after inactivity**, so the first visitor after a
quiet period waits roughly 30 to 50 seconds. For a link going out to prospects, use
a paid instance. A Static Site would not sleep, but has no backend to receive leads.
