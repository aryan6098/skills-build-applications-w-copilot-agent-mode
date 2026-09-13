import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: { type: [String], default: [] },
  },
  { timestamps: true },
)

export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema)
