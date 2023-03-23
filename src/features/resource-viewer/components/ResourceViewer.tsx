import { TypedIcon } from "typed-design-system"
import { styled } from "../../../stitches.config"
import { VStack } from "../../common/components/Stack"
import { ResourceSchema } from "../../resource/type"

interface ResourceViewerProps {
  resource: ResourceSchema
  onCloseClick: () => void
}

export const ResourceViewer = ({
  resource,
  onCloseClick,
}: ResourceViewerProps) => {
  return (
    <ResourceViewerWrapper>
      <ResourceHeader>
        <VStack>{resource.name}</VStack>
        <VStack onClick={onCloseClick}>
          <TypedIcon icon="close_19" size={19} />
        </VStack>
      </ResourceHeader>
      <ResourceContent>
        {resource.file ? (
          <StyledImage alt="viewer" src={resource.url} />
        ) : (
          <StyledIframe title="url-viewer" src={resource.url} />
        )}
      </ResourceContent>
    </ResourceViewerWrapper>
  )
}

const ResourceViewerWrapper = styled("div", {
  background: "$gray100",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
})

const ResourceHeader = styled("div", {
  font: "inherit",
  height: "50px",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 17px",
})

const ResourceContent = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

const StyledImage = styled("img", {
  width: "100%",
})

const StyledIframe = styled("iframe", {
  width: "100%",
  height: "100vh",
})
