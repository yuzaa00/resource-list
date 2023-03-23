import { ChangeEvent, useRef, useState } from "react"
import { toast } from "react-toastify"
import { styled } from "../../../stitches.config"
import { errorMessages, successMessage } from "../../common/constant"
import { AddResourceError } from "../../common/customError"
import { ResourceSchema } from "../../resource/type"
import { ResourceAddButton } from "../components/ResourceAddButton"
import { controlValidation } from "../utils/controlValidation"

interface ResourceIamgeTemplateProps {
  onAddResourceList: (resource: ResourceSchema) => void
}

export const ResourceImageTemplate = ({
  onAddResourceList,
}: ResourceIamgeTemplateProps) => {
  const fileRef = useRef<HTMLInputElement>(null)

  const [isLoading, setLoading] = useState(false)

  const acceptableMimeType = {
    JPEG: "image/jpeg",
    PNG: "image/png",
  }

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files: selectedFiles } = e.target

    const addFile = async () => {
      if (!selectedFiles) {
        throw new AddResourceError(errorMessages.NO_FILE_SELECTED, "invalid")
      }

      const isAcceptableFile = Array.from(selectedFiles).every((file) =>
        Object.values(acceptableMimeType).includes(file.type)
      )

      if (!isAcceptableFile) {
        throw new AddResourceError(
          errorMessages.UNACCEPTABLE_FILE(
            Object.keys(acceptableMimeType).join(",")
          ),
          "invalid"
        )
      }

      Array.from(selectedFiles).forEach((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          onAddResourceList({
            id: self.crypto.randomUUID(),
            name: file.name,
            url: reader.result as string,
            file,
          })
        }
        reader.onerror = () => {
          throw new AddResourceError(errorMessages.FAILED_REQUEST, "failed")
        }
        reader.readAsDataURL(file)
      })
    }

    try {
      setLoading(true)

      await controlValidation()
      await addFile()

      toast(successMessage.SUCCESS_REQUEST, { type: "success" })
    } catch (error) {
      if (error instanceof AddResourceError) {
        toast(error.message, { type: "error" })
      }
    } finally {
      setLoading(false)
      /** 인풋 초기화 */
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  return (
    <ImageTemplateWrapper>
      <ResourceAddButton loading={isLoading}>
        <FileUploader>
          이미지 추가
          <input
            ref={fileRef}
            type="file"
            onChange={handleFileUpload}
            accept=".png, .jpg, .jpeg"
            multiple
            disabled={isLoading}
          />
        </FileUploader>
      </ResourceAddButton>
    </ImageTemplateWrapper>
  )
}

const ImageTemplateWrapper = styled("div", {
  position: "relative",
})

const FileUploader = styled("label", {
  cursor: "pointer",
  font: "inherit",

  "&:after": {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  "& [type=file]": {
    width: 0,
    height: 0,
    padding: 0,
    overflow: "hidden",
    border: 0,
  },
})
