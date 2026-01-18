import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import type React from "react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationBanner from "../../components/common/NotificationBanner/NotificationBanner";
import ResourceTable from "../../components/common/ResourceTable";
import { deleteResource, getAll } from "../../utils/http";

interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	dailyTarget: number;
	weeklyTarget: number;
	monthlyTarget: number;
}

function TabNavigation() {
	const navigate = useNavigate();

	const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
		navigate(`/${newValue}`);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Tabs
				value="users"
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

function Row(props: { row: User; onDelete: (id: string) => void }) {
	const { row, onDelete } = props;
	const navigate = useNavigate();
	// const [open, setOpen] = useState(false);

	const handleDelete = () => {
		if (
			window.confirm(`Are you sure you want to delete user '${row.firstName} ${row.lastName}'?`)
		) {
			onDelete(row.id);
		}
	};

	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				{/* <TableCell>
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell> */}
				<TableCell component="th" scope="row" align="center">
					{row.firstName}
				</TableCell>
				<TableCell align="center">{row.lastName}</TableCell>
				<TableCell align="center">{row.email}</TableCell>
				<TableCell align="center">{row.dailyTarget}</TableCell>
				<TableCell align="center">{row.weeklyTarget}</TableCell>
				<TableCell align="center">{row.monthlyTarget}</TableCell>
				<TableCell align="center">
					<Button onClick={() => navigate(`/users/${row.id}/edit`)}>
						<EditIcon />
					</Button>
					<Button onClick={handleDelete} color="error">
						<DeleteIcon />
					</Button>
				</TableCell>
			</TableRow>
			{/* <TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								History
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>Date</TableCell>
										<TableCell>Customer</TableCell>
										<TableCell align="right">Amount</TableCell>
										<TableCell align="right">Total price ($)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<span>Hello</span>
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow> */}
		</Fragment>
	);
}

const UsersPage = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState<User[]>([]);
	// const [activeTab, setActiveTab] = useState("one");
	const [isFetching, setIsFetching] = useState(false);
	const [notification, setNotification] = useState<{
		message: string;
		type: "success" | "error" | "info";
	} | null>(null);

	useEffect(() => {
		setIsFetching(true);
		const fetchUsers = async () => {
			try {
				const response = await getAll("users");
				// console.log(response);
				setUsers(response);
				setNotification({
					message: "Users loaded successfully",
					type: "success",
				});
			} catch (error) {
				const msg = error instanceof Error ? error.message : String(error);
				setNotification({
					message: msg,
					type: "error",
				});
			}
			setIsFetching(false);
		};
		fetchUsers();
	}, []);

	const handleDelete = async (id: string) => {
		try {
			await deleteResource(`users`, `${id}`);
			setUsers((prev) => prev.filter((user) => user.id !== id));
			setNotification({
				message: `User deleted successfully`,
				type: "success",
			});
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			setNotification({
				message: msg,
				type: "error",
			});
		}
	};

	// const handleChange = (event: React.SyntheticEvent, newValue: string) => {
	// 	console.log(event);
	// 	setActiveTab(newValue);
	// };

	return (
		<div>
			<div className="px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]">
				<h1>Users</h1>
			</div>
			<div className="px-4">
				<TabNavigation />
			</div>
			<div className="flex justify-between px-4 sm:px-6 lg:px-8 py-6 items-center">
				<p>Add, view and edit your users all in one place.</p>
				<div className="flex gap-2">
					<button type="button" className="bg-[#5d91b4] text-white">
						Import
					</button>
					<button
						type="button"
						className="bg-[#00b740] text-white px-4 py-2 rounded"
						onClick={() => navigate("/users/add")}
					>
						Add
					</button>
				</div>
			</div>
			{notification && (
				<NotificationBanner
					message={notification.message}
					type={notification.type}
					onClose={() => setNotification(null)}
				/>
			)}

			{isFetching && <div>Loading users…</div>}

			{!isFetching && users.length === 0 && <div>No users found.</div>}

			{!isFetching && users.length > 0 && (
				<ResourceTable
					headers={[
						"First Name",
						"Last Name",
						"Email",
						"Daily Target",
						"Weekly Target",
						"Monthly Target",
					]}
					items={users}
					renderRow={(user) => <Row key={user.email} row={user} onDelete={handleDelete} />}
				></ResourceTable>
			)}
		</div>
	);
};

export default UsersPage;
