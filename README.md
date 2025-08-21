# Assessment Form Frontend

## Project Overview

This is a Next.js frontend application for managing and submitting assessment forms. It features a responsive UI, grid-based cards, and integration with APIs. The project is designed for scalability and ease of use in interview or evaluation scenarios.

## Tech Stack

- Next.js
- TypeScript
- Mantine UI
- React Query
- Tailwind CSS
- PostCSS
- Docker & Docker Compose (optional)

## Installation Manual (without Docker)

### Prerequisites
- Node.js (v18 or newer recommended)
- npm, yarn, pnpm, or bun

### Clone the Repository
```bash
git clone https://github.com/zgramming/TSN-Asia-Assessment-Frontend.git
cd TSN-Asia-Assessment-Frontend
```

### Environment Variables
Create a `.env` file in the project root. Example:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000/api
```

### Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Run Locally
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Installation Manual (with Docker & Docker Compose)

### Build Docker Image
```bash
docker build -t assessment-form-frontend .
```

### Run Docker Container
```bash 
docker run -p 3000:3000 --env NEXT_PUBLIC_BASE_URL=http://localhost:5000/api assessment-form-frontend
```
The app will be available at [http://localhost:3000](http://localhost:3000).

### Using Docker Compose

1. Make sure you have a `.env` file in the project root (see above).
2. Run:
```bash
docker-compose up --build
```
The app will be available at [http://localhost:3000](http://localhost:3000).

## Useful Commands

- `npm run dev` / `yarn dev` / `pnpm dev` / `bun dev` — Start development server
- `npm run build` / `yarn build` / `pnpm build` / `bun build` — Build for production
- `npm start` / `yarn start` / `pnpm start` / `bun start` — Start production server
- `npm run lint` / `yarn lint` / `pnpm lint` / `bun lint` — Run ESLint

## License

MIT
