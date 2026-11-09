# Security Findings Dashboard

JavaScript dashboard that displays fictional security findings in a browser table

## Current Features

- Displays finding IDs, titles, assets, severity levels, and statuses
- Prints summary counts to the browser console
- Includes severity and status filtering functions with console output
- Renders finding values as plain text using `textContent`
- Interactive severity, status, and asset search filters
- Styled dashboard layout, controls, and findings table

## Run Locally

Requires Python 3 to serve the files locally.

1. Download or clone the repository
2. Open a terminal in the project folder
3. Start a local server:

   ```bash
   python -m http.server 8000 --bind 127.0.0.1
   ```

   On Windows, use `py` instead of `python` if needed

4. Open `http://127.0.0.1:8000/` in your browser.

Keep the terminal running while using the dashboard. Press `Ctrl+C` to stop the server.

The dashboard uses JavaScript modules, open it through the local server rather than double-clicking `index.html`.

## Testing

Requires a current Node.js LTS installation. No additional dependencies are needed.

From the project folder run:

```powershell
npm.cmd test
```

Or run the test runner directly:

```bash
node --test
```

The automated tests cover:

- Total finding counts and default results
- Severity and status filtering
- Case insensitive asset search and whitespace handling
- Combined filters and no match results
- Empty collections
- Preserving full collection after filtering
- Protecting stored findings from changes to input data or returned results

Tests cover the `FindingsCollection` class. Browser rendering and interactions are currently checked manually.

## Current Status

In progress. Automated tests for filtering logic implemented, final browser checks and documentation updates to follow.

## Disclaimer

Educational project using synthetic data. This dashboard displays supplied findings, it does not scan systems or detect vulnerabilities.
