import mongoose from 'mongoose'

const exercisePlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  goal: { type: String, enum: ['maintain','loss','gain'], required: true },
  items: [{
    name: String,
    durationMin: Number,
    intensity: { type: String, enum: ['low','medium','high'], default: 'medium' },
    animationUrl: String // mp4 url
  }]
}, { timestamps: true })

export default mongoose.model('ExercisePlan', exercisePlanSchema)

