const ENV = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1',
  GOOGLE_AUTH_URL: process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL || '',
  FACEBOOK_AUTH_URL: process.env.NEXT_PUBLIC_FACEBOOK_AUTH_URL || '',
}

export default ENV
