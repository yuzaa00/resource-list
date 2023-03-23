import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react"
import { TypedIcon } from "typed-design-system"
import { styled } from "../../../stitches.config"
import { Input } from "../../common/components/Input"
import { useFocus } from "../../common/hooks/useFocus"

interface ResourceItemProps {
  defaultName: string
  isActive?: boolean
  onItemClick: () => void
  onEditClick: (name: string) => void
  onRemoveClick: () => void
}

export const ResourceItem = ({
  defaultName,
  isActive,
  onItemClick,
  onEditClick,
  onRemoveClick,
}: ResourceItemProps) => {
  const inputRef = useFocus()

  const [name, setName] = useState(defaultName)
  const [isEditMode, setEditMode] = useState(false)

  const handleItemClick = () => {
    onItemClick()
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      setEditMode(false)
      onEditClick(name)
    }
  }

  const handleEditClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setEditMode(!isEditMode)
    onEditClick(name)
  }

  const handleRemoveClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onRemoveClick()
  }

  return (
    <ItemWrapper isActive={isActive} onClick={handleItemClick}>
      {isEditMode ? (
        <Input
          ref={inputRef}
          value={name}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
        />
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
  width: "100%",
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
