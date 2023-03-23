import { ResourceSchema } from "../../resource/type"

export const setListToLocalStorage = (resourceList: ResourceSchema[]) => {
  localStorage.setItem("assignmentResourceList", JSON.stringify(resourceList))
}

export const getListFromLocalStorage = (): ResourceSchema[] | null => {
  const list = localStorage.getItem("assignmentResourceList")
  return list && JSON.parse(list)
}
