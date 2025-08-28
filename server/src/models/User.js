import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  age: Number,
  gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
  heightCm: Number,
  weightKg: Number,
  goal: { type: String, enum: ['maintain', 'loss', 'gain'], default: 'maintain' },
  activityLevel: { type: String, enum: ['sedentary','light','moderate','active','very_active'], default: 'moderate' }
}, { timestamps: true })

export default mongoose.model('User', userSchema)

