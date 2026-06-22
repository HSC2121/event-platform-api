import { EventsRepository } from "../repositories/events.repository.js";

const eventsRepository = new EventsRepository();

export class EventsService {
  async getEvents() {
    return await eventsRepository.getEvents();
  }
}