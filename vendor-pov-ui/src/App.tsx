import "./App.css";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
	return (
		<>
			<div className="h-[100vh]">
				<div className="flex justify-between h-[60px] w-[100vw] items-center border-b bg-[#374954] text-white px-8">
					<span>Header</span>
					<div>
						<span>logout</span>
					</div>
				</div>
				<div className="flex h-[calc(100vh-60px)]">
					<Sidebar />
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
