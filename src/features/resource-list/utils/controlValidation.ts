import { errorMessages } from "../../common/constant"
import { AddResourceError } from "../../common/customError"
import { getRandomNumWithRange } from "../../common/utils/getRandomNum"

export const controlValidation = async () => {
  const SUCCESS_PERCENTAGE = 80

  setTimeout(() => {
    if (getRandomNumWithRange(1, 100) > SUCCESS_PERCENTAGE) {
      throw new AddResourceError(errorMessages.FAILED_REQUEST, "failed")
    }
  }, getRandomNumWithRange(300, 1000))
}
