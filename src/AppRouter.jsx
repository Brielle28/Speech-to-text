import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from './Pages/LandingPage';
import Userprovider from "./Component/Context/Userprovider";
const routing = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  }
])
const AppRouter = () => {
  return (
    <>
      <Userprovider>
        <RouterProvider router={routing} />
      </Userprovider>
    </>
  )
}

export default AppRouter