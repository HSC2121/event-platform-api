import { EventModel } from "../models/event.model.js";

export class EventsDao {
  async getAll() {
    return await EventModel.find();
  }
}