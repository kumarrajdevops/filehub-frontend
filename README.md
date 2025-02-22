# 1. Create new Vite project with React + TypeScript template

```bash
npm create vite@latest filehub-frontend --template react-ts
```

# 2. Install dependencies

```bash
cd filehub-frontend
npm install
```

# 3. Install React Router and Axios

```bash
# Install React Router and Axios
npm install react-router-dom axios

# Install GitHub Pages as dev dependency
npm install gh-pages --save-dev
```

# 4. Start development server

```bash
npm run dev
```

# Notes:

- There were some Node.js version compatibility warnings (project requires Node.js ^18.0.0 || ^20.0.0 || >=22.0.0)
- The development server runs on http://localhost:5173/
- The project uses:
  - React with TypeScript
  - SWC compiler
  - Vite as build tool
  - React Router for routing
  - Axios for HTTP requests
  - GitHub Pages for deployment

# Warning Resolution:

If you're seeing Node.js version warnings, consider:

- Upgrading Node.js to a compatible version (18.x, 20.x, or 22.x)
- Using a version manager like nvm to switch between Node.js versions

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
