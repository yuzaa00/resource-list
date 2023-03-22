import { MainTemplate } from "./features/main/templates/MainTemplate"
import { globalStyles } from "./stitches.config"

function App() {
  globalStyles()

  return <MainTemplate />
}

export default App
