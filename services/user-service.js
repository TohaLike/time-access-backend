import bycrypt from "bcrypt"
import { userModel } from "../models/user-model.js"
import { tokenService } from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";


class UserService {
  async registration(email, password) {
    const candidate = await userModel.findOne({ email })

    if (candidate) throw ApiError.BadRequest(`Пользователь c таким EMAIL: ${email} уже существует`);

    const hashPassword = await bycrypt.hash(password, 3);

    const userData = await userModel.create({ email, password: hashPassword })

    const userDto = new UserDto(userData);

    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async login(email, password) {
    const candidate = await userModel.findOne({ email })

    if (!candidate) throw ApiError.BadRequest(`Такой пользователь ${email} не авторизован`)

    const isPassEquals = await bycrypt.compare(password, candidate.password);

    if (!isPassEquals) throw ApiError.BadRequest("Неправильный пароль")

    const userDto = new UserDto(candidate)

    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto }
  }


  async refresh(refreshToken) {
    if (!refreshToken) throw ApiError.UnauthorizedError();

    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError()

    const user = await userModel.findOne({ email: userData.email })
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }
}

export const userService = new UserService()