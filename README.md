# playwright-saucedemo

UI tests for [saucedemo.com](https://www.saucedemo.com), written with Playwright and TypeScript using the Page Object Model.

## Project layout

```
pages/      Page objects: locators and single-page actions (LoginPage, InventoryPage, CartPage, CheckoutPage)
steps/      Business-level flows built from page objects, including assertions (LoginSteps, CartSteps, CheckoutSteps)
data/       Test data: usernames, expected messages, products, customer details (no secrets)
fixtures/   Custom Playwright fixtures that inject the step classes, the password and a logged-in state
tests/      Spec files (login, cart, checkout)
```

Specs call **steps**, steps call **pages**, and pages are the only layer that knows about selectors (the `data-test` attributes on saucedemo).

## Test coverage

| Spec | Scenario |
| --- | --- |
| `tests/login.spec.ts` | Valid login, locked-out user error, wrong password error |
| `tests/cart.spec.ts` | Add an item to the cart |
| `tests/checkout.spec.ts` | Checkout happy path: add items, enter details, finish order |

## Prerequisites

- Node.js 18+ (CI uses Node 22)

## Setup

```bash
npm install
npx playwright install chromium
cp .env.example .env
```

Then set `SAUCE_PASSWORD` in `.env` to the shared demo password shown on the saucedemo login page. `.env` is git-ignored; the password is never committed. You can export it in your shell instead:

```bash
export SAUCE_PASSWORD=<password>
```

Optionally set `BASE_URL` to point at a different deployment (defaults to `https://www.saucedemo.com`).

## Running the tests

```bash
npm test                  # all tests, headless
npm run test:headed       # watch the browser
npm run test:ui           # Playwright UI mode
npx playwright test tests/login.spec.ts   # a single spec
npm run report            # open the last HTML report
npm run typecheck         # TypeScript check
```

## Continuous integration

`.github/workflows/playwright.yml` runs the type check and the full suite on every pull request (and can be started manually from the Actions tab). The HTML report is uploaded as a build artifact.

The workflow reads the password from a repository secret. Add it once under **Settings → Secrets and variables → Actions → New repository secret**, named `SAUCE_PASSWORD`.
