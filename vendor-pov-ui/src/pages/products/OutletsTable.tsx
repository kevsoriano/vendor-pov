import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import ResourceCreateModal from "../../components/common/ResourceCreateModal";
import ResourceTable from "../../components/common/ResourceTable";
import type { Outlet } from "../../types/models";

interface OutletsTableProps {
	outlets: Outlet[];
}

export const OutletsTable: React.FC<OutletsTableProps> = ({ outlets }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleCreateOutlet = async (inputValue: string) => {
		setLoading(true);
		// You may want to call an API or mutate here
		setLoading(false);
		setModalOpen(false);
	};

	return (
		<>
			<ResourceTable
				headers={["Outlet Name", "Current Inventory", "Re-order Point", "Re-order Quantity"]}
				items={outlets}
				renderRow={(outlet, idx) => (
					<TableRow key={outlet.id}>
						<TableCell align="center" style={{ padding: "16px 8px" }}>
							{outlet.name}
						</TableCell>
						<TableCell align="center" style={{ padding: "16px 8px" }}>
							<input
								type="number"
								min={0}
								style={{ width: 100, textAlign: "right", padding: "8px" }}
								className="no-spinner"
								step="0.01"
								onChange={(e) => {
									const value = e.target.value;
									const formatted = value.includes(".")
										? value.replace(/^(\d+\.\d{0,2}).*$/, "$1")
										: value;
									e.target.value = formatted;
								}}
							/>
						</TableCell>
						<TableCell align="center" style={{ padding: "16px 8px" }}>
							<input
								type="number"
								min={0}
								style={{ width: 100, textAlign: "right", padding: "8px" }}
								className="no-spinner"
								step="0.01"
								onChange={(e) => {
									const value = e.target.value;
									const formatted = value.includes(".")
										? value.replace(/^(\d+\.\d{0,2}).*$/, "$1")
										: value;
									e.target.value = formatted;
								}}
							/>
						</TableCell>
						<TableCell align="center" style={{ padding: "16px 8px" }}>
							<input
								type="number"
								min={0}
								style={{ width: 100, textAlign: "right", padding: "8px" }}
								className="no-spinner"
								step="0.01"
								onChange={(e) => {
									const value = e.target.value;
									const formatted = value.includes(".")
										? value.replace(/^(\d+\.\d{0,2}).*$/, "$1")
										: value;
									e.target.value = formatted;
								}}
							/>
						</TableCell>
					</TableRow>
				)}
				isActionsAvailable={false}
			/>
			<TableRow>
				<TableCell colSpan={4} align="center" style={{ padding: "16px 8px" }}>
					<button
						type="button"
						className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
						onClick={() => setModalOpen(true)}
					>
						+ Add New Outlet
					</button>
				</TableCell>
			</TableRow>
			<ResourceCreateModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				onCreate={handleCreateOutlet}
				label="Outlet Name"
				loading={loading}
			/>
		</>
	);
};

export default OutletsTable;
