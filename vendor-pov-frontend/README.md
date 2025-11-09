# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## ESLint & Prettier
npm i -D prettier eslint eslint-config-prettier eslint-plugin-prettier

### How to run
* Add it to package.json and run it via writing the npm run command to the terminal.
```
"lint": "eslint src/**/*.{js,jsx,ts,tsx,json}",
"lint:fix": "eslint --fix src/**/*.{js,jsx,ts,tsx,json}",
"format": "prettier --write src/**/*.{js,jsx,ts,tsx,css,md,json,scss} --config ./.prettierrc"
```

Create new file prettierrc.json
```
{
   “semi”: true,
   “singleQuote”: true,
   “jsxSingleQuote”: true,
   “trailingComma”: “es5”,
   “printWidth”: 80,
   “tabWidth”: 2,
   “endOfLine”: “auto”
}
```

or

* Install prettier and eslint extensions

or 

* Add settings for VSCode for when we save it automatically run.
create a .vscode folder and settings.json inside this folder.
```
{
"editor.codeActionsOnSave": { "source.fixAll.eslint": true },
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true
}
```