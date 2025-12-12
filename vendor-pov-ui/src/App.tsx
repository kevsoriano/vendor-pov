import "./App.css";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

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
						<div>
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</>
	);
}

export default App;
