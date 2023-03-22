import { errorMessages } from "../../common/constant"
import { getRandomNumWithRange } from "../../common/utils/getRandomNum"

export const controlValidation = () => {
  const SUCCESS_PERCENTAGE = 80

  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (getRandomNumWithRange(1, 100) <= SUCCESS_PERCENTAGE) {
        resolve()
      } else {
        reject({ type: "failed", message: errorMessages.FAILED_REQUEST })
      }
    }, getRandomNumWithRange(300, 1000))
  })
}
