import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    memberUsernames: { type: [String], default: [] },
    totalPoints: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
)

export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema)
