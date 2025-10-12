// Simple stub exports - no Firebase initialization
// App will work in localStorage-only mode

console.warn('🔧 Running in localStorage-only mode (Firebase disabled)')
console.warn('To enable Firebase: Add credentials to Vercel environment variables')

// Export null values - app will use localStorage fallback
export const auth = null
export const db = null
export const storage = null
export default null
