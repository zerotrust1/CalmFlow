# Project Overview

This is a Next.js web application called **CalmFlow**. It's a relaxation and meditation app that provides a guided breathing exercise with customizable settings, background music, and visual themes. The app is built with React, TypeScript, and Tailwind CSS. It uses Framer Motion for animations and Howler for audio playback.

# Building and Running

## Development

To run the development server, use one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building

To build the application for production, run:

```bash
npm run build
```

## Starting the server

To start the production server, use:

```bash
npm run start
```

# Development Conventions

*   **Styling**: The project uses Tailwind CSS for styling. Utility classes are preferred over custom CSS.
*   **Components**: The application is built with React components located in `src/components`.
*   **Pages**: The main pages of the application are in `src/pages`.
*   **State Management**: Component-level state is managed with React hooks (`useState`, `useEffect`, etc.).
*   **Animations**: Animations are handled by Framer Motion.
*   **Audio**: Audio is managed by the Howler library.
*   **Linting**: The project uses ESLint for code linting. Run `npm run lint` to check for issues.
