import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { useNavigate } from "react-router-dom";
import NotificationBanner from "../../components/common/NotificationBanner/NotificationBanner";
import ResourceTable from "../../components/common/ResourceTable";
import { getAll } from "../../utils/http";

interface Role {
	id: string;
	name: string;
	userCount: number;
}

function TabNavigation() {
	const navigate = useNavigate();

	const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
		navigate(`/${newValue}`);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Tabs
				value="roles"
				onChange={handleChange}
				textColor="secondary"
				indicatorColor="secondary"
				aria-label="secondary tabs example"
			>
				<Tab value="users" label="Users" />
				<Tab value="roles" label="Roles" />
			</Tabs>
		</Box>
	);
}

function Row(props: { row: Role }) {
	const { row } = props;
	const navigate = useNavigate();

	return (
		<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
			<TableCell component="th" scope="row" align="center">
				<Button onClick={() => navigate(`/roles/${row.id}/edit`)}>{row.name}</Button>
			</TableCell>
			<TableCell component="th" scope="row" align="center">
				<Button onClick={() => navigate(`/roles/${row.id}/members`)}>{row.userCount}</Button>
			</TableCell>
		</TableRow>
	);
}

const RoleListPage = () => {
	const navigate = useNavigate();
	const {
		data: roles = [],
		isPending,
		isError,
		error,
	} = useQuery<Role[]>({
		queryKey: ["roles"],
		queryFn: () => getAll("roles"),
		staleTime: 0,
		// gcTime: 30000,
	});

	return (
		<div>
			<div className="px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]">
				<h1>Users</h1>
			</div>
			<div className="px-4">
				<TabNavigation />
			</div>
			<div className="flex justify-between px-4 sm:px-6 lg:px-8 py-6 items-center">
				<p>Add, view and edit your roles all in one place.</p>
				<div className="flex gap-2">
					<button type="button" className="bg-[#5d91b4] text-white">
						Import
					</button>
					<button
						type="button"
						className="bg-[#00b740] text-white px-4 py-2 rounded"
						onClick={() => navigate("/roles/add")}
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

			{isPending && <div>Loading roles…</div>}

			{!isPending && roles.length === 0 && <div>No roles found.</div>}

			{!isPending && roles.length > 0 && (
				<ResourceTable
					headers={["Name", "User Count"]}
					items={roles}
					renderRow={(role) => <Row key={role.name} row={role} />}
					isActionsAvailable={false}
				></ResourceTable>
			)}
		</div>
	);
};

export default RoleListPage;
