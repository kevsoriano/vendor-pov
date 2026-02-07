import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ResourceTable from "../../components/common/ResourceTable";
import type { Outlet } from "../../types/models";

interface OutletsTableProps {
	outlets: Outlet[];
}

export const OutletsTable: React.FC<OutletsTableProps> = ({ outlets }) => {
	return (
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
	);
};

export default OutletsTable;
