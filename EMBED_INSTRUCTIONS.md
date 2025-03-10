
# Embedding the Burnout Calculator

This document explains how to embed the Burnout Calculator on a Webflow site or any other website.

## Build the Embeddable Version

Run the following command to build the embeddable version:

```bash
node scripts/build-embed.cjs
```

This will create the following files in the `dist` directory:
- `burnout-calculator.es.js` - ES module version
- `burnout-calculator.umd.js` - UMD version that works in browsers
- `style.css` - The styles for the calculator

## Embedding on Webflow or Any Website

### 1. Add the Embed Code to Your Website

#### For Webflow:

1. Add a new "Embed" element where you want the calculator to appear
2. Paste this complete code into the embed element:

```html
<!-- Container for the calculator -->
<div id="burnout-calculator-container"></div>

<!-- Load the styles -->
<link rel="stylesheet" href="https://sunsama-burnout-calc.netlify.app/style.css" crossorigin="anonymous">

<!-- Load the calculator script -->
<script src="https://sunsama-burnout-calc.netlify.app/burnout-calculator.umd.js" crossorigin="anonymous"></script>
```

> **IMPORTANT**: 
> - Make sure to paste the COMPLETE code above into a SINGLE Embed element
> - Do not split it into multiple Embed elements
> - The complete URLs must start with `https://`
> - The `crossorigin="anonymous"` attribute is required for proper resource loading

### 2. Custom Styling (Optional)

You can control the width and other aspects of the container:

```css
#burnout-calculator-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
```

### 3. Custom Initialization (Optional)

If you need to use a different container ID:

```html
<div id="my-custom-container"></div>

<script>
  window.addEventListener('DOMContentLoaded', function() {
    window.embedBurnoutCalculator(document.getElementById('my-custom-container'));
  });
</script>
```

## Troubleshooting

- Make sure the complete embed code is in a single Embed element
- Verify that the URLs begin with `https://sunsama-burnout-calc.netlify.app/`
- Check that both the script and CSS files are loading (using browser dev tools)
- If the calculator doesn't appear, check the browser console for errors
- Make sure there's only one instance of the embed code on the page
- Clear your browser cache if you've recently updated the embed code

## Testing Locally

You can test the embed locally by opening the `public/embed-example.html` file in your browser after building.
