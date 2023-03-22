import {
  ChangeEvent,
  KeyboardEvent,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { toast } from "react-toastify"
import { styled } from "../../../stitches.config"
import { Input } from "../../common/components/Input"
import { VStack } from "../../common/components/Stack"
import { ResourceAddButton } from "../components/ResourceAddButton"
import { ResourceSchema } from "../type"
import { controlValidation } from "../utils/controlValidation"
import { convertUrl } from "../utils/convertUrl"
import { validateUrl } from "../utils/validateUrl"

interface ResourceUrlTemplateProps {
  setResourceList: (newList: ResourceSchema) => void
}

export const ResourceUrlTemplate = ({
  setResourceList,
}: ResourceUrlTemplateProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isInputOpen, setInputOpen] = useState(false)
  const [resourceUrl, setResourceUrl] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setLoading] = useState(false)

  const handleButtonClick = () => {
    setInputOpen(!isInputOpen)
    setErrorMessage("")
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResourceUrl(e.target.value)
  }

  const handleInputKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      setLoading(true)
      await validateUrl(resourceUrl)
        .then(controlValidation)
        .then(() => {
          const convertedUrl = convertUrl(resourceUrl)
          const uuid = self.crypto.randomUUID()

          setResourceList({ id: uuid, name: convertedUrl, url: convertedUrl })
          setInputOpen(!isInputOpen)
          setResourceUrl("")
          setErrorMessage("")
          toast("등록에 성공했어요", { type: "success" })
        })
        .catch((error) => {
          if (error.type === "failed") {
            toast(error.message, { type: "error" })
          } else {
            setErrorMessage(error.message)
          }
        })
        .finally(() => setLoading(false))
    }
  }

  useLayoutEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus()
  })

  return (
    <UrlTemplateWrapper>
      <ResourceAddButton
        name="URL"
        loading={isLoading}
        onClick={handleButtonClick}
      ></ResourceAddButton>
      {isInputOpen && (
        <UrlInputWrapper>
          <VStack css={{ gap: "5px" }}>
            <Input
              ref={inputRef}
              value={resourceUrl}
              isError={!!errorMessage}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </VStack>
        </UrlInputWrapper>
      )}
    </UrlTemplateWrapper>
  )
}

const UrlTemplateWrapper = styled("div", {
  position: "relative",
})

const UrlInputWrapper = styled("div", {
  position: "absolute",
  width: "260px",
  padding: "5px",
  border: "1px solid $colors$gray90",
  borderRadius: "5px",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  background: "$gray100",
  margin: "2px 0 0 ",
})

const ErrorMessage = styled("div", {
  color: "$red",
  fontSize: "12px",
})
