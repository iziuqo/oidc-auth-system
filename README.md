# OIDC Authentication System

A Next.js application implementing OpenID Connect (OIDC) authentication using Google as the identity provider.

## Features

- OIDC authentication with Google
- Protected dashboard route
- Type-safe authentication
- Responsive UI with Tailwind CSS
- Error handling

## Deployment Steps

1. Fork this repository

2. Set up Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select an existing one
   - Enable the Google OAuth2 API
   - Create OAuth 2.0 credentials (OAuth client ID)
   - Set authorized redirect URIs:
     - For production: https://your-domain.vercel.app/api/auth/callback/google

3. Deploy to Vercel:
   - Connect your GitHub repository to Vercel
   - Add the following environment variables in Vercel:
     ```
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     AUTH_SECRET=your_generated_secret
     ```
   - Deploy the application

## Environment Variables

Create a `.env` file with the following variables:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
AUTH_SECRET=your_generated_secret  # Generate using: openssl rand -base64 32
```

## Tech Stack

- Next.js 14
- NextAuth.js (Auth.js)
- TypeScript
- Tailwind CSS

## License

MIT