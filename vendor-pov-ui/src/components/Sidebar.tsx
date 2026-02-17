import { useState } from "react";
import CustomersIcon from "../assets/customers.png";
import HomeIcon from "../assets/home.png";
import ProductIcon from "../assets/product.png";
import ReportingIcon from "../assets/reporting.png";
import SalesLedgerIcon from "../assets/sales-ledger.png";
import SellIcon from "../assets/sell.png";
import SetupIcon from "../assets/setup.png";
import "../App.css";
import { Link } from "react-router-dom";

const initialNavigation = [
	{
		name: "QA",
		link: "/qa-prompts",
		icon: "https://img.icons8.com/ios-filled/50/000000/inspection.png", // placeholder icon
		current: false,
		children: [],
	},
	{
		name: "Home",
		link: "/",
		icon: HomeIcon,
		current: true,
		children: [],
	},
	{
		name: "Sell",
		link: "",
		icon: SellIcon,
		current: false,
		children: [
			{
				name: "Sell",
				link: "/sell",
				current: true,
			},
			{
				name: "Open/Close",
				link: "/open-close",
				current: false,
			},
			{
				name: "Sales History",
				link: "/sales-history",
				current: false,
			},
			{
				name: "Cash Management",
				link: "/cash-management",
				current: false,
			},
			{
				name: "Status",
				link: "/sell/status",
				current: false,
			},
			{
				name: "Settings",
				link: "/sell/settings",
				current: false,
			},
		],
	},
	{
		name: "Sales Ledger",
		link: "/sales-ledger",
		icon: SalesLedgerIcon,
		current: false,
		children: [],
	},
	{
		name: "Reporting",
		link: "",
		icon: ReportingIcon,
		current: false,
		children: [
			{
				name: "Retail Dashboard",
				link: "/retail-dashboard",
				current: false,
			},
			{
				name: "Sales Reports",
				link: "/sales-reports",
				current: false,
			},
			{
				name: "Inventory Reports",
				link: "/inventory-reports",
				current: false,
			},
			{
				name: "Payment Reports",
				link: "/payment-reports",
				current: false,
			},
			{
				name: "Register Closures",
				link: "/register-closures",
				current: false,
			},
			{
				name: "Gift Card Reports",
				link: "/gift-card-reports",
				current: false,
			},
			{
				name: "Store Credit Reports",
				link: "/store-credit-reports",
				current: false,
			},
			{
				name: "Tax Reports",
				link: "/tax-reports",
				current: false,
			},
		],
	},
	{
		name: "Products",
		link: "",
		icon: ProductIcon,
		current: false,
		children: [
			{
				name: "Products",
				link: "/products",
				current: false,
			},
			{
				name: "Stock Control",
				link: "/stock-control",
				current: false,
			},
			{
				name: "Promotions",
				link: "/product-promotions",
				current: false,
			},
			{
				name: "Price Books",
				link: "/price-books",
				current: false,
			},
			{
				name: "Product Types",
				link: "/product-types",
				current: false,
			},
			{
				name: "Suppliers",
				link: "/suppliers",
				current: false,
			},
			{
				name: "Brands",
				link: "/brands",
				current: false,
			},
			{
				name: "Product Tags",
				link: "/product-tags",
				current: false,
			},
		],
	},
	{
		name: "Customers",
		link: "",
		icon: CustomersIcon,
		current: false,
		children: [
			{
				name: "Customers",
				link: "/customers",
				current: false,
			},
			{
				name: "Groups",
				link: "/customer-groups",
				current: false,
			},
		],
	},
	{
		name: "Setup",
		link: "",
		icon: SetupIcon,
		current: false,
		children: [
			{
				name: "General",
				link: "/setup",
				current: false,
			},
			{
				name: "Billing",
				link: "/billing-setup",
				current: false,
			},
			{
				name: "Outlets and Registers",
				link: "/outlets-and-registers-setup",
				current: false,
			},
			{
				name: "Payment Types",
				link: "/payment-types-setup",
				current: false,
			},
			{
				name: "Sales Taxes",
				link: "/sales-taxes-setup",
				current: false,
			},
			{
				name: "Loyalty",
				link: "/loyalty-setup",
				current: false,
			},
			{
				name: "Users",
				link: "/users",
				current: false,
			},
			{
				name: "Add-ons",
				link: "/add-ons",
				current: false,
			},
			{
				name: "Personal Tokens",
				link: "/personal-tokens",
				current: false,
			},
			{
				name: "Gift Cards",
				link: "/gift-cards",
				current: false,
			},
			{
				name: "Store Credit",
				link: "/store-credit",
				current: false,
			},
		],
	},
];

// const userNavigation = [
//   { name: 'Your profile', href: '#' },
//   { name: 'Sign out', href: '#' },
// ]

export default function Sidebar() {
	// const [sidebarOpen, setSidebarOpen] = useState(false)
	const [navigation, setNavigation] = useState(initialNavigation);

	const handleMenuClick = (index: number) => {
		const updatedMenus = navigation.map((menu, idx) => {
			if (idx === index) {
				return { ...menu, current: true };
			} else {
				return { ...menu, current: false };
			}
		});
		setNavigation(updatedMenus);
	};

	const handleSubMenuClick = (index: number) => {
		const updatedMenus = navigation.map((menu) => {
			if (menu.current === true) {
				const updatedSubMenus = menu.children.map((submenu, idx) => {
					if (idx === index) {
						return {
							...submenu,
							current: true,
						};
					} else {
						return {
							...submenu,
							current: false,
						};
					}
				});
				return {
					...menu,
					children: updatedSubMenus,
				};
			} else {
				return menu;
			}
		});
		setNavigation(updatedMenus);
	};

	return (
		<>
			<div className="bg-[#e4eaee]">
				<ul>
					{navigation?.map((item, index) => {
						const hasChildren = item.children?.length > 0;

						const content = (
							<li
								className={`text-center p-2 text-xs ${item.current ? "bg-[#ffffff]" : "bg-[#e4eaee]"} ${hasChildren ? "cursor-pointer hover:bg-[#d9e3e8]" : ""}`}
								onClick={() => handleMenuClick(index)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										handleMenuClick(index);
									}
								}}
							>
								<img
									src={item.icon}
									alt=""
									style={{ width: "28px", height: "24px", margin: "auto" }}
								/>
								<div className="mt-2">{item.name}</div>
							</li>
						);

						if (hasChildren) {
							return <div key={item.name}>{content}</div>;
						}

						return (
							<Link to={item.link} key={item.name}>
								{content}
							</Link>
						);
					})}
				</ul>
			</div>

			{navigation?.map((item) => {
				if (item.current === true && item.children?.length !== 0) {
					return (
						<aside key={`${item.name}-active`} className={`aside show`}>
							<ul>
								{item.children?.map((submenu, index) => (
									<Link to={submenu.link} key={submenu.name}>
										<li
											key={submenu.name}
											className={`aside-item text-xs ${submenu.current ? "bg-[#eff4f4]" : ""}`}
											onClick={() => handleSubMenuClick(index)}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ") {
													handleSubMenuClick(index);
												}
											}}
										>
											{submenu.name}
										</li>
									</Link>
								))}
							</ul>
						</aside>
					);
				} else {
					return null;
				}
			})}
		</>
	);
}
