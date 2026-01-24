import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AuthenticationPage, { action as AuthAction } from "./pages/auth/Authentication";
import { action as LogoutAction } from "./pages/auth/Logout"; // Update the import path as needed
// import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
// import AddProduct from "./pages/products/AddProduct";
import ProductDetail from "./pages/products/ProductDetailPage";
import Products from "./pages/products/ProductListPage";
import TestCreatableSelect from "./pages/TestCreatableSelect";
import AddRolesPage from "./pages/users/AddRolesPage";
import AddUsersPage from "./pages/users/AddUsersPage";
import RoleDetailsPage from "./pages/users/RoleDetailsPage";
import RoleListPage from "./pages/users/RoleListPage";
import UserDetailsPage from "./pages/users/UserDetailPage";
import UsersPage from "./pages/users/UserListPage";
import { checkAuthLoader, tokenLoader } from "./utils/auth";

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
				path: "users/:id/edit",
				Component: UserDetailsPage,
				loader: checkAuthLoader,
			},
			{
				path: "/roles",
				Component: RoleListPage,
				loader: checkAuthLoader,
			},
			{
				path: "/roles/add",
				Component: AddRolesPage,
				loader: checkAuthLoader,
			},
			{
				path: "roles/:id/edit",
				Component: RoleDetailsPage,
				loader: checkAuthLoader,
			},
			{
				path: "products",
				Component: Products,
				loader: checkAuthLoader,
			},
			{
				path: "products/:id/edit",
				Component: ProductDetail,
				loader: checkAuthLoader,
			},
			{
				path: "test-creatable",
				Component: TestCreatableSelect,
			},
		],
	},
]);
