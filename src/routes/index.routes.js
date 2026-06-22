import { Router } from "express";
import healthRoutes from "./health.routes.js";
import eventsRoutes from "./events.routes.js";
import sessionsRoutes from "./sessions.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/events", eventsRoutes);
router.use("/sessions", sessionsRoutes);

export default router;