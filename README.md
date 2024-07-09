# Elysia with Bun runtime

Simple authentication using jwt bearer token.

File, folder, and code structure is inspired by [dicoding's 'Belajar Fundamental Aplikasi Back-End' repository.](https://github.com/dicodingacademy/a271-backend-menengah-labs)

## Install Bun

### macOS and Linux

Linux users — The unzip package is required to install Bun. Use `sudo apt install unzip` to install `unzip` package. Kernel version 5.6 or higher is strongly recommended, but the minimum is 5.1. Use `uname -r` to check Kernel version.

```bash
# macOS/Linux (curl)
curl -fsSL https://bun.sh/install | bash # for macOS, Linux, and WSL
# to install a specific version
curl -fsSL https://bun.sh/install | bash -s "bun-v1.0.0"

# npm
npm install -g bun # the last `npm` command you'll ever need

# Homebrew
brew install oven-sh/bun/bun # for macOS and Linux

# Docker
docker pull oven/bun
docker run --rm --init --ulimit memlock=-1:-1 oven/bun
```

### Windows

```bash
# PowerShell/cmd.exe
powershell -c "irm bun.sh/install.ps1|iex"

# npm
npm install -g bun

# Scoop
scoop install bun
```

## Getting Started

To get started with this template, simply paste this command into your terminal:

```bash
bun create elysia ./elysia-example
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
