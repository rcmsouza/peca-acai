import {
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import Checkout from "./checkout";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/checkout',
    element: <Checkout />
  },
])