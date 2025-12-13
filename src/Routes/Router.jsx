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
import DashboardLayout from "../Layouts/DashboardLayout";
import Myparcels from "../Pages/Dashboard/MyParcels/Myparcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/paymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import RiderRoute from "./RiderRoute";
import AssignedDeliveries from "../Pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrac from "../Pages/ParcelTrac/ParcelTrac";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";





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
         </PrivateRoute>,
          loader:() =>fetch('/ServiceCenter.json').then(res=>res.json())

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

      },
      {
        path:'parcel-track/:trackingId',
        Component:ParcelTrac

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
  },
  {
    path:"dashboard",
    element:<PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children:[
      {
          index:true,
          Component:DashboardHome
      },
      {
        path:'my-parcels',
        Component:Myparcels

      },
      {
        path:'payment/:parcelId',
        Component:Payment
      },
      {    
        path:'payment-history',
        Component:PaymentHistory

      },

      {
        path:'payment-success',
        Component:PaymentSuccess
      },
      {
        path:'payment-cancelled',
        Component:PaymentCancelled
      },
      {
        path:'assigned-deliveries',
        element:<RiderRoute><AssignedDeliveries></AssignedDeliveries></RiderRoute>

      },
      {
        path:'completed-deliveries',
        element:<RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>

      },


      {
        path:'approve-riders',
        element:<AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
      },
      {
        path:'assign-riders',
        element:<AdminRoute><AssignRiders></AssignRiders></AdminRoute>
      },
      {
        path:'users-management',
        element:<AdminRoute><UsersManagement></UsersManagement></AdminRoute>
      }
    ]

  }

]);
