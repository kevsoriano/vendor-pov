import { Fragment, useEffect, useState } from "react";
import NotificationBanner from "../../components/common/NotificationBanner";
import { fetchAvailableUsers } from "../../utils/http";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(firstName: string, lastName: number, email: number) {
	return {
		firstName,
		lastName,
		email,
	};
}

function Row(props: { row: ReturnType<typeof createData> }) {
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
				<TableCell component="th" scope="row">
					{row.firstName}
				</TableCell>
				<TableCell align="right">{row.lastName}</TableCell>
				<TableCell align="right">{row.email}</TableCell>
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
									{row.map((data) => (
                    <></>
									))}
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
				<div className="flex flex-col px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]">
					<div>
						<Tabs
							value={activeTab}
							onChange={handleChange}
							textColor="secondary"
							indicatorColor="secondary"
							aria-label="secondary tabs example"
						>
							<Tab value="one" label="Active" />
							<Tab value="two" label="Inactive" />
							<Tab value="three" label="All" />
						</Tabs>
					</div>
					<div>
						<TableContainer component={Paper}>
							<Table aria-label="collapsible table">
								<TableHead>
									<TableRow>
										<TableCell />
										<TableCell>First Name</TableCell>
										<TableCell align="right">Last Name</TableCell>
										<TableCell align="right">Email</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{users.map((user) => (
										<Row key={user.firstName} row={user} />
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</div>
			)}
		</div>
	);
};

export default UsersPage;
