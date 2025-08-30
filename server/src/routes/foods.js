import { Router } from 'express'
import Food from '../models/Food.js'

const router = Router()

// search foods
router.get('/', async (req, res) => {
  const q = (req.query.q || '').trim()
  if (!q) {
    const recent = await Food.find().sort({ createdAt: -1 }).limit(20)
    return res.json(recent)
  }
  const docs = await Food.find({ name: { $regex: q, $options: 'i' } }).limit(50)
  res.json(docs)
})

// create food
router.post('/', async (req, res) => {
  try {
    const doc = await Food.create(req.body)
    res.status(201).json(doc)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

export default router

