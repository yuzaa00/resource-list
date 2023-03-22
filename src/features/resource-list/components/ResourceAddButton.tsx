import { ReactNode } from "react"
import { Button } from "../../common/components/Button"
import { Loading } from "../../common/components/Loading"

interface ResourceAddButtonProps {
  name?: "URL" | "이미지"
  loading?: boolean
  onClick?: () => void
  children?: ReactNode
}

export const ResourceAddButton = ({
  name,
  loading,
  onClick,
  children,
}: ResourceAddButtonProps) => {
  return (
    <Button onClick={onClick}>
      {loading ? <Loading /> : name ? `${name} 추가` : children}
    </Button>
  )
}
