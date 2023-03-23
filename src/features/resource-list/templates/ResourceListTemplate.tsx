import { Fragment, useState } from "react"
import { ResourceImageTemplate } from "./ResourceImageTemplate"
import { ResourceUrlTemplate } from "./ResourceUrlTemplate"
import { styled } from "../../../stitches.config"
import { HStack, VStack } from "../../common/components/Stack"
import { ResourceSchema } from "../../resource/type"
import { ResourceItem } from "../components/ResourceItem"
import { resourceDummyList } from "../dummyData"

interface ResourceListTemplateProps {
  currentResourceId?: string
  onResourceClick: (resource: ResourceSchema) => void
}

export const ResourceListTemplate = ({
  currentResourceId,
  onResourceClick,
}: ResourceListTemplateProps) => {
  const [resourceList, setResourceList] = useState(resourceDummyList)

  const handleAddResourceList = (newList: ResourceSchema) => {
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
        <VStack css={{ flexBasis: 1, flexGrow: 1 }}>
          <ResourceUrlTemplate onAddResourceList={handleAddResourceList} />
        </VStack>
        <VStack css={{ flexBasis: 1, flexGrow: 1 }}>
          <ResourceImageTemplate onAddResourceList={handleAddResourceList} />
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
  height: "100vh",
  borderRight: "1px solid $colors$gray80",
  overflow: "scroll",
})

const StyledResourceButtonsWrapper = styled(HStack, {
  background: "$gray100",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  padding: "10px",
  gap: "10px",
})
