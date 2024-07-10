# Elysia with Bun runtime

Simple ElysiaJS authentication using jwt bearer token.

File, folder, and code structure is inspired by [dicoding's 'Belajar Fundamental Aplikasi Back-End' repository.](https://github.com/dicodingacademy/a271-backend-menengah-labs)

## Prerequisite

- [Git](https://git-scm.com/downloads)
- [Bun](https://bun.sh/)

## Getting Started

Clone the repository:

```bash
git clone https://github.com/savareyhano/elysia-auth.git
```

Navigate to the project directory:

```
cd elysia-auth
```

Create a `.env` file and configure it:

```bash
cp .env.example .env
```

Install the dependencies:

```bash
bun install
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## API

### Protected Endpoint

Endpoint:

`GET /protected`

### Register user

Endpoint:

`POST /api/users/register`

Payload:

```json
{
  "username": "johndoe",
  "password": "johndoe123"
}
```

### Login user

Endpoint:

`POST /api/authentications/login`

Payload:

```json
{
  "username": "johndoe",
  "password": "johndoe123"
}
```

### Refresh Token

Endpoint:

`POST /api/authentications/refresh-token`

Payload:

```json
{
  "refreshToken": "yourrefreshtokenhere"
}
```
