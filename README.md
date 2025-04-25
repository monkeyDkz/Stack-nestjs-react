# Stack NestJS React PostgreSQL Docker

## Description

This project is a full-stack application built with the following technologies:

- **Backend**: [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient and scalable server-side applications.
- **Frontend**: [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- **Database**: [PostgreSQL](https://www.postgresql.org/) - A powerful, open-source object-relational database system.
- **Containerization**: [Docker](https://www.docker.com/) - Used to containerize both the frontend and backend applications, with a `docker-compose.yml` file at the root of the project for orchestration.

## Features

- **User Authentication**:
    - User registration and login system.
    - Secure password storage using hashing.
    - JWT-based authentication for secure API access.

- **Frontend**:
    - Built with React for a dynamic and responsive user interface.
    - Communicates with the backend API for user authentication and data management.

- **Backend**:
    - Developed using NestJS for a modular and maintainable architecture.
    - RESTful API endpoints for user management and authentication.

- **Database**:
    - PostgreSQL database for storing user data and other application-related information.

- **Dockerized Environment**:
    - Dockerfile for both frontend and backend applications.
    - `docker-compose.yml` for easy setup and orchestration of the entire stack.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.
- Basic knowledge of Docker and Docker Compose.

## Getting Started

1. Clone the repository:
     ```bash
     git clone git@github.com:monkeyDkz/Stack-nestjs-react.git
     cd StackEEMI
     ```

2. Start the application using Docker Compose:
     ```bash
     docker-compose up --build
     ```

3. Access the application:
     - Frontend: `http://localhost:3000`
     - Backend API: `http://localhost:5000`

## Project Structure

```
StackEEMI/
├── backend/          # NestJS backend application
│   ├── Dockerfile
│   └── src/
├── frontend/         # React frontend application
│   ├── Dockerfile
│   └── src/
├── docker-compose.yml
└── README.md
```

## License

This project is licensed under the [MIT License](LICENSE).