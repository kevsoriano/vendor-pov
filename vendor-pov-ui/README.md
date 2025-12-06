## Prerequisites
NodeJS installed on the system.

## Configure Biome (Centralized tool for linting, formatting and import organization)

- Install
```
npm i -D --save-exact @biomejs/biome
```

- Edit package.json
```
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "biome lint --write ./src",
    "lint:check": "biome lint .",
    "format": "biome format --write .",
    "format:check": "biome format --check .",
    "check": "biome check --apply .",
    "check:ci": "biome check .",
    "preview": "vite preview"
  },
```

### Common commands

- Code Formatting
Format your code with:
```
npm run format
```

- Linting
To check for code quality issues:
```
npm run lint:check
```

- Running Both Linting and Formatting
```
npm run check
```

- Run all tools with the check command
```
npx @biomejs/biome check --write ./src
```

- List all commands
```
biome --help displays the available commands.
```

### Configuring Biome
- Adjusting Formatter Options
```
{
  "formatter": {
    "enabled": true,
    "indentStyle": "tab",
    "indentWidth": 4,
    "lineWidth": 100
  }
}
```

- Customizing Linter Rules
```
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "style": {
        "noNonNullAssertion": "off"
      },
      "suspicious": {
        "noExplicitAny": "error"
      }
    }
  }
}
```
- Ignoring files
```
{
  "files": {
    "ignore": ["dist/**", "build/**", "node_modules/**"]
  }
}
```

### IDE Integration
Visual Studio Code
1. Install the “Biome” extension from the VS Code marketplace
2. Configure it in your settings.json (Command + , in Mac or Ctrl + Shift + P in Win):
```
{
  "editor.formatOnSave": true,
  "[javascript][typescript][javascriptreact][typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  }
}
```

### Integrating Biome with Git Hooks
Using Biome with Git hooks ensures code quality before commits. Install Husky and configure it with Biome:
```
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

Then configure lint-staged in your package.json:
```
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": ["biome check --apply"]
  }
}
```

If not working, try:
https://medium.com/@abpeter14/how-to-install-commitlint-husky-2024-f1157f14006f

### Migrating from ESLint and Prettier
1. Remove old tools
```
npm uninstall eslint prettier eslint-config-* eslint-plugin-*
```

2. Remove the configuration files
```
rm .eslintrc.* .prettierrc.*
```

### Troubleshooting Common Issues
#### Configuration Not Taking Effect
If your configuration isn’t being applied:

- Verify your biome.json is in the project root
- Check for syntax errors in your configuration
- Try running with the --verbose flag to get more information

#### Performance Issues
If Biome seems slow:
- Check if you’re analyzing too many files (especially in node_modules)
- Ensure your ignore patterns are correctly set

#### Conflicts with Other Tools
If you’re seeing conflicts:

- Ensure you’re not running multiple formatters on the same files
- Remove other linting/formatting tools or disable them for files handled by Biome
- Check for conflicting editor extensions

## Centralized Error Logging