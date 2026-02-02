import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AuthenticationPage, { action as AuthAction } from "./pages/auth/Authentication";
import { action as LogoutAction } from "./pages/auth/Logout"; // Update the import path as needed
// import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import OutletListPage from "./pages/outlets/OutletsListPage";
import BrandAddPage from "./pages/products/Brands/BrandAddPage";
import BrandDetailsPage from "./pages/products/Brands/BrandDetailsPage";
import BrandListPage from "./pages/products/Brands/BrandListPage";
// import AddProduct from "./pages/products/AddProduct";
import Products from "./pages/products/ProductListPage";
import ProductTagsListPage from "./pages/products/ProductTag/ProductTagsListPage";
import SuppliersAddPage from "./pages/products/Suppliers/SuppliersAddPage";
import SupplierListPage from "./pages/products/Suppliers/SuppliersListPage";
import TestCreatableSelect from "./pages/TestCreatableSelect";
import RoleAddPage from "./pages/users/RoleAddPage";
import RoleDetailsPage from "./pages/users/RoleDetailsPage";
import RoleListPage from "./pages/users/RoleListPage";
import RoleMembersPage from "./pages/users/RoleMembersPage";
import UserAddPage from "./pages/users/UserAddPage";
import UserDetailsPage from "./pages/users/UserDetailsPage";
import UserListPage from "./pages/users/UserListPage";
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
				Component: UserListPage,
				loader: checkAuthLoader,
			},
			{
				path: "/users/add",
				Component: UserAddPage,
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
				Component: RoleAddPage,
				loader: checkAuthLoader,
			},
			{
				path: "roles/:id/edit",
				Component: RoleDetailsPage,
				loader: checkAuthLoader,
			},
			{
				path: "roles/:id/members",
				Component: RoleMembersPage,
				loader: checkAuthLoader,
			},
			{
				path: "brands",
				Component: BrandListPage,
				loader: checkAuthLoader,
			},
			{
				path: "brands/add",
				Component: BrandAddPage,
				loader: checkAuthLoader,
			},
			{
				path: "brands/:id/edit",
				Component: BrandDetailsPage,
				loader: checkAuthLoader,
			},
			{
				path: "suppliers",
				Component: SupplierListPage,
				loader: checkAuthLoader,
			},
			{
				path: "suppliers/add",
				Component: SuppliersAddPage,
				loader: checkAuthLoader,
			},
			{
				path: "product-tags",
				Component: ProductTagsListPage,
				loader: checkAuthLoader,
			},
			{
				path: "outlets",
				Component: OutletListPage,
				loader: checkAuthLoader,
			},
			{
				path: "products",
				Component: Products,
				loader: checkAuthLoader,
			},
			{
				path: "test-creatable",
				Component: TestCreatableSelect,
			},
		],
	},
]);
