export const convertUrl = (url: string) => {
  // youtube url인 경우 embed url로 변경
  if (url.includes("www.youtube.com")) {
    const params = new URL(url).searchParams
    url = `https://www.youtube.com/embed/${params.get("v")}`
  }
  return url
}
