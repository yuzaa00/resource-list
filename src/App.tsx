import { ToastContainer } from "react-toastify"
import { MainTemplate } from "./features/main/templates/MainTemplate"
import { globalStyles } from "./stitches.config"
import "react-toastify/dist/ReactToastify.css"

function App() {
  globalStyles()

  return (
    <>
      <MainTemplate />
      <ToastContainer />
    </>
  )
}

export default App
