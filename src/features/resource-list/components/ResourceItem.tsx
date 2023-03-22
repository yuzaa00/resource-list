import { ChangeEvent, useState } from "react"
import { TypedIcon } from "typed-design-system"
import { styled } from "../../../stitches.config"
import { Input } from "../../common/components/Input"

interface ResourceItemProps {
  defaultName: string
  onEditClick: (name: string) => void
  onRemoveClick: () => void
}

export const ResourceItem = ({
  defaultName,
  onEditClick,
  onRemoveClick,
}: ResourceItemProps) => {
  const [name, setName] = useState(defaultName)
  const [isEditMode, setEditMode] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleEditClick = () => {
    setEditMode(!isEditMode)
    onEditClick(name)
  }

  const handleRemoveClick = () => {
    onRemoveClick()
  }

  return (
    <ItemWrapper>
      {isEditMode ? (
        <Input value={name} onChange={handleChange} />
      ) : (
        <ItemName>{name}</ItemName>
      )}
      <IconWrapper>
        <StyledIcon onClick={handleEditClick}>
          <TypedIcon icon="edit_19" style={{ fontSize: "19px" }} />
        </StyledIcon>
        <StyledIcon onClick={handleRemoveClick}>
          <TypedIcon icon="trash_19" style={{ fontSize: "19px" }} />
        </StyledIcon>
      </IconWrapper>
    </ItemWrapper>
  )
}

const ItemWrapper = styled("div", {
  background: "white",
  height: "90px",
  borderRadius: "10px",
  padding: "12px",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
})

const ItemName = styled("div", {
  lineHeight: "16px",
  widht: "100%",
})

const IconWrapper = styled("div", {
  display: "flex",
  justifyContent: "end",
  gap: "8px",
})

const StyledIcon = styled("div", {
  cursor: "pointer",
})
