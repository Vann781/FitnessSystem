import { Router } from 'express'
import LogEntry from '../models/LogEntry.js'
import Food from '../models/Food.js'

const router = Router()

// get today's log for a user (mock user for now)
router.get('/today', async (req, res) => {
  const userId = req.query.userId
  const date = new Date().toISOString().slice(0,10)
  const doc = await LogEntry.findOne({ userId, date })
  res.json(doc || { userId, date, items: [], totalCalories: 0 })
})

// add item: either by foodId+grams or custom foodName+calories
router.post('/add', async (req, res) => {
  const { userId, foodId, grams, foodName, calories } = req.body
  const date = new Date().toISOString().slice(0,10)
  let item
  if (foodId && grams) {
    const food = await Food.findById(foodId)
    if (!food) return res.status(404).json({ error: 'Food not found' })
    const kcal = Math.round((food.caloriesPer100g * grams) / 100)
    item = { foodId, foodName: food.name, grams, calories: kcal }
  } else if (foodName && calories) {
    item = { foodName, grams: 0, calories }
  } else {
    return res.status(400).json({ error: 'Invalid payload' })
  }

  let log = await LogEntry.findOne({ userId, date })
  if (!log) log = await LogEntry.create({ userId, date, items: [], totalCalories: 0 })
  log.items.push(item)
  log.totalCalories = log.items.reduce((s,i)=>s + (i.calories || 0), 0)
  await log.save()
  res.json(log)
})

export default router

