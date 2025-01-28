import { dateTimeService } from "../services/date-service.js"

class DateTimeController {

  async setDateTime(req, res, next) {
    try {
      const { day, startTime, endTime } = req.body

      console.log(startTime, endTime)
      const dateData = await dateTimeService.setNewDate(day, startTime, endTime)

      return res.json(dateData)
    } catch (e) {
      next(e)
    }
  }

  async getDateTimes(req, res, next) {
    try {
      const { day } = req.body

      const dayData = await dateTimeService.getDateTimes(day)

      return res.json(dayData)
    } catch (e) {
      next(e)
    }
  }

  async checkAvailableTime(req, res, next) {
    try {
      const { day, dateTime } = req.body

      const aviableTime = await dateTimeService.checkAvailableTime(day, dateTime)

      return res.json(aviableTime)
    } catch (e) {
      next(e)
    }
  }

}

export const dateTimeController = new DateTimeController()