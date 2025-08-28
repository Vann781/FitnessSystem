import mongoose from 'mongoose'

const logEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  items: [{
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    foodName: String,
    grams: Number,
    calories: Number
  }],
  totalCalories: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('LogEntry', logEntrySchema)

