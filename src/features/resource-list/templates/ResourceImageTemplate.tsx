import { ChangeEvent, useRef, useState } from "react"
import { toast } from "react-toastify"
import { styled } from "../../../stitches.config"
import { errorMessages } from "../../common/constant"
import { ResourceSchema } from "../../resource/type"
import { ResourceAddButton } from "../components/ResourceAddButton"
import { controlValidation } from "../utils/controlValidation"

interface ResourceIamgeTemplateProps {
  setResourceList: (resource: ResourceSchema) => void
}

export const ResourceImageTemplate = ({
  setResourceList,
}: ResourceIamgeTemplateProps) => {
  const fileRef = useRef<HTMLInputElement>(null)

  const [isLoading, setLoading] = useState(false)

  const acceptableMimeType = {
    JPEG: "image/jpeg",
    PNG: "image/png",
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files: selectedFiles } = e.target

    const processUpload = async () => {
      if (!selectedFiles) {
        return toast("선택된 파일이 없습니다", { type: "error" })
      }

      const isAcceptableFile = Array.from(selectedFiles).every((file) =>
        Object.values(acceptableMimeType).includes(file.type)
      )

      if (!isAcceptableFile) {
        return toast(
          `${Object.keys(acceptableMimeType).join(
            ","
          )} 파일만 업로드할 수 있어요`,
          { type: "error" }
        )
      }

      Array.from(selectedFiles).forEach((file) => {
        const reader = new FileReader()

        reader.onload = () => {
          setResourceList({
            id: self.crypto.randomUUID(),
            name: file.name,
            url: reader.result as string,
            file,
          })
        }
        reader.onerror = () => {
          toast(errorMessages.FAILED_REQUEST, { type: "error" })
        }
        reader.readAsDataURL(file)
      })
    }

    setLoading(true)
    controlValidation()
      .then(processUpload)
      .then(() => toast("등록에 성공했어요", { type: "success" }))
      .catch((error) => {
        toast(error, { type: "error" })
      })
      .finally(() => {
        setLoading(false)
        if (!fileRef.current) return
        fileRef.current.value = ""
      })
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
