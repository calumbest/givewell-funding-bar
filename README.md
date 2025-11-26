# GiveWell Funding Bar Visualization

An interactive visualization that demonstrates how GiveWell sets its funding bar by ranking opportunities by cost-effectiveness and funding from the top until the budget runs out.

## What it does

- Displays funding opportunities as bars ranked by cost-effectiveness
- Shows an interactive slider to adjust available funding
- Highlights the "funding bar" - the cost-effectiveness level of the last dollar allocated
- Visualizes which opportunities get funded (full opacity) vs. which fall below the bar (faded)

## Running locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view in your browser.

## Customizing

Edit the `opportunities` array in `src/App.js` to change the funding opportunities displayed.
