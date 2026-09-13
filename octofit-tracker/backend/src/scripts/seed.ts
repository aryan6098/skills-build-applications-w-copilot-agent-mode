import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      { username: 'maya', email: 'maya@example.com', displayName: 'Maya Chen' },
      { username: 'jordan', email: 'jordan@example.com', displayName: 'Jordan Brooks' },
      { username: 'riley', email: 'riley@example.com', displayName: 'Riley Morgan' },
    ]);

    await Team.insertMany([
      {
        name: 'Summit Striders',
        description: 'A steady team focused on endurance and consistency.',
        memberUsernames: ['maya', 'jordan'],
        totalPoints: 1840,
      },
      {
        name: 'Power Circuit',
        description: 'Strength-minded teammates chasing progressive overload.',
        memberUsernames: ['riley'],
        totalPoints: 1325,
      },
    ]);

    await Activity.insertMany([
      { username: 'maya', type: 'Run', durationMinutes: 42, calories: 410, completedAt: new Date('2026-09-11') },
      { username: 'jordan', type: 'Cycle', durationMinutes: 55, calories: 520, completedAt: new Date('2026-09-12') },
      { username: 'riley', type: 'Strength', durationMinutes: 35, calories: 280, completedAt: new Date('2026-09-12') },
    ]);

    await LeaderboardEntry.insertMany([
      { username: 'maya', teamName: 'Summit Striders', points: 980, rank: 1 },
      { username: 'jordan', teamName: 'Summit Striders', points: 860, rank: 2 },
      { username: 'riley', teamName: 'Power Circuit', points: 745, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Momentum',
        category: 'Cardio',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Marching high knees', 'Bodyweight squats', 'Fast feet'],
      },
      {
        title: 'Core and Control',
        category: 'Strength',
        difficulty: 'intermediate',
        durationMinutes: 30,
        exercises: ['Plank', 'Dead bug', 'Bird dog', 'Side plank'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
