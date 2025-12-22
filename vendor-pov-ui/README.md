## Prerequisites
NodeJS installed on the system.

##
Start app
```
npm run dev
```

## Dockerize app

docker build -t react-app:dev .

## API Requests

Sample #1 
```
"use client";

import { useEffect, useRef, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Post {
  id: number;
  title: string;
}

export default function FetchExample1() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/posts?page=${page}`, {
          signal: abortControllerRef.current?.signal,
        });
        const posts = (await response.json()) as Post[];
        setPosts(posts);
      } catch (e: any) {
        if (e.name === "AbortError") {
          console.log("Aborted");
          return;
        }

        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  if (error) {
    return <div>Something went wrong! Please try again.</div>;
  }

  return (
    <div className="tutorial">
      <h1 className="mb-4 text-2xl">Data Fething in React</h1>
      <button onClick={() => setPage(page - 1)}>Decrease Page ({page})</button>
      <button onClick={() => setPage(page + 1)}>Increase Page ({page})</button>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <ul>
          {posts.map((post) => {
            return <li key={post.id}>{post.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
```

Sample #2
```
"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Post {
  id: number;
  title: string;
}

export default function FetchExample2() {
  const [page, setPage] = useState(0);

  const {
    data: posts,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["posts", { page }],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/posts?page=${page}`);
      return (await response.json()) as Post[];
    },
  });

  // Do cool things with the JSX

  return (
    <div className="tutorial">
      <h1 className="mb-4 text-2xl">Data Fething in React</h1>
      <button onClick={() => setPage(page - 1)}>Decrease Page ({page})</button>
      <button onClick={() => setPage(page + 1)}>Increase Page ({page})</button>
      {isPending && <div>Loading...</div>}
      {!isPending && (
        <ul>
          {posts?.map((post) => {
            return <li key={post.id}>{post.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
```

Sample #3 (SSR)
```
const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Post {
  id: number;
  title: string;
}

export default async function FetchExample3() {
  const response = await fetch(`${BASE_URL}/posts`);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts = (await response.json()) as Post[];

  return (
    <div className="tutorial">
      <h1 className="mb-4 text-2xl">Data Fething in React</h1>
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    </div>
  );
}
```

## Routing
Install
```
npm i react-router-dom
```

Import createBrowserRouter and RouterProvider
```
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
```

Replace App component with RouterProvider to let RouterProvider handle routing
From:
```
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
```
To:
```
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
```

Create route in createBrowserRouter
```
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />
	}
]);
```



## Custom Error Logging
Introduced a custom Logger Utility (./utils/logger.ts) to standardize logging throughout the application. This improves log management and readability.

Usage:
```
  const logger = Logger.for("ComponentName");
  logger.debug("Debug Message", { data });
  logger.info("Info message");
  logger.error("Error occurred", error);
```

Runtime Configuration:
```
  localStorage.setItem("LOG_LEVEL", "DEBUG"); // Enable debug logs
  localStorage.setItem("LOG_NAMESPACES", "AgentPage,newsAPIAgent"); // Enable specific namespaces
```

## Biome (Centralized tool for linting, formatting and import organization)

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

## Material UI + Font + Icons
- Install Material UI
```
npm install @mui/material @emotion/react @emotion/styled
```

- Install Roboto Font
```
npm install @fontsource/roboto
```

- Install Material Icons
```
npm install @mui/icons-material
```

## TailwindCSS
- Install TailwindCSS 4
```
npm install tailwindcss @tailwindcss/vite
```

- Configure the Vite plugin (vite.config.ts)
```
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

- Import Tailwind CSS
```
@import "tailwindcss";
```