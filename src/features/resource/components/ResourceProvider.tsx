import { createContext, useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { resourceDummyList } from "../../resource-list/dummyData"
import { getListFromLocalStorage } from "../../resource-list/utils/localStorage"
import { ResourceSchema } from "../type"
import type { ReactNode, Dispatch, SetStateAction } from "react"

const getInitialResourceList = (): ResourceSchema[] => {
  return getListFromLocalStorage() || resourceDummyList
}

interface IResourceContext {
  currentResource: ResourceSchema | null
  updateCurrentResource: Dispatch<SetStateAction<ResourceSchema | null>>
  resourceList: ResourceSchema[]
  updateResourceList: Dispatch<SetStateAction<ResourceSchema[]>>
}

export const ResourceContext = createContext<IResourceContext>({
  currentResource: null,
  updateCurrentResource: () => null,
  resourceList: getInitialResourceList(),
  updateResourceList: () => null,
})

export const useResourceContext = () => useContext(ResourceContext)

export const ResourceProvider = ({ children }: { children: ReactNode }) => {
  const { currentResourceId } = useParams()
  const [resourceList, setResourceList] = useState<ResourceSchema[]>(
    getInitialResourceList
  )
  const [currentResource, setCurrentResource] = useState<ResourceSchema | null>(
    resourceList.filter((resource) => resource.id === currentResourceId)[0]
  )

  const contextValue = {
    currentResource,
    updateCurrentResource: setCurrentResource,
    resourceList,
    updateResourceList: setResourceList,
  }

  return (
    <ResourceContext.Provider value={contextValue}>
      {children}
    </ResourceContext.Provider>
  )
}
