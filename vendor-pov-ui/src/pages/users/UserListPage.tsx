import { Fragment, useEffect, useState } from "react";
import NotificationBanner from "../../components/common/NotificationBanner";
import { fetchAvailableUsers } from "../../utils/http";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ResourceTable from "../../components/common/ResourceTable";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";

function rowData(firstName: string, lastName: number, email: number) {
	return {
		firstName,
		lastName,
		email,
	};
}

function Row(props: { row: ReturnType<typeof rowData> }) {
	const { row } = props;
	const [open, setOpen] = useState(false);

	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell>
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row" align="center">
					{row.firstName}
				</TableCell>
				<TableCell align="center">{row.lastName}</TableCell>
				<TableCell align="center">{row.email}</TableCell>
				<TableCell align="center">
					<Button><EditIcon /></Button>
					<Button><DeleteIcon /></Button>
				</TableCell>
			</TableRow>
			<TableRow>
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
			</TableRow>
		</Fragment>
	);
}

const UsersPage = () => {
	const [users, setUsers] = useState<any[]>([]);
	const [activeTab, setActiveTab] = useState("one");
	const [isFetching, setIsFetching] = useState(false);
	const [notification, setNotification] = useState<{
		message: string;
		type: "success" | "error" | "info";
	} | null>(null);

	useEffect(() => {
		setIsFetching(true);
		const fetchUsers = async () => {
			try {
				const response = await fetchAvailableUsers();

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

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		console.log(event);
		setActiveTab(newValue);
	};

	return (
		<div>
			<div className="px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]">
				<h1>Users</h1>
			</div>
			<div className="flex justify-between px-4 sm:px-6 lg:px-8 py-6 items-center">
				<p>Add, view and edit your products all in one place.</p>
				<div className="flex gap-2">
					<button className="bg-[#5d91b4] text-white">Import</button>
					<button className="bg-[#00b740] text-white">
						<Link to={"/users/add"}>Add User</Link>
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
					headers={["", "First Name", "Last Name", "Email"]}
					items={users}
					renderRow={(user) => <Row key={user.email} row={user} />}
				></ResourceTable>
			)}
		</div>
	);
};

export default UsersPage;
