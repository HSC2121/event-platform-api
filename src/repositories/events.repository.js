import { EventsDao } from "../dao/events.dao.js";

const eventsDao = new EventsDao();

export class EventsRepository {
  async getEvents() {
    return await eventsDao.getAll();
  }
}