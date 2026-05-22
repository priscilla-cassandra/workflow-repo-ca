# Workflow repo for the CA

Holidaze venue booking front end, talking to the [Noroff API v2](https://docs.noroff.dev/docs/v2).

## Setup

1.  Getting started

```bash
git clone https://github.com/priscilla-cassandra/workflow-repo-ca.git
```

```bash
git checkout workflow
```

2. Install dependencies:

   ```bash
   npm install
   ```

   ```bash
   npx playwright install
   ```

3. Create your `.env` from the template:

   ```bash
   cp .env.example .env
   ```

   | Variable             | Used by               | Notes                                         |
   | -------------------- | --------------------- | --------------------------------------------- |
   | `API_BASE_URL`       | the app (login, etc.) | Noroff API v2 base URL, no trailing slash.    |
   | `API_KEY`            | protected requests    | Leave blank until you create one (see below). |
   | `TEST_USER_EMAIL`    | Playwright login test | A real `@stud.noroff.no` account.             |
   | `TEST_USER_PASSWORD` | Playwright login test | That account's password.                      |

4. Run the dev server:

   ```bash
   npm run dev
   ```

5. Running tests

First start development server:

```bash
npm run dev
```

Then open a new terminal tab and run either:

```bash
   npm run playwright  #Opens Playwright UI for manual/interactive testing
```

```bash
   npm run playwright:run  #Runs all E2E tests automatically in the terminsl
```

### Optional

Run tests in selected files:

```bash
   npx playwright test tests/e2e/createMenu.spec.js  #Runs test for navigation to homepage
```

```bash
   npx playwright test tests/e2e/displayVenueList.spec.js  #Runs tests for clicking the first venue, and that it has the correct heading
```

```bash
   npx playwright test tests/e2e/login.spec  #Tests successful login and failed login
```

## How `.env` reaches the browser

This is a no-build static site (`live-server` serves the raw ES modules), so the
browser can't read `.env` directly. `npm run env` reads `.env` with `dotenv` and
writes the public values into `js/env.js`, which `js/config.js` imports. That
script runs automatically before `npm run dev` and the Playwright tests, so you
normally don't call it yourself — but re-run `npm run env` after editing `.env`.

`js/env.js` is generated and git-ignored; never edit or commit it.

## Creating an API key

Login and register don't need an API key, but protected requests (creating
venues, bookings, etc.) do. After logging in, you can create one with
`createApiKey()` from `js/api/auth/createApiKey.js` (it uses your stored access
token). Copy the returned `key` into `.env` as `API_KEY` and re-run
`npm run env`. From then on `headers()` (`js/api/headers.js`) sends it as the
`X-Noroff-API-Key` header. See the [API key docs](https://docs.noroff.dev/docs/v2/auth/api-key).

## Scripts

| Script                   | Description                                  |
| ------------------------ | -------------------------------------------- |
| `npm run dev`            | Generate `js/env.js`, then watch CSS + serve |
| `npm run env`            | Regenerate `js/env.js` from `.env`           |
| `npm run lint`           | ESLint                                       |
| `npm run format`         | Prettier                                     |
| `npm run vitest`         | Unit tests                                   |
| `npm run playwright`     | E2E tests (UI mode)                          |
| `npm run playwright:run` | E2E tests in terminal                        |
