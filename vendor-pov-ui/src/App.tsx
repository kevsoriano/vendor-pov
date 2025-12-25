import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { getTokenDuration } from "./utils/auth";

function App() {
	const token = useLoaderData();
	const submit = useSubmit();

	useEffect(() => {
		if (!token) {
			return;
		}

		if (token === "EXPIRED") {
			submit(null, { action: "/logout", method: "post" });
			return;
		}

		const tokenDuration = getTokenDuration();

		setTimeout(() => {
			submit(null, { action: "/logout", method: "post" });
		}, tokenDuration);
	}, [token, submit]);

	return (
		<>
			<div className="h-[100vh]">
				<Header />
				<div className="flex h-[calc(100vh-60px)]">
					{token && <Sidebar />}
					<main className="bg-[#e4eaee] w-full">
						<div className="">
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</>
	);
}

export default App;
