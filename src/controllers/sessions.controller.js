import { SessionsService } from "../services/sessions.service.js";
import { config } from "../config/env.config.js";

const sessionsService = new SessionsService();

export const register = async (req, res, next) => {
  try {
    const user = sessionsService.getRegisteredUser(req.user);

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
    const token = sessionsService.generateAuthToken(req.user);

    const user = sessionsService.getPublicUser(req.user);

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

export const current = async (req, res, next) => {
  try {
    const user = sessionsService.getPublicUser(req.user);

    res.status(200).json({
      status: "success",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("currentUser");

    res.status(200).json({
      status: "success",
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

export const getSessionsStatus = async (req, res, next) => {
  try {
    const status = sessionsService.getStatus();

    res.status(200).json({
      status: "success",
      payload: status,
    });
  } catch (error) {
    next(error);
  }
};
