import { ChangeEvent, useRef, useState } from "react"
import { toast } from "react-toastify"
import { styled } from "../../../stitches.config"
import { errorMessages } from "../../common/constant"
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

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files: selectedFiles } = e.target

    const processUpload = () => {
      return new Promise<string>((resolve, reject) => {
        if (!selectedFiles) {
          return reject("선택된 파일이 없습니다")
        }

        const isAcceptableFile = Array.from(selectedFiles).every((file) =>
          Object.values(acceptableMimeType).includes(file.type)
        )

        if (!isAcceptableFile) {
          return reject(
            `${Object.keys(acceptableMimeType).join(
              ","
            )} 파일만 업로드할 수 있어요`
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
            return reject(errorMessages.FAILED_REQUEST)
          }
          reader.readAsDataURL(file)
        })

        resolve("등록에 성공했어요")
      })
    }

    setLoading(true)

    controlValidation()
      .then(processUpload)
      .then((result) => toast(result, { type: "success" }))
      .catch((error) => toast(error, { type: "error" }))
      .finally(() => {
        setLoading(false)
        /** 인풋 초기화 */
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
