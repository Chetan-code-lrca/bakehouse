# Focus Timer

A static site (single `index.html`): Pomodoro timer, study stats, tasks and daily goal.

## Deploy to Azure Static Web Apps
1. Push this folder to a GitHub repo (branch `main`).
2. Azure portal > Create a resource > Static Web App.
3. Deployment source: GitHub. Pick your repo and the `main` branch.
4. Build preset: Custom. App location: `/`. Output location: leave empty.
5. Create. Azure adds the secret `AZURE_STATIC_WEB_APPS_API_TOKEN` to your repo.
6. Every push to `main` redeploys. Your URL is shown on the Static Web App overview page.

If Azure generates its own workflow file in `.github/workflows`, keep only one of them.

Note: the AI coach and AI day planner only work inside claude.ai. On Azure they stay hidden and everything else works.
