import { useEffect, useState } from "react";
import "./App.css";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { getTokenDuration } from "./utils/auth";
import { OutletContext } from "./context/OutletContext";

function App() {
	const token = useLoaderData();
	const submit = useSubmit();
	const [selectedOutlet, setSelectedOutlet] = useState<string>("");

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
		<OutletContext.Provider value={{ selectedOutlet, setSelectedOutlet }}>
			<div className="min-h-screen">
				<Header />
				<div className="flex min-h-[calc(100vh-60px)]">
					{token && <Sidebar />}
					<main className="bg-[#e4eaee] w-full">
						<div className="">
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</OutletContext.Provider>
	);
}

export default App;
