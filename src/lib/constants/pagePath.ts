const PagePath = {
  HOME: '/',
  VERIFY_EMAIL: '/verify-email',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: (username: string) => `/u/${username}`,
  KEYS: (username: string) => `/u/${username}/keys`,
  CHAT: (username: string) => `/u/${username}/chat`,
  COMMUNITY: (username: string) => `/u/${username}/community`,
} as const

export { PagePath }
