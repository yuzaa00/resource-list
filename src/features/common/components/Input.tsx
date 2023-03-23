import { styled } from "../../../stitches.config"

export const Input = styled("input", {
  all: "unset",
  boxSizing: "border-box",
  width: "100%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "3px",
  fontSize: "12px",
  fontWeight: 400,
  color: "$black",
  padding: "0 8px",
  height: "30px",
  lineHeight: 1,
  boxShadow: "0 0 0 1px $colors$blue50",
  background: "$gray97",
  cursor: "text",

  variants: {
    isError: {
      true: {
        boxShadow: "0 0 0 1px $colors$red",
      },
    },
  },
})
