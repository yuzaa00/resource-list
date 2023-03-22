import { useState } from "react"
import { styled } from "../../../stitches.config"
import { ResourceListTemplate } from "../../resource-list/templates/ResourceListTemplate"
import { ResourceSchema } from "../../resource-list/type"
import { ResourceViewer } from "../../resource-viewer/components/ResourceViewer"

export const ResourceTemplate = () => {
  const [currentResource, setCurrentResource] = useState<ResourceSchema>()

  const handleResourceClick = (resource: ResourceSchema) => {
    setCurrentResource(resource)
  }

  return (
    <ResourceTemplateWrapper>
      <ResourceListTemplate
        currentResourceId={currentResource?.id}
        onResourceClick={handleResourceClick}
      />
      <ResourceViewer />
    </ResourceTemplateWrapper>
  )
}

const ResourceTemplateWrapper = styled("div", {
  display: "flex",
  background: "$gray90",
})
