import { errorMessages } from "../../common/constant"
import { AddResourceError } from "../../common/customError"

export const validateUrl = async (url: string) => {
  // “https://” 또는 “http://” 이 포함되는지 확인
  if (!url.startsWith("http")) {
    throw new AddResourceError(errorMessages.INVALID_URL, "invalid")
  }
}
