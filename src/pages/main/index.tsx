import { HStack, VStack } from "../../features/common/components/Stack"
import { ResourceProvider } from "../../features/resource/components/ResourceProvider"
import { ResourceListTemplate } from "../../features/resource-list/templates/ResourceListTemplate"
import { ResourceViewerTemplate } from "../../features/resource-viewer/templates/ResourceViewerTemplate"

export const MainPage = () => {
  return (
    <ResourceProvider>
      <HStack css={{ background: "$gray90" }}>
        <VStack css={{ width: "280px", flexShrink: 0 }}>
          <ResourceListTemplate />
        </VStack>
        <VStack css={{ width: "100%", flexShrink: 1 }}>
          <ResourceViewerTemplate />
        </VStack>
      </HStack>
    </ResourceProvider>
  )
}
