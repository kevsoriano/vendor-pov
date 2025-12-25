import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

export default function Header() {
	const token = useRouteLoaderData("root");

	return (
		<header className="flex justify-between items-center h-[60px] w-[100vw] border-b bg-[#374954] text-white px-8">
			<div>
				<NavLink to="/home">Header</NavLink>
			</div>
			<nav>
				<ul>
					{!token && (
						<li>
							<NavLink to="/auth?mode=login">Login</NavLink>
						</li>
					)}
					{token && (
						<li>
							<Form action="/logout" method="post">
								<button>Logout</button>
							</Form>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}
