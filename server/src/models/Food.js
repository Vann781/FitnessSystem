import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  brand: String,
  // calories per 100g baseline; servings can convert
  caloriesPer100g: { type: Number, required: true },
  macrosPer100g: {
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 }
  },
  commonServings: [{
    label: String,
    grams: Number
  }]
}, { timestamps: true })

export default mongoose.model('Food', foodSchema)

