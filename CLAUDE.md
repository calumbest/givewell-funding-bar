# GiveWell Funding Bar Project

## Project Overview
A React visualization that shows how GiveWell allocates funding across opportunities ranked by cost-effectiveness. Users can adjust available funding with a slider to see how the "funding bar" changes.

## Current Behavior
- Slider range: $50M - $550M
- Default funding: $280M
- Funded buckets: Full opacity (1.0)
- Unfunded buckets: Faded opacity (0.35)
- Funding bar label: Appears on the bucket where funding runs out
- X-axis labels: Colored for funded buckets, grey for unfunded

## Requested Changes
Add a $0 contribution option with special behavior:

### When slider is at $0:
- All buckets should be fully colored (opacity: 1.0)
- No "FUNDING BAR" label should appear
- X-axis labels should all be colored (not greyed out)
- Summary box should show "—" for funding bar (current behavior when no bar exists)

### When slider is above $0:
- Current behavior: funding bar appears, unfunded buckets are greyed out

## Implementation Plan
1. Change slider min from 50 to 0
2. Add special case logic for availableFunding === 0
3. Update bar opacity logic
4. Update funding bar label visibility logic
5. Update x-axis label coloring logic
6. Update slider label (change "$50M" to "$0")

## Files to Modify
- `/Users/crichards/givewell-funding-bar/src/App.js` - Main component logic and rendering
