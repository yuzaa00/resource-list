import { useState } from "react"
import { styled } from "../../../stitches.config"
import { ResourceListTemplate } from "../../resource-list/templates/ResourceListTemplate"
import { ResourceSchema } from "../type"
import { ResourceViewerTemplate } from "../../resource-viewer/templates/ResourceViewerTemplate"

export const ResourceTemplate = () => {
  const [currentResource, setCurrentResource] = useState<ResourceSchema | null>(
    null
  )

  const handleResourceClick = (resource: ResourceSchema) => {
    setCurrentResource(resource)
  }

  const handleCloseClick = () => {
    setCurrentResource(null)
  }

  return (
    <ResourceTemplateWrapper>
      <ResourceListTemplate
        currentResourceId={currentResource?.id}
        onResourceClick={handleResourceClick}
      />
      {currentResource && (
        <ResourceViewerTemplate
          currentResource={currentResource}
          onCloseClick={handleCloseClick}
        />
      )}
    </ResourceTemplateWrapper>
  )
}

const ResourceTemplateWrapper = styled("div", {
  display: "flex",
  background: "$gray90",
})
