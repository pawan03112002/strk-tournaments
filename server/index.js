import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Stripe from 'stripe'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Initialize Stripe (you'll need to add your Stripe secret key in .env)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_your_key_here')

// Middleware
app.use(cors())
app.use(express.json())

// Mock database (replace with actual database in production)
let users = []
let tournaments = [
  {
    id: 1,
    name: 'Weekend Warriors Championship',
    description: 'Compete in the ultimate weekend showdown for massive prizes!',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
    date: '2025-10-10T18:00:00',
    entryFee: 50,
    prizePool: 10000,
    participants: 45,
    maxParticipants: 100,
    status: 'upcoming',
    mode: 'Squad',
    map: 'Bermuda'
  }
]

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, ffId } = req.body
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Create new user (in production, hash the password)
    const newUser = {
      id: users.length + 1,
      username,
      email,
      ffId,
      createdAt: new Date()
    }
    users.push(newUser)

    // Generate token (in production, use JWT)
    const token = 'token_' + Date.now()

    res.json({
      user: newUser,
      token
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    // Find user (in production, verify password hash)
    const user = users.find(u => u.email === email)
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate token (in production, use JWT)
    const token = 'token_' + Date.now()

    res.json({
      user,
      token
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Tournament routes
app.get('/api/tournaments', (req, res) => {
  res.json(tournaments)
})

app.get('/api/tournaments/:id', (req, res) => {
  const tournament = tournaments.find(t => t.id === parseInt(req.params.id))
  if (!tournament) {
    return res.status(404).json({ error: 'Tournament not found' })
  }
  res.json(tournament)
})

// Payment routes
app.post('/api/payment/create-intent', async (req, res) => {
  try {
    const { amount, tournamentId } = req.body

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'inr',
      metadata: { tournamentId }
    })

    res.json({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/payment/confirm', async (req, res) => {
  try {
    const { paymentIntentId, tournamentId, userId } = req.body

    // Verify payment (in production, verify with Stripe)
    
    // Register user for tournament
    const tournament = tournaments.find(t => t.id === parseInt(tournamentId))
    if (tournament) {
      tournament.participants += 1
    }

    res.json({
      success: true,
      message: 'Payment confirmed and registered for tournament'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// User routes
app.get('/api/user/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id))
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  res.json(user)
})

app.put('/api/user/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' })
    }

    users[userIndex] = {
      ...users[userIndex],
      ...req.body,
      id: userId
    }

    res.json(users[userIndex])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📡 API available at http://localhost:${PORT}/api`)
})
