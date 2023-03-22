import { errorMessages } from "../../common/constant"

export const validateUrl = (url: string) => {
  return new Promise<void>((resolve, reject) => {
    // “https://” 또는 “http://” 이 포함되는지 확인
    if (!url.startsWith("http")) {
      reject({ type: "invalid", message: errorMessages.INVALID_URL })
    }
    resolve()
  })
}
