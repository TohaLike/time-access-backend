import { format, parse, isValid } from "date-fns";
import ApiError from "../exceptions/api-error.js"
import { dateTimeModel } from "../models/date-model.js"

class DateTimeService {
  async setNewDate(day, startTime, endTime) {
    const weekDay = await dateTimeModel.findOne({ day })

    if (!weekDay) throw ApiError.BadRequest(`День недели '${day}' не найден.`)

    const editedStartTime = parse(startTime, "HH:mm", new Date())
    const editedEndTime = parse(endTime, "HH:mm", new Date())

    if (editedStartTime >= editedEndTime) {
      throw ApiError.BadRequest("Значение времени в первом поле не должно превышать значение во втором поле. Убедитесь, что данные указаны корректно.")
    }

    const setNewTimeWeekDay = await dateTimeModel.findOneAndUpdate(
      { day },
      {
        startTime: editedStartTime,
        endTime: editedEndTime
      },
      { new: true }
    )

    return setNewTimeWeekDay
  }

  async getDateTimes() {
    const getDays = await dateTimeModel.find()
    return getDays
  }


  async checkAvailableTime(day, dateTime) {
    const weekDay = await dateTimeModel.findOne({ day })

    if (!weekDay) throw ApiError.BadRequest(`День недели '${day}' не найден.`)

    const formattedDateTime = parse(dateTime, "HH:mm", new Date());

    if (!isValid(formattedDateTime)) throw ApiError.BadRequest("Неверный формат времени.")

    const startTime = parse(format(weekDay.startTime, "HH:mm"), "HH:mm", new Date());
    const endTime = parse(format(weekDay.endTime, "HH:mm"), "HH:mm", new Date());

    if (formattedDateTime < startTime || formattedDateTime > endTime) throw ApiError.BadRequest("Нет доступа")

    return weekDay
  }
}

export const dateTimeService = new DateTimeService()