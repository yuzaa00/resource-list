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
  onSetCurrentResource: (resource: ResourceSchema | null) => void
}

export const ResourceListTemplate = ({
  currentResourceId,
  onSetCurrentResource,
}: ResourceListTemplateProps) => {
  const [resourceList, setResourceList] = useState(resourceDummyList)

  const handleAddResourceList = (newList: ResourceSchema) => {
    setResourceList((prevList) => [newList, ...prevList])
  }

  const handleItemClick = (resource: ResourceSchema) => () => {
    onSetCurrentResource(resource)
  }

  const handleEditClick = (resource: ResourceSchema) => (name: string) => {
    setResourceList((prevList) =>
      prevList.map((list) =>
        list.id === resource.id ? { ...list, name } : list
      )
    )

    if (currentResourceId === resource.id) {
      onSetCurrentResource({ ...resource, name })
    }
  }

  const handleRemoveClick = (id: string) => {
    setResourceList((prevList) =>
      prevList.filter((list) => {
        return list.id !== id
      })
    )
    if (currentResourceId === id) {
      onSetCurrentResource(null)
    }
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
              onItemClick={handleItemClick(rsc)}
              onEditClick={handleEditClick(rsc)}
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
