import { useResourceContext } from "../../resource/components/ResourceProvider"

import { ResourceViewer } from "../components/ResourceViewer"

export const ResourceViewerTemplate = () => {
  const { currentResource, updateCurrentResource } = useResourceContext()

  const handleCloseClick = () => {
    updateCurrentResource(null)
  }

  return (
    <>
      {currentResource && (
        <ResourceViewer
          resource={currentResource}
          onCloseClick={handleCloseClick}
        />
      )}
    </>
  )
}
