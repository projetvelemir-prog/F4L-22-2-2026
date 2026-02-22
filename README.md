# Fetal CTG Assessment Tool — *Is This Fetus Fit for Labour?*

A clinical decision-support tool for physiological interpretation of admission cardiotocography (CTG) at term.

Based on: Pereira S, Chandraharan E. *Recognition of chronic hypoxia and pre-existing foetal injury on the cardiotocograph (CTG): Urgent need to think beyond the guidelines.* Porto Biomed J. 2017 Jul-Aug;2(4):124-129.

## How it works

The clinician observes **60 minutes of CTG at admission**, then answers 5 sequential questions assessing:

1. **Myocardium** — Baseline FHR stable and appropriate for gestational age?
2. **Autonomic NS** — Normal variability?
3. **Autonomic NS** — Cycling present?
4. **Somatic NS** — True accelerations?
5. **Placental reserve** — Repetitive shallow or late decelerations?

The tool matches the answer pattern to 11 pre-defined clinical scenarios and returns the most probable diagnosis with management recommendations.

## Deploy on Vercel

```bash
npm install
npm run build
```

Push to GitHub, then import in [vercel.com](https://vercel.com). Vercel auto-detects Vite.

## Tech stack

- React 18 + Vite
- Zero dependencies beyond React
- All images in `public/images/`
