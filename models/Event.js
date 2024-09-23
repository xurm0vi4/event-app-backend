import mongoose from 'mongoose';
import { participantSchema } from './Participant.js';

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  organizer: String,
  participants: [participantSchema],
});

export default mongoose.model('Event', eventSchema);
