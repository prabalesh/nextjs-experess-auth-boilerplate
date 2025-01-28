# Next.js + Express Boilerplate with Session-Based Authentication (TypeScript)

This repository provides a boilerplate for building web applications with a **Next.js** frontend and an **Express.js** backend. It includes **session-based authentication** and is written in **TypeScript** for improved reliability and scalability.

## Project Structure

The repository is organized into two main directories:

-   **frontend**: Contains the Next.js application.
-   **backend**: Contains the Express.js server.

## Features

-   **Frontend**:

    -   Built with Next.js App Router for modern React features.
    -   Includes **ShadCN** components for a beautiful and consistent UI.
    -   State management with **Zustand**.
    -   API calls managed with **React Query** for caching and data synchronization.

-   **Backend**:

    -   Express.js server for handling API and authentication logic.
    -   Database interaction using **Drizzle ORM** with **PostgreSQL** for type-safe and efficient queries.

-   **Session-Based Authentication**: Secure session handling.
-   **TypeScript**: End-to-end type safety for the frontend and backend.
-   **Environment Configuration**: Easy setup with `.env` files for both frontend and backend.

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/prabalesh/nextjs-experess-auth-boilerplate
cd nextjs-experess-auth-boilerplate
```

### 2. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

#### Frontend

Copy the example `.env` file and configure your environment:

```bash
cd frontend
cp .env.example .env
```

Modify `.env` as needed.

#### Backend

Copy the example `.env` file and configure your environment:

```bash
cd backend
cp .env.example .env
```

Modify `.env` as needed.

---

## Setting Up Google and GitHub OAuth Credentials

### Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing project
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth Client ID**
5. Set the application type to **Web Application**
6. Enter the following:
    - **Authorized redirect URIs**: Add your backend's callback URL, e.g., `http://localhost:5000/auth/google/callback`
7. Save the client and copy the **Client ID** and **Client Secret** to your backend `.env` file:

```env
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

### GitHub OAuth

1. Go to GitHub Developer Settings
2. Click New OAuth App
3. Fill out the form:
    - **Application Name**: Your app's name
    - **Homepage URL**: `http://localhost:3000`
    - **Authorization Callback URL**: `http://localhost:5000/auth/github/callback`
4. Register the application and copy the Client ID and Client Secret to your backend `.env` file:

```env
GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>
```

---

## Scripts

### Frontend

-   **Development**:

    ```bash
    npm run dev
    ```

    Runs the Next.js development server on `http://localhost:3000`.

-   **Build**:

    ```bash
    npm run build
    ```

    Builds the frontend for production.

-   **Start**:
    ```bash
    npm start
    ```
    Starts the production server.

### Backend

-   **Development**:

    ```bash
    npm run start:dev
    ```

    Runs the Express.js server in development mode (e.g., using `nodemon`).

-   **Build**:

    ```bash
    npm run build
    ```

    Builds the backend for production.

-   **Start**:
    ```bash
    npm run start
    ```
    Starts the backend server in production mode.

---

## Example `.env` File

### Frontend (`frontend/.env`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (`backend/.env`)

```env
PORT=5000
DATABASE_URL=postgres://postgres:@localhost:5432/somedb
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
SESSION_SECRET=thisisweaksecretchangeitasap
FRONTEND_URL=http://localhost:3000
REDIS_URI=redis://default:@127.0.0.1:6379
ENV=development
```

---

## Getting Started

1. Start the **backend** server:
    ```bash
    cd backend
    npm run dev
    ```
2. Start the **frontend** server:
    ```bash
    cd frontend
    npm run dev
    ```
3. Open the application in your browser at [http://localhost:3000](http://localhost:3000).

---

## Contributing

Feel free to open issues or submit pull requests to improve this boilerplate.

---

## License

This project is licensed under the MIT License.
