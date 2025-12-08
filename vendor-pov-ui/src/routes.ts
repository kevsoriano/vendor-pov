import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Customers from "./pages/customers/Customers";
import CustomerDetail from "./pages/customers/CustomerDetail";
import Products from "./pages/products/Products.tsx";
import ProductDetail from "./pages/products/ProductDetail.tsx";
import App from "./App.tsx";
import AddProduct from "./pages/products/AddProduct.tsx";
import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.tsx";

export const router = createBrowserRouter([
	{ 
		path: 'signin', 
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