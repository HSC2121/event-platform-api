import { EventsService } from "../services/events.service.js";

const eventsService = new EventsService();

export const getEvents = async (req, res, next) => {
  try {
    const events = await eventsService.getEvents();

    res.status(200).json({
      status: "success",
      payload: events
    });
  } catch (error) {
    next(error);
  }
};