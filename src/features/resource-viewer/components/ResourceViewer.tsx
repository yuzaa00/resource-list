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
        <VStack css={{ maxWidth: "60%" }}>
          <StyledItemName>{resource.name}</StyledItemName>
        </VStack>
        <VStack onClick={onCloseClick}>
          <TypedIcon icon="close_19" size={19} />
        </VStack>
      </ResourceHeader>
      <VStack css={{ flexGrow: 1 }}>
        {resource.file ? (
          <StyledImage alt="viewer" src={resource.url} />
        ) : (
          <StyledIframe
            title="url-viewer"
            src={resource.url}
            width="100%"
            height="100%"
          />
        )}
      </VStack>
    </ResourceViewerWrapper>
  )
}

const ResourceViewerWrapper = styled("div", {
  background: "$gray100",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
})

const ResourceHeader = styled("div", {
  width: "100%",
  height: "50px",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 17px",
  lineHeight: "17px",
})

const StyledItemName = styled("div", {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: "530px",
  wordBreak: "break-all",
  lineHeight: "17px",
})

const StyledImage = styled("img", {
  width: "100%",
})

const StyledIframe = styled("iframe", {
  width: "100%",
})
