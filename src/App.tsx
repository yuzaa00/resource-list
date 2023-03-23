import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { MainPage } from "./pages/main"
import { globalStyles } from "./stitches.config"
import "react-toastify/dist/ReactToastify.css"

function App() {
  globalStyles()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/:currentResourceId",
      element: <MainPage />,
    },
  ])

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App
