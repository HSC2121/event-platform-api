import { SessionsService } from "../services/sessions.service.js";
import { config } from "../config/env.config.js";

const sessionsService = new SessionsService();

export const register = async (req, res, next) => {
  try {
    const user = await sessionsService.register(req.body);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { token, user } = await sessionsService.login(req.body);

    res
      .cookie("currentUser", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 3600000,
        secure: config.nodeEnv === "production",
      })
      .status(200)
      .json({
        status: "success",
        message: "Login successful",
        payload: user,
      });
  } catch (error) {
    next(error);
  }
};

export const current = (req, res) => {
  const user = sessionsService.getCurrentUser(req.user);

  res.status(200).json({
    status: "success",
    payload: user,
  });
};

export const logout = (req, res) => {
  res.clearCookie("currentUser");

  res.status(200).json({
    status: "success",
    message: "Logout successful",
  });
};

export const getSessionsStatus = (req, res) => {
  const status = sessionsService.getStatus();

  res.status(200).json({
    status: "success",
    payload: status,
  });
};
