import { createBrowserRouter } from "react-router-dom";
import AuthenticationPage, { action as AuthAction } from "./pages/auth/Authentication";
import App from "./App";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import { checkAuthLoader, tokenLoader } from "./utils/auth";
import { action as LogoutAction } from "./pages/auth/Logout"; // Update the import path as needed
import AddProduct from "./pages/products/AddProduct";
import ProductDetail from "./pages/products/ProductDetailPage";
import Products from "./pages/products/ProductListPage";
import TestCreatableSelect from "./pages/TestCreatableSelect";
import TestProductVariants from "./pages/TestProductVariants";
import UsersPage from "./pages/users/UserListPage";
import AddUsersPage from "./pages/users/AddUsersPage";

export const router = createBrowserRouter([
	{
		path: "/",
		Component: App,
		// errorElement: <ErrorPage />,
		id: "root",
		loader: tokenLoader,
		children: [
			// TODO: index route
			{
				path: "/home",
				Component: HomePage,
				loader: checkAuthLoader,
			},
			{
				path: "/auth",
				Component: AuthenticationPage,
				action: AuthAction,
			},
			{
				path: "/logout",
				action: LogoutAction,
			},
			{
				path: "/users",
				Component: UsersPage,
				loader: checkAuthLoader,
			},
			{
				path: "/users/add",
				Component: AddUsersPage,
				loader: checkAuthLoader,
			},
			{
				path: "products",
				Component: Products,
				loader: checkAuthLoader,
			},
			{
				path: "products/:productId",
				Component: ProductDetail,
				loader: checkAuthLoader,
			},
			{
				path: "products/add",
				Component: AddProduct,
				loader: checkAuthLoader,
			},
			{
				path: "test-creatable",
				Component: TestCreatableSelect,
			},
			{
				path: "test-product-variants",
				Component: TestProductVariants,
			},
		],
	},
]);
