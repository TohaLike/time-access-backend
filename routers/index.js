import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import { dateTimeController } from "../controllers/date-controlller.js";
import AuthMiddleware from "../middlewares/auth-middleware.js";

const router = new Router()

router.post("/registration", userController.registration)
router.post("/login", userController.login)
router.post("/set_time", dateTimeController.setDateTime)

router.get("/refresh", userController.refresh)
router.get("/date_times", dateTimeController.getDateTimes)

export const authRouters = router