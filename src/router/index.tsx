import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import HomePage from "../pages/HomePage";
import CollectionsPage from "../pages/CollectionsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import CheckoutDeliveryPage from "../pages/CheckoutDeliveryPage";

import ContactPage from "../pages/ContactPage";
import AccountPage from "../pages/AccountPage";
import CheckoutPaymentPage from "../pages/CheckoutPaymentPage";
import LoginPage from "../pages/LoginPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";
import SignUpPage from "../pages/SignUpPage";
import ProtectedRoute from "./ProtectedRoute";
import RouteErrorPage from "../pages/RouteErrorPage";
import HotDrinksPage from "../pages/HotDrinksPage";
import ColdDrinksPage from "../pages/ColdDrinksPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "collections", element: <CollectionsPage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "hotdrinks", element: <HotDrinksPage /> },
      { path: "colddrinks", element: <ColdDrinksPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "checkout/delivery", element: <CheckoutDeliveryPage /> },
          { path: "checkout/payment", element: <CheckoutPaymentPage /> },
          { path: "order-confirmation", element: <OrderConfirmationPage /> },
          { path: "account", element: <AccountPage /> },
        ],
      },
    ],
  },
]);
