# Brent Nequin

**Senior Software Engineer · Backend & Full-Stack Development**

I'm a software engineer focused on building reliable backend systems, APIs, and full-stack applications. I enjoy taking projects from architecture and planning through implementation, testing, and delivery.

### 🛠️ Technologies

**Languages:** Python · TypeScript · JavaScript
**Backend:** Flask · REST APIs · Microservices
**Frontend:** Vue · Nuxt · React
**Databases:** PostgreSQL
**Cloud & Infrastructure:** AWS · Docker · CI/CD
**Development:** Git · GitHub · GitHub Copilot

### 🚀 Projects

#### 🎮 Steam Backlogger

A web application for managing and making progress through a large Steam game backlog. The project integrates with the Steam ecosystem to organize a game library, track progress and playtime, and provide a more useful way to decide what to play next.

**Tech:** Nuxt 4 · Django · Django REST Framework · PostgreSQL · Steam Web API

[View project →](https://github.com/brentnequin)

#### 🏠 Personal Website

My personal website and a place to experiment with web applications, APIs, and other software projects.

[brentnequin.com](https://brentnequin.com)

### 💼 Professional Experience

I currently work as a Senior Software Engineer building software for financial services. My work includes backend services, APIs, internal platforms, and full-stack applications.

Previously, I worked at Epsilon building cloud-based applications and distributed services.

### 📫 Connect

* **Website:** [brentnequin.com](https://brentnequin.com)
* **GitHub:** [github.com/brentnequin](https://github.com/brentnequin)
* **LinkedIn:** [LinkedIn](https://www.linkedin.com/in/brentnequin/)

### Admin dashboard

The private dashboard is available at `/admin`. It uses GitHub OAuth and only
allows the account configured in `NUXT_ADMIN_GITHUB_USERNAME` (currently
`brentnequin`). The Movies section can mark already-recommended movies as
watched or unwatched. These controls are also protected by server-side session
checks; the route path is not treated as a security measure.

Create a GitHub OAuth App with the callback URL
`https://<your-domain>/auth/github` (for local development, use
`http://localhost:3000/auth/github`). Configure these server environment
variables:

- `NUXT_OAUTH_GITHUB_CLIENT_ID`
- `NUXT_OAUTH_GITHUB_CLIENT_SECRET`
- `NUXT_ADMIN_GITHUB_USERNAME`
- `NUXT_APP_SECRET` — a unique secret of at least 32 characters in production

Do not expose these values through public runtime configuration or commit real
credentials. `.env.example` lists the variable names for local setup.
