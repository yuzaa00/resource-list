import { Fragment, useState } from "react"
import { ResourceImageTemplate } from "./ResourceImageTemplate"
import { ResourceUrlTemplate } from "./ResourceUrlTemplate"
import { styled } from "../../../stitches.config"
import { VStack } from "../../common/components/Stack"
import { ResourceItem } from "../components/ResourceItem"
import { resourceDummyList } from "../dummyData"
import { ResourceSchema } from "../type"

interface ResourceListTemplateProps {
  currentResourceId?: string
  onResourceClick: (resource: ResourceSchema) => void
}

export const ResourceListTemplate = ({
  currentResourceId,
  onResourceClick,
}: ResourceListTemplateProps) => {
  const [resourceList, setResourceList] = useState(resourceDummyList)

  const handleResourceList = (newList: ResourceSchema) => {
    setResourceList((prevList) => [newList, ...prevList])
  }

  const handleClick = (resource: ResourceSchema) => () => {
    onResourceClick(resource)
  }

  const handleEditClick = (id: string) => (name: string) => {
    setResourceList((prevList) =>
      prevList.map((list) => (list.id === id ? { ...list, name } : list))
    )
  }

  const handleRemoveClick = (id: string) => {
    setResourceList((prevList) => prevList.filter((list) => list.id !== id))
  }

  return (
    <StyledResourceListWrapper>
      <StyledResourceButtonsWrapper>
        <VStack css={{ flexGrow: 1, flexBasis: 1 }}>
          <ResourceUrlTemplate setResourceList={handleResourceList} />
        </VStack>
        <VStack css={{ flexGrow: 1, flexBasis: 1 }}>
          <ResourceImageTemplate setResourceList={handleResourceList} />
        </VStack>
      </StyledResourceButtonsWrapper>
      <VStack css={{ padding: "10px", gap: "10px" }}>
        {resourceList.map((rsc) => (
          <Fragment key={rsc.id}>
            <ResourceItem
              defaultName={rsc.name}
              isActive={rsc.id === currentResourceId}
              onClick={handleClick(rsc)}
              onEditClick={handleEditClick(rsc.id)}
              onRemoveClick={() => handleRemoveClick(rsc.id)}
            />
          </Fragment>
        ))}
      </VStack>
    </StyledResourceListWrapper>
  )
}

const StyledResourceListWrapper = styled("div", {
  background: "$gray97",
  maxWidth: "280px",
  width: "100%",
  height: "100vh",
  borderRight: "1px solid $colors$gray80",
  overflow: "scroll",
})

const StyledResourceButtonsWrapper = styled("div", {
  display: "flex",
  background: "$gray100",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  padding: "10px",
  gap: "10px",
})
