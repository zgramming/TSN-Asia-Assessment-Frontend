
# Assessment Form Frontend

## Project Overview

This is a Next.js frontend application for managing and submitting assessment forms. It features a responsive UI, grid-based cards, and integration with APIs. The project is designed for scalability and ease of use in interview or evaluation scenarios.

## Installation & Local Development

### Prerequisites
- Node.js (v18 or newer recommended)
- npm, yarn, pnpm, or bun

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

## Running with Docker

### Build Docker Image

```bash
docker build -t assessment-form-frontend .
```

### Run Docker Container

```bash
docker run -p 3000:3000 --env NEXT_PUBLIC_BASE_URL=http://localhost:5000/api assessment-form-frontend
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

For more details, see the Next.js documentation: [https://nextjs.org/docs](https://nextjs.org/docs)
