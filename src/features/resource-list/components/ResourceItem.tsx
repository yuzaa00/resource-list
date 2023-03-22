import { ChangeEvent, KeyboardEvent, useState } from "react"
import { TypedIcon } from "typed-design-system"
import { styled } from "../../../stitches.config"
import { Input } from "../../common/components/Input"

interface ResourceItemProps {
  defaultName: string
  isActive?: boolean
  onClick: () => void
  onEditClick: (name: string) => void
  onRemoveClick: () => void
}

export const ResourceItem = ({
  defaultName,
  isActive,
  onClick,
  onEditClick,
  onRemoveClick,
}: ResourceItemProps) => {
  const [name, setName] = useState(defaultName)
  const [isEditMode, setEditMode] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      setEditMode(false)
    }
  }

  const handleClick = () => {
    onClick()
  }

  const handleEditClick = () => {
    setEditMode(!isEditMode)
    onEditClick(name)
  }

  const handleRemoveClick = () => {
    onRemoveClick()
  }

  return (
    <ItemWrapper isActive={isActive} onClick={handleClick}>
      {isEditMode ? (
        <Input value={name} onChange={handleChange} onKeyDown={handleKeyDown} />
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
  background: "$gray100",
  height: "90px",
  borderRadius: "10px",
  padding: "12px",
  cursor: "pointer",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  "&:hover": {
    border: "1px solid $colors$blue50",
  },

  variants: {
    isActive: {
      true: {
        border: "1px solid $colors$blue50",
      },
    },
  },
})

const ItemName = styled("div", {
  lineHeight: "16px",
  widht: "100%",
  wordBreak: "break-word",
  textOverflow: "ellipsis",
  overflow: "hidden",
  display: "-webkit-box !important",
  "-webkit-line-clamp": 2,
  "-webkit-box-orient": "vertical",
  whiteSpace: "normal",
})

const IconWrapper = styled("div", {
  display: "flex",
  justifyContent: "end",
  gap: "8px",
})

const StyledIcon = styled("div", {
  cursor: "pointer",
})
