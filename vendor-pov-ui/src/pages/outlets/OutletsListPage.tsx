import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import NotificationBanner from "../../components/common/NotificationBanner/NotificationBanner";
import ResourceTable from "../../components/common/ResourceTable";
import { getAll } from "../../utils/http";

interface Outlet {
	id: string;
	name: string;
}

function Row(props: { row: Outlet }) {
	const { row } = props;
	const navigate = useNavigate();

	return (
		<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
			<TableCell component="th" scope="row" align="center">
				<Button onClick={() => navigate(`/outlets/${row.id}/edit`)}>{row.name}</Button>
			</TableCell>
		</TableRow>
	);
}
export default function OutletListPage() {
	const navigate = useNavigate();
	const {
		data: outlets = [],
		isPending,
		isError,
		error,
	} = useQuery<Outlet[]>({
		queryKey: ["outlets"],
		queryFn: () => getAll("outlets"),
		staleTime: 0,
		// gcTime: 30000,
	});

	return (
		<div>
			<div className="px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]">
				<h1>Outlets</h1>
			</div>
			<div className="flex justify-between px-4 sm:px-6 lg:px-8 py-6 items-center">
				<p>Add, view and edit your outlets all in one place.</p>
				<div className="flex gap-2">
					<button type="button" className="bg-[#5d91b4] text-white">
						Import
					</button>
					<button
						type="button"
						className="bg-[#00b740] text-white px-4 py-2 rounded"
						onClick={() => navigate("/outlets/add")}
					>
						Add
					</button>
				</div>
			</div>

			{isError && (
				<NotificationBanner
					message={error instanceof Error ? error.message : "Failed to load"}
					type="error"
					onClose={() => {}} // Usually managed via query invalidation or local state if needed
				/>
			)}

			{isPending && <div>Loading outlets…</div>}

			{!isPending && outlets.length === 0 && <div>No outlets found.</div>}

			{!isPending && outlets.length > 0 && (
				<ResourceTable
					headers={["Name"]}
					items={outlets}
					renderRow={(outlet) => <Row key={outlet.name} row={outlet} />}
					isActionsAvailable={false}
				></ResourceTable>
			)}
		</div>
	);
}
