# 🧠 QuizCraft AI

<div align="center">

**Live AI-Powered Quiz SaaS Platform**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-quizcraft.live-FF4444?style=for-the-badge)](https://quizcraft.live)
[![Java](https://img.shields.io/badge/Java_17-Spring_Boot-orange?style=for-the-badge&logo=java)](https://spring.io/projects/spring-boot)
[![AWS](https://img.shields.io/badge/AWS-EC2_+_RDS-232F3E?style=for-the-badge&logo=amazonaws)](https://aws.amazon.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai)](https://openai.com)
[![Docker](https://img.shields.io/badge/Docker-Deployed-2496ED?style=for-the-badge&logo=docker)](https://docker.com)

*Generate AI-powered quizzes on any topic instantly. Built with a production-grade Java backend, deployed on AWS with 99%+ uptime.*

</div>

---

## 📸 Screenshots

### Sign In & Register
<table>
  <tr>
    <td><img src="screenshots/login.png" alt="Login Page" width="100%"/></td>
    <td><img src="screenshots/register.png" alt="Register Page" width="100%"/></td>
  </tr>
  <tr>
    <td align="center"><b>Login Page</b></td>
    <td align="center"><b>Register Page</b></td>
  </tr>
</table>

### Dashboard & Quiz Generation
<table>
  <tr>
    <td><img src="screenshots/dashboard.png" alt="Dashboard" width="100%"/></td>
    <td><img src="screenshots/generate.png" alt="Generate Quiz" width="100%"/></td>
  </tr>
  <tr>
    <td align="center"><b>User Dashboard</b></td>
    <td align="center"><b>AI Quiz Generator</b></td>
  </tr>
</table>

### Quiz Experience & Results
<table>
  <tr>
    <td><img src="screenshots/quiz.png" alt="Quiz in Progress" width="100%"/></td>
    <td><img src="screenshots/results.png" alt="Quiz Results" width="100%"/></td>
  </tr>
  <tr>
    <td align="center"><b>Quiz in Progress</b></td>
    <td align="center"><b>Results Breakdown</b></td>
  </tr>
</table>

### Leaderboard & Analytics
<table>
  <tr>
    <td><img src="screenshots/leaderboard.png" alt="Leaderboard" width="100%"/></td>
    <td><img src="screenshots/analytics.png" alt="Analytics" width="100%"/></td>
  </tr>
  <tr>
    <td align="center"><b>Global Leaderboard</b></td>
    <td align="center"><b>Personal Analytics</b></td>
  </tr>
</table>

---

## ✨ Features

- 🤖 **AI Quiz Generation** — Generates 10 MCQs instantly on any topic using OpenAI API
- 🔐 **JWT Authentication** — Stateless auth with RBAC and BCrypt password hashing
- 📊 **Personal Dashboard** — Quiz history, best scores, and topic tracking per user
- 🏆 **Global Leaderboard** — Real-time ranking across all users
- ⚡ **Token Optimization** — Structured JSON prompting reduces OpenAI token usage by ~30% and eliminates parsing errors
- 🌐 **Production Ready** — HTTPS with auto-renewing SSL, 99%+ uptime since launch

---

## 🏗️ Architecture

```
React Frontend (Vercel)
        │
        ▼  HTTPS (443)
   Nginx Reverse Proxy  ◄── SSL via Let's Encrypt (Certbot)
        │
        ▼  Internal (8080)
Spring Boot Backend (Docker · AWS EC2)
        │
   ┌────┴──────────┐
   ▼               ▼
PostgreSQL      OpenAI API
(AWS RDS)      (Structured JSON)
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Java 17, Spring Boot, Spring MVC, Spring Security |
| **AI** | OpenAI API, Structured JSON Prompt Engineering, Token Optimization |
| **Auth** | JWT (Stateless), RBAC, BCrypt |
| **Database** | PostgreSQL on AWS RDS, Spring Data JPA, Hibernate |
| **Cloud** | AWS EC2, AWS RDS, AWS S3 |
| **DevOps** | Docker, Nginx (Reverse Proxy), Let's Encrypt SSL, GitHub Actions |
| **Frontend** | React.js, deployed on Vercel |
| **API Docs** | Swagger / OpenAPI |

---

## 🔑 Key Engineering Decisions

### Structured JSON Prompting
Rather than accepting free-form AI responses, I engineered a strict JSON output schema enforced at the prompt level. This eliminates response parsing errors entirely and reduces OpenAI token consumption by ~30% compared to unstructured prompts.

### JWT Stateless Authentication
All endpoints are secured with stateless JWT tokens — no server-side session storage needed. RBAC controls access to quiz creation, history, and admin routes across all user roles.

### Docker + Nginx on EC2
The backend is fully containerized with Docker and served behind Nginx as a reverse proxy. This enables zero-downtime container restarts and clean HTTPS termination at the proxy layer.

### Separated Compute + Storage
PostgreSQL runs on AWS RDS (separate from the EC2 instance), decoupling compute from storage for better reliability, independent scaling, and automated backups.

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | ❌ | Register new user |
| `POST` | `/api/auth/login` | ❌ | Login and receive JWT |
| `POST` | `/api/quiz/generate` | ✅ | Generate AI quiz by topic |
| `GET` | `/api/quiz/history` | ✅ | Get user's quiz history |
| `POST` | `/api/quiz/{id}/submit` | ✅ | Submit quiz answers |
| `GET` | `/api/leaderboard` | ✅ | Get global leaderboard |
| `GET` | `/api/analytics/me` | ✅ | Get personal analytics |

> Full interactive docs available at `/swagger-ui.html`

---

## ⚙️ Local Setup

```bash
# Clone the repository
git clone https://github.com/Abhishek-fullstack-dev/quizcraft-ai.git
cd quizcraft-ai
```

### Backend
```bash
cd quizcraft-backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd quizcraft-frontend
npm install
npm start
```

### Environment Variables
```env
OPENAI_API_KEY=your_openai_api_key
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/quizcraft
SPRING_DATASOURCE_USERNAME=your_db_user
SPRING_DATASOURCE_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=86400000
```

---

## ☁️ Production Deployment

| Component | Setup |
|---|---|
| **EC2** | t2.micro Ubuntu, running Dockerized Spring Boot |
| **RDS** | PostgreSQL db.t3.micro, isolated in VPC |
| **Nginx** | Reverse proxy: port 443 → port 8080 |
| **SSL** | Let's Encrypt certificate with Certbot auto-renewal |
| **Uptime** | 99%+ since January 2026 |

---

## 📁 Project Structure

```
quizcraft-backend/
├── src/main/java/com/quizcraft/backend/
│   ├── config/          # Security, JWT, CORS config
│   ├── controller/      # REST API controllers
│   ├── dto/             # Request/Response DTOs
│   ├── entity/          # JPA entities
│   ├── repository/      # Spring Data JPA repositories
│   ├── security/        # JWT filter, auth provider
│   └── service/         # Business logic + OpenAI integration
└── src/main/resources/
    └── application.properties
```

---

## 👤 Author

**Abhishek Kumar** — Java Backend Engineer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/abhishek-kumar-380446233)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-00C853?style=flat&logo=vercel)](https://abhishekkumar-dev.vercel.app)
[![Live App](https://img.shields.io/badge/QuizCraft-Live-FF4444?style=flat)](https://quizcraft.live)

---

<div align="center">
  <i>Built and deployed independently — from zero to production on AWS.</i>
</div>
