import mongoose from 'mongoose';

export const participantSchema = new mongoose.Schema({
  eventId: mongoose.Schema.Types.ObjectId,
  fullName: String,
  email: String,
  dateOfBirth: Date,
  source: String,
});

export default mongoose.model('Participant', participantSchema);
