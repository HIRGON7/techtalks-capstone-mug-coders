# MUG Coders

**TechTalks Full-Stack Bootcamp — Capstone Project**

**Live Application:** https://techtalks-capstone-mug-coders.vercel.app/

**GitHub Repository:** https://github.com/HIRGON7/techtalks-capstone-mug-coders

## Overview

MUG Coders is a full-stack developer community platform designed to help developers share technical knowledge, publish projects, participate in discussions, discover communities, and connect with other developers.

The application was developed as part of the TechTalks Full-Stack Bootcamp Capstone Project, using the DevCommunity specifications.

It combines a Next.js application, server-side database operations, secure OAuth authentication, structured content management, and a responsive theme-based interface.

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack framework using the App Router |
| React 19 | Component-based user interface |
| TypeScript | Type-safe development |
| Tailwind CSS 4 | Responsive styling |
| MongoDB Atlas | Cloud database |
| Mongoose | Data models, relationships, and querying |
| Auth.js / NextAuth v5 | Authentication with Google and GitHub |
| Zod | Client-side and server-side validation |
| Vercel | Hosting and deployment |

## Core Features

### Authentication and User Accounts

- Google OAuth authentication
- GitHub OAuth authentication
- Session-based access control using Auth.js
- User account creation and persistence in MongoDB
- Protected dashboard and user-specific pages
- Public developer profiles with names, usernames, bios, and skills

### Communities and Topics

- Browse developer communities
- View individual community pages
- Join or leave communities
- Organize posts by community and technical topics

### Blog and Post Management

- Create, read, update, and delete posts
- Associate posts with communities and topics
- Enforce post ownership for editing and deletion
- Search posts by keyword
- Filter by community and topic
- Sort and paginate search results

### Discussions and Bookmarks

- View comments on posts
- Add and delete comments with access controls
- Bookmark posts for later
- View a personal collection of saved posts

### User Interface

- Responsive layouts built with Tailwind CSS
- Reusable components for navigation, forms, and content
- Loading, error, empty, and not-found states
- Five visual themes: Core, Frostfall, Armageddon, Forbidden Love, and Flora
- Custom animated theme mascots and visual assets

## Application Architecture

MUG Coders uses the Next.js App Router with a separation between server-rendered pages, interactive client components, backend route handlers, and database operations.

**Project structure:**

- `app/` — Application routes, pages, layouts, and API route handlers
- `app/api/` — HTTP endpoints for posts, comments, communities, bookmarks, and authentication
- `components/` — Reusable UI components and interactive client components
- `lib/` — Database connection and reusable data-access queries
- `models/` — Mongoose schemas and database models
- `schemas/` — Zod validation schemas
- `public/` — Images, themes, mascots, and animation assets
- `auth.ts` — Central Auth.js configuration

### Rendering Strategies

The application demonstrates multiple Next.js rendering strategies.

**Static rendering:** The homepage is suitable for static rendering because its primary content does not depend on an authenticated session or database query.

**Dynamic server-side rendering:** Posts, user profiles, dashboard, bookmarks, and database-driven community views use server-side logic to retrieve current or user-specific data.

**Client Components:** Interactive functionality such as forms, bookmarks, community membership actions, theme switching, and navigation controls uses React client-side interactivity.

These decisions balance rendering efficiency, current database information, and user interaction.

## Database Design

The application uses MongoDB Atlas and Mongoose.

Its principal data models are:

- `User` — Developer account and profile information
- `Community` — Community information
- `Membership` — User-community membership relationships
- `Post` — Published content, authorship, topics, and community references
- `Comment` — Comments associated with posts and users
- `Bookmark` — Saved-post relationships

Mongoose `ObjectId` references connect related documents. Selected indexes support querying and retrieval of posts, including filtering and ordering.

## Authentication, Authorization, and Validation

Authentication is managed by Auth.js with Google and GitHub providers.

Protected routes use the current authenticated session to identify the user. Backend mutation handlers perform authorization checks and enforce ownership where required.

Examples include:

- Returning HTTP `401` for unauthenticated requests
- Returning HTTP `403` when a user attempts an unauthorized modification
- Verifying ownership before modifying or deleting posts
- Validating incoming post data with Zod
- Returning structured validation errors for invalid requests

Zod schemas are shared between interactive forms and backend handlers to maintain consistent validation rules.

Database credentials and OAuth secrets are stored in environment variables rather than committed to the repository.

## Local Development

### Prerequisites

- Node.js compatible with Next.js 16
- npm
- MongoDB Atlas database
- Google OAuth application
- GitHub OAuth application

### Installation

Clone the repository:

```bash
git clone https://github.com/HIRGON7/techtalks-capstone-mug-coders.git
cd techtalks-capstone-mug-coders
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root and configure the environment variables described below.

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

To test the production build locally:

```bash
npm run build
npm run start
```

## Environment Variables

The application requires the following environment variables:

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `AUTH_SECRET` | Secret used by Auth.js |
| `AUTH_GOOGLE_ID` | Google OAuth Client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth Client Secret |
| `AUTH_GITHUB_ID` | GitHub OAuth Client ID |
| `AUTH_GITHUB_SECRET` | GitHub OAuth Client Secret |

`AUTH_TRUST_HOST=true` may be required when testing a locally hosted production server outside a trusted hosting environment.

Actual credential values must never be committed to Git.

## OAuth Configuration

The deployed application uses the following production callback URLs.

**Google:**

```text
https://techtalks-capstone-mug-coders.vercel.app/api/auth/callback/google
```

**GitHub:**

```text
https://techtalks-capstone-mug-coders.vercel.app/api/auth/callback/github
```

These URLs must be registered with the corresponding OAuth providers.

For local development, the callbacks use `http://localhost:3000` with the same callback paths.

## Deployment

MUG Coders is hosted on Vercel and uses MongoDB Atlas as its cloud database.

Deployment procedure:

1. Push the source code to GitHub.
2. Import the repository into Vercel.
3. Select Next.js as the application framework.
4. Configure the required environment variables securely.
5. Ensure MongoDB Atlas network access permits connections from the deployment environment.
6. Configure production OAuth callback URLs for Google and GitHub.
7. Deploy the application.
8. Test authentication, database connectivity, and application functionality on the public domain.

Updates pushed to the connected GitHub branch can trigger new Vercel deployments.

## Design and Technical Decisions

**Server-side ownership enforcement:** Authorization is checked on the server rather than relying on hidden or disabled client-side controls.

**Reusable validation:** Shared Zod schemas provide consistent validation between forms and APIs.

**Separate data-access layer:** Database queries are organized in `lib/queries/`, keeping retrieval logic separate from page presentation.

**MongoDB references:** Relationships between users, posts, communities, comments, and bookmarks are represented through Mongoose models and references.

**Themed interface:** Five visual themes demonstrate a reusable styling system, with theme-specific assets and presentation while preserving shared application behavior.

## Capstone Context

This project was developed for the **TechTalks Full-Stack Bootcamp**, following the DevCommunity capstone specifications.

The project demonstrates practical experience in full-stack development, database modeling, authentication, authorization, API design, validation, responsive UI development, rendering strategies, Git-based version control, and cloud deployment.

---

**Developed by HIRGON7**

**TechTalks Full-Stack Capstone — MUG Coders**
