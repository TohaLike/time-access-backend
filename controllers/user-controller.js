import { userService } from "../services/user-service.js";

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;

      const responseData = await userService.registration(email, password)
      res.cookie("refreshToken", responseData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, })
      return res.json(responseData)
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const responseData = await userService.login(email, password)
      res.cookie("refreshToken", responseData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, })

      return res.json(responseData)
    } catch (e) {
      next(e)
    }
  }


  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies

      const responseData = await userService.refresh(refreshToken)
      res.cookie("refreshToken", responseData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, })

      return res.josn(responseData)
    } catch (e) {
      next(e)
    }
  }
}

export const userController = new UserController()