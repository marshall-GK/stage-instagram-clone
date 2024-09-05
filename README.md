## Getting Started

First, install dependencies:

```bash
npm i
```

Second, run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Third, ctrl+shift+i or cmd+option+i:

```bash
Toggle Device toolbar and selected any mobile device.
```


## Project Explanation

- Color palette borrowed from Instagram.
- Focused more on modularity.
- Used ContextApi and Reducer for Data storage.
- No Caching used. 
- Unoptimised prop used in next/Image to avoid low quality image render.
- Project preview enabled only for mobile browsers.
- Pre-commit hook used for Linting before commit.
- Pre-push hook used for executing test cases before a push. 
- Github actions used to run test cases if PR is raised to main branch.
- Vercel is used to deploy this project.
- Backend deployed on Render, it's free server there might be a delay in response like 40 secs.
- Used minimum Typescript type definations, due to time limitation.
- Completed project in a day. 