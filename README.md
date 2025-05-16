# Test Submission

This is a frontend web application built using Next.js 13 App Router. It is part of the fullstack microservices project and connects to the backend via REST API and real-time via Socket.IO.

This app supports:

- Authentication
- Chat features
- Notifications
- User profile management

## Technology Used

- Next.js 13 App Router
- Axios
- NextAuth.js
- Radix UI
- React Hook Form + Zod
- Redux & Redux Toolkit
- React Hot Toast
- React Datepicker
- React Select
- Socket.IO Client
- TailwindCSS

## Installation

- Install dependencies:

  ```bash
  npm install
  ```

- Set up environment variables

  ```bash
  NEXT_PUBLIC_PORT=3090
  NEXT_PUBLIC_FILE_URL=http://localhost:3091/file/
  NEXT_PUBLIC_API_URL=http://localhost:3091
  PORT=3090

  # NextAuth
  NEXTAUTH_SECRET=secret
  NEXTAUTH_URL=http://localhost:3090

  # Socket
  NEXT_PUBLIC_SOCKET_URL=http://localhost:3094

  ```

- Build and start production server

  ```bash
  npm run build
  npm start
  ```
