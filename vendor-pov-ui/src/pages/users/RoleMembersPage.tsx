import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotificationBanner from "../../components/common/NotificationBanner/NotificationBanner";
import ResourceTable from "../../components/common/ResourceTable";
import { getAll } from "../../utils/http";

interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	dailyTarget: number;
	weeklyTarget: number;
	monthlyTarget: number;
}

function Row(props: { row: User }) {
	const { row } = props;
	const navigate = useNavigate();

	return (
		<TableRow
			sx={{ "& > *": { borderBottom: "unset" }, cursor: "pointer" }}
			onClick={() => navigate(`/users/${row.id}/edit`)}
		>
			<TableCell component="th" scope="row" align="center">
				{row.firstName}
			</TableCell>
			<TableCell component="th" scope="row" align="center">
				{row.lastName}
			</TableCell>
			<TableCell component="th" scope="row" align="center">
				{row.email}
			</TableCell>
		</TableRow>
	);
}

export default function RoleMembersPage() {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [users, setUsers] = useState<User[]>([]);
	const [isFetching, setIsFetching] = useState(false);
	const [notification, setNotification] = useState<{
		message: string;
		type: "success" | "error" | "info";
	} | null>(null);

	useEffect(() => {
		setIsFetching(true);
		const fetchUsers = async () => {
			try {
				const response = await getAll(`users/roles/${id}`);
				setUsers(response);
				setNotification({
					message: "Roles loaded successfully",
					type: "success",
				});
			} catch (error) {
				const msg = error instanceof Error ? error.message : String(error);
				setNotification({
					message: msg,
					type: "error",
				});
			} finally {
				setIsFetching(false);
			}
		};
		fetchUsers();
	}, [id]);
	return (
		<div>
			<Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
				<Typography>Role Members</Typography>
				<button
					type="button"
					className="bg-[#5d91b4] text-white px-4 py-2 rounded"
					onClick={() => navigate("/roles")}
					disabled={isFetching}
				>
					Back
				</button>
			</Box>

			{notification && (
				<NotificationBanner
					message={notification.message}
					type={notification.type}
					onClose={() => setNotification(null)}
				/>
			)}
			{!isFetching && (
				<div className="max-w-3xl mx-auto">
					<ResourceTable
						headers={["First Name", "Last Name", "Email"]}
						items={users}
						renderRow={(user) => <Row key={user.email} row={user} />}
						isActionsAvailable={false}
					></ResourceTable>
				</div>
			)}
		</div>
	);
}
