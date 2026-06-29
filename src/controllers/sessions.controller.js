import { SessionsService } from "../services/sessions.service.js";

const sessionsService = new SessionsService();

export const register = async (req, res, next) => {
  try {
    const user = await sessionsService.register(req.body);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      payload: user
    });
  } catch (error) {
    next(error);
  }
};

export const getSessionsStatus = (req, res) => {
  const status = sessionsService.getStatus();

  res.status(200).json({
    status: "success",
    payload: status
  });
};
