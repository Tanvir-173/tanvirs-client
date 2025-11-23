import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Pages/Rider/Rider";
import SenedParcel from "../Pages/SendParcel/SenedParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
      {
        index:true,
        Component:Home
      },
      {
         path:'rider',
         element:<PrivateRoute>
          <Rider></Rider>
         </PrivateRoute>

      },
      {
         path:'send-parcel',
         element:<PrivateRoute>
                 <SenedParcel></SenedParcel>
         </PrivateRoute>,
          loader:() =>fetch('/ServiceCenter.json').then(res=>res.json())

      },

      {
        path:'coverage',
        Component:Coverage,
        loader:() =>fetch('/ServiceCenter.json').then(res=>res.json())

      }
      

    ]
  },

  {
    path:'/',
    Component: AuthLayout,
    children:[
      {
        path:'login',
        Component:Login

      },
      {
        path:'register',
        Component:Register

      }
    ]
  }
]);
