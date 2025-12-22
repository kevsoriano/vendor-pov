import { createBrowserRouter } from "react-router-dom";
import AuthenticationPage, { action as AuthAction } from "./pages/Auth/Authentication";
import SignIn from "./components/SignIn";
import App from "./App";
import SignUp from "./components/SignUp";
import CustomerDetail from "./pages/customers/CustomerDetail";
import Customers from "./pages/customers/Customers";
import Home from "./pages/Home";
import AddProduct from "./pages/products/AddProduct";
import ProductDetail from "./pages/products/ProductDetail";
import Products from "./pages/products/Products";
import TestCreatableSelect from "./pages/TestCreatableSelect";
import TestProductVariants from "./pages/TestProductVariants";

export const router = createBrowserRouter([
	// {
	// 	path: '/',
	// 	Component: 
	// },
	{
		path: '/auth',
		Component: AuthenticationPage,
		action: AuthAction
	},
	{
		path: 'test-creatable',
		Component: TestCreatableSelect
	},
	{
		path: 'test-product-variants',
		Component: TestProductVariants
	},
	{
		path: '/signin',
		Component: SignIn,
	},
	{
		path: 'signup',
		Component: SignUp,
	},
	{
		Component: App, // LayoutComponent
		children: [
			{
				index: true,
				Component: Home,
			},
			{
				path: 'customers',
				Component: Customers,
			},
			{
				path: ":customerId",
				Component: CustomerDetail
			},
			{
				path: 'products',
				Component: Products,
			},
			{
				path: "products/:productId",
				Component: ProductDetail
			},
			{
				path: "products/add",
				Component: AddProduct
			},
		]
	}
]);