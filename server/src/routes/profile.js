import { Router } from 'express'
import User from '../models/User.js'

const router = Router()

// upsert profile minimal
router.post('/upsert', async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'email required' })
  const user = await User.findOneAndUpdate({ email }, req.body, { new: true, upsert: true })
  res.json(user)
})

// compute BMI and recommend calories (Mifflin-St Jeor simplified)
router.get('/recommendations', async (req, res) => {
  const { email } = req.query
  const user = await User.findOne({ email })
  if (!user) return res.status(404).json({ error: 'user not found' })
  const heightM = (user.heightCm || 0) / 100
  const bmi = heightM > 0 ? (user.weightKg || 0) / (heightM * heightM) : 0
  let bmr
  if (user.gender === 'male') {
    bmr = 10 * (user.weightKg||0) + 6.25 * (user.heightCm||0) - 5 * (user.age||0) + 5
  } else {
    bmr = 10 * (user.weightKg||0) + 6.25 * (user.heightCm||0) - 5 * (user.age||0) - 161
  }
  const activityMultiplier = {
    sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9
  }[user.activityLevel || 'moderate']
  let tdee = bmr * activityMultiplier
  if (user.goal === 'loss') tdee -= 400
  if (user.goal === 'gain') tdee += 400
  tdee = Math.max(1200, Math.round(tdee))
  res.json({ bmi: Number(bmi.toFixed(1)), recommendedCalories: tdee, goal: user.goal })
})

export default router

