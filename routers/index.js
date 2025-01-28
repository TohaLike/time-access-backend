import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import { dateTimeController } from "../controllers/date-controlller.js";
import AuthMiddleware from "../middlewares/auth-middleware.js";

const router = new Router()

router.post("/registration", userController.registration)
router.post("/login", userController.login)
router.post("/set_time", AuthMiddleware, dateTimeController.setDateTime)
router.post("/check_aviable_time", dateTimeController.checkAvailableTime)

router.get("/refresh", userController.refresh)
router.get("/date_times", AuthMiddleware, dateTimeController.getDateTimes)

export const authRouters = router