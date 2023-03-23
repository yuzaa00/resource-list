export const errorMessages = {
  FAILED_REQUEST: "등록에 실패했어요.",
  INVALID_URL: "https:// 또는 http://를 추가해주세요",
  NO_FILE_SELECTED: "선택된 파일이 없습니다",
  UNACCEPTABLE_FILE: (fileList: string) =>
    `${fileList} 파일만 업로드 할 수 있어요.`,
}

export const successMessage = {
  SUCCESS_REQUEST: "등록에 성공했어요!",
}
