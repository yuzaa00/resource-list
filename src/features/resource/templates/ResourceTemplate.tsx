import { useState } from "react"
import { HStack, VStack } from "../../common/components/Stack"
import { ResourceListTemplate } from "../../resource-list/templates/ResourceListTemplate"
import { ResourceViewerTemplate } from "../../resource-viewer/templates/ResourceViewerTemplate"
import { ResourceSchema } from "../type"

export const ResourceTemplate = () => {
  const [currentResource, setCurrentResource] = useState<ResourceSchema | null>(
    null
  )

  const handleSetCurrentResource = (resource: ResourceSchema | null) => {
    setCurrentResource(resource)
  }

  const handleCloseClick = () => {
    setCurrentResource(null)
  }

  return (
    <HStack css={{ background: "$gray90" }}>
      <VStack css={{ width: "280px", flexShrink: 0 }}>
        <ResourceListTemplate
          currentResourceId={currentResource?.id}
          onSetCurrentResource={handleSetCurrentResource}
        />
      </VStack>
      <VStack css={{ width: "100%", flexShrink: 1 }}>
        {currentResource && (
          <ResourceViewerTemplate
            currentResource={currentResource}
            onCloseClick={handleCloseClick}
          />
        )}
      </VStack>
    </HStack>
  )
}
