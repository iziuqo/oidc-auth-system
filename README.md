# OIDC Authentication System

A modern OpenID Connect (OIDC) authentication system built with Next.js 14, featuring secure authentication and a sleek glassmorphic UI design.

## Features

- 🔐 OpenID Connect (OIDC) implementation
- 🌐 Google OAuth 2.0 provider integration
- 🎨 Modern glassmorphic UI design
- 🔄 Server-side rendering with Next.js 14
- 📱 Fully responsive design
- 🚀 Fast and optimized performance
- 🛡️ Type-safe with TypeScript

## Tech Stack

- **Framework**: Next.js 14
- **Authentication**: NextAuth.js (Auth.js)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- A Google Cloud Console account
- A Vercel account (for deployment)

### Environment Variables

Create a `.env` file with the following variables:

```env
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_generated_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### OIDC Provider Setup (Google)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google OAuth2 API
4. Configure the OAuth consent screen
5. Create OAuth 2.0 credentials (OAuth client ID)
6. Add authorized redirect URIs:
   - Development: http://localhost:3000/api/auth/callback/google
   - Production: https://your-domain.vercel.app/api/auth/callback/google

### Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

### File Structure

```
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── auth/
│   │   └── signout/
│   │       └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── auth.ts
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── bg-abstract.jpg
└── ... (config files)
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Security Features

- OIDC protocol implementation
- JWT-based session management
- Secure environment variable handling
- Protected API routes
- Type-safe authentication
- CSRF protection
- Secure cookie handling

## UI Features

- Glassmorphic design
- Responsive layouts
- Loading states
- Error handling
- Smooth transitions
- Modern components

## Understanding OIDC Flow

This system implements the Authorization Code Flow with PKCE:

1. User initiates login
2. System redirects to Google's OIDC provider
3. User authenticates with Google
4. Google returns an authorization code
5. System exchanges code for tokens
6. System verifies tokens and creates session
7. User is authenticated and can access protected routes

## License

MIT

## Support

For support, please raise an issue in the GitHub repository.
