import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
	return (
		<>
			<div className="h-[100vh]">
				<div className="h-[60px] w-[100vw] items-center border-b bg-[#374954] text-white">
					<span>Header</span>
				</div>
				<div className="flex h-[calc(100vh-60px)]">
					<Sidebar />
					<main className="bg-[#e4eaee] w-full">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
							Main
						</div>
					</main>
				</div>
			</div>
		</>
	);
}

export default App;
