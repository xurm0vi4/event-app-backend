import Event from '../models/Event.js';

export const getOneEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const PAGE_SIZE = 12;
    const page = parseInt(req.query.page) || 0;
    const sortBy = req.query.sortBy || 'title';

    let sortOption = {};
    if (sortBy === 'title' || sortBy === 'organizer') {
      sortOption[sortBy] = 1;
    } else if (sortBy === 'date') {
      sortOption[sortBy] = 1;
    }

    const totalEvents = await Event.countDocuments({});
    const events = await Event.find()
      .sort(sortOption)
      .collation({ locale: 'en', strength: 2 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    res.json({ events, totalPages: Math.ceil(totalEvents / PAGE_SIZE) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const participant = {
      fullName: req.body.fullName,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      source: req.body.source,
    };

    event.participants.push(participant);
    await event.save();

    res.status(201).json(participant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getEventParticipants = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event.participants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createEvent = async (req, res) => {
  const { title, description, date, organizer, participants } = req.body;

  const event = new Event({
    title,
    description,
    date: new Date(date),
    organizer,
    participants: participants || [],
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
