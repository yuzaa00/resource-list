import { ResourceSchema } from "../../resource/type"
import { ResourceViewer } from "../components/ResourceViewer"

interface ResourceViewerTemplateProps {
  currentResource: ResourceSchema
  onCloseClick: () => void
}

export const ResourceViewerTemplate = ({
  currentResource,
  onCloseClick,
}: ResourceViewerTemplateProps) => {
  return (
    <>
      {currentResource && (
        <ResourceViewer
          resource={currentResource}
          onCloseClick={onCloseClick}
        />
      )}
    </>
  )
}
