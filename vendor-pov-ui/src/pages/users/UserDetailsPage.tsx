import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotificationBanner from "../../components/common/NotificationBanner/NotificationBanner";
import { get, getAll, update } from "../../utils/http";
import type { CreatableSelectOption } from "./UserAddPage";

interface Role {
	id: string;
	name: string;
}

interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	dailyTarget: number;
	weeklyTarget: number;
	monthlyTarget: number;
	currency: string;
	addresses: {
		id: string;
		addressLine1: string;
		addressLine2: string;
		city: string;
		country: string;
		postalCode: string;
	}[];
	roles: Role[];
}

const UserDetailsPage = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [roles, setRoles] = useState<Role[]>([]);
	const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);
	const [isFetching, setIsFetching] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [notification, setNotification] = useState<{
		message: string;
		type: "success" | "error" | "info";
	} | null>(null);
	// Controlled form state
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [dailyTarget, setDailyTarget] = useState(0);
	const [weeklyTarget, setWeeklyTarget] = useState(0);
	const [monthlyTarget, setMonthlyTarget] = useState(0);
	const [currency, setCurrency] = useState<string | null>(null);
	const [addresses, setAddresses] = useState<User["addresses"]>([]);

	const currencyOptions: CreatableSelectOption[] = [
		{ id: "USD", name: "USD" },
		{ id: "EUR", name: "EUR" },
		{ id: "JPY", name: "JPY" },
		{ id: "PHP", name: "PHP" },
		{ id: "GBP", name: "GBP" },
		// ...add more as needed
	];
	const countryOptions: CreatableSelectOption[] = [
		{ id: "US", name: "United States" },
		{ id: "PH", name: "Philippines" },
		{ id: "GB", name: "United Kingdom" },
		{ id: "JP", name: "Japan" },
		{ id: "DE", name: "Germany" },
		// ...add more as needed
	];

	useEffect(() => {
		if (!id) return;
		setIsFetching(true);
		const fetchUser = async () => {
			try {
				const user = await get("users", id);
				const availableRoles = await getAll("roles");
				setRoles(availableRoles);
				setSelectedRoleIds(user.roles.map((r: Role) => r.id));
				setFirstName(user.firstName || "");
				setLastName(user.lastName || "");
				setEmail(user.email || "");
				setDailyTarget(user.dailyTarget || 0);
				setWeeklyTarget(user.weeklyTarget || 0);
				setMonthlyTarget(user.monthlyTarget || 0);
				setCurrency(user.currency ? user.currency : null);
				setAddresses(user.addresses || []);
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
		fetchUser();
	}, [id]);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsSubmitting(true);
		try {
			if (!id) {
				setNotification({
					message: "User ID is missing.",
					type: "error",
				});
				return;
			}
			const body = {
				firstName,
				lastName,
				dailyTarget,
				weeklyTarget,
				monthlyTarget,
				currency: currency || "",
				addresses: addresses.map((a) => ({ ...a, country: a.country })),
				roles: roles.filter((r) => selectedRoleIds.includes(r.id)),
			};
			const response = await update("users", id, body);
			setNotification({
				message: `User ${response.name} updated successfully`,
				type: "success",
			});
			setTimeout(() => navigate("/users"), 1500);
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			setNotification({
				message: msg,
				type: "error",
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div>
			<div className="px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]">
				<h1>Users</h1>
			</div>
			{notification && (
				<NotificationBanner
					message={notification.message}
					type={notification.type}
					onClose={() => setNotification(null)}
				/>
			)}

			{isFetching && <div>Loading user…</div>}

			{/* {!isFetching && user === null && <div>User not found.</div>} */}

			{!isFetching && (
				<div>
					<div className="flex px-4 sm:px-6 lg:px-8 py-6 justify-between">
						<h2>Edit User</h2>
					</div>
					<div className="p-4 sm:p-6 lg:p-8 max-w-3xl border mx-auto">
						<form onSubmit={handleSubmit} className="flex flex-col gap-8">
							<Typography variant="h6" component="h2">
								Your Personal Details
							</Typography>
							<Stack
								direction="row"
								spacing={2}
								alignItems="center"
								useFlexGap
								flexWrap="wrap"
								sx={{ width: "100%" }}
							>
								<FormControl sx={{ flexGrow: 1 }}>
									<TextField
										label="First Name"
										name="firstName"
										type="text"
										fullWidth
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</FormControl>
								<FormControl sx={{ flexGrow: 1 }}>
									<TextField
										label="Last Name"
										name="lastName"
										type="text"
										fullWidth
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>
								</FormControl>
							</Stack>

							<FormControl>
								<TextField
									label="Email"
									name="email"
									aria-required="true"
									type="email"
									value={email}
									disabled
								/>
							</FormControl>

							<Stack
								direction="row"
								spacing={2}
								alignItems="center"
								useFlexGap
								flexWrap="wrap"
								sx={{ width: "100%" }}
							>
								<FormControl sx={{ flexGrow: 1 }}>
									<TextField
										label="Daily Target"
										name="dailyTarget"
										type="number"
										fullWidth
										value={dailyTarget}
										onChange={(e) => setDailyTarget(Number(e.target.value))}
									/>
								</FormControl>
								<FormControl sx={{ flexGrow: 1 }}>
									<TextField
										label="Weekly Target"
										name="weeklyTarget"
										type="number"
										fullWidth
										value={weeklyTarget}
										onChange={(e) => setWeeklyTarget(Number(e.target.value))}
									/>
								</FormControl>
								<FormControl sx={{ flexGrow: 1 }}>
									<TextField
										label="Monthly Target"
										name="monthlyTarget"
										type="number"
										fullWidth
										value={monthlyTarget}
										onChange={(e) => setMonthlyTarget(Number(e.target.value))}
									/>
								</FormControl>
								<FormControl sx={{ flexGrow: 1 }} fullWidth>
									<InputLabel id="currency-label">Currency</InputLabel>
									<Select
										labelId="currency-label"
										id="currency-select"
										value={currency || ""}
										label="Currency"
										onChange={(e) => {
											const selected =
												currencyOptions.find(
													(option) => option.name === e.target.value,
												) || null;
											setCurrency(selected?.name ?? null);
										}}
									>
										{currencyOptions.map((option) => (
											<MenuItem key={option.name} value={option.name}>
												{option.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Stack>

							<FormGroup>
								<FormLabel component="legend">Assign Roles</FormLabel>
								{roles.map((role) => (
									<FormControlLabel
										key={role.id}
										control={
											<Checkbox
												name="roles"
												value={role.id}
												checked={selectedRoleIds.includes(role.id)}
												onChange={(e) => {
													const checked = e.target.checked;
													setSelectedRoleIds((prev) =>
														checked
															? [...prev, role.id]
															: prev.filter((id) => id !== role.id),
													);
												}}
											/>
										}
										label={role.name}
									/>
								))}
							</FormGroup>

							<Stack spacing={2}>
								<Typography variant="h6" component="h2">
									Addresses
								</Typography>
								{addresses.map((address, index) => (
									<Stack key={address.id} spacing={2}>
										<Typography variant="subtitle1" component="h3">
											Address {index + 1}
										</Typography>
										<FormControl sx={{ flexGrow: 1 }}>
											<TextField
												label="Address Line 1"
												name="addressLine1"
												type="text"
												value={address.addressLine1}
												onChange={(e) => {
													const value = e.target.value;
													setAddresses((prev) =>
														prev.map((a, i) =>
															i === index ? { ...a, addressLine1: value } : a,
														),
													);
												}}
											/>
										</FormControl>
										<FormControl sx={{ flexGrow: 1 }}>
											<TextField
												label="Address Line 2"
												name="addressLine2"
												type="text"
												value={address.addressLine2}
												onChange={(e) => {
													const value = e.target.value;
													setAddresses((prev) =>
														prev.map((a, i) =>
															i === index ? { ...a, addressLine2: value } : a,
														),
													);
												}}
											/>
										</FormControl>
										<Stack
											direction="row"
											spacing={2}
											alignItems="center"
											useFlexGap
											flexWrap="wrap"
											sx={{ width: "100%" }}
										>
											<FormControl sx={{ flexGrow: 1 }}>
												<TextField
													label="City"
													name="city"
													type="text"
													fullWidth
													value={address.city}
													onChange={(e) => {
														const value = e.target.value;
														setAddresses((prev) =>
															prev.map((a, i) =>
																i === index ? { ...a, city: value } : a,
															),
														);
													}}
												/>
											</FormControl>
											<FormControl sx={{ flexGrow: 1 }}>
												<FormControl fullWidth>
													<InputLabel id={`country-label-${index}`}>
														Country
													</InputLabel>
													<Select
														labelId={`country-label-${index}`}
														id={`country-select-${index}`}
														value={address.country || ""}
														label="Country"
														onChange={(e) => {
															const value = e.target.value;
															setAddresses((prev) =>
																prev.map((a, i) =>
																	i === index ? { ...a, country: value } : a,
																),
															);
														}}
													>
														{countryOptions.map((option) => (
															<MenuItem key={option.name} value={option.name}>
																{option.name}
															</MenuItem>
														))}
													</Select>
												</FormControl>
											</FormControl>
											<FormControl sx={{ flexGrow: 1 }}>
												<TextField
													label="Postal Code"
													name="postalCode"
													type="text"
													fullWidth
													value={address.postalCode}
													onChange={(e) => {
														const value = e.target.value;
														setAddresses((prev) =>
															prev.map((a, i) =>
																i === index ? { ...a, postalCode: value } : a,
															),
														);
													}}
												/>
											</FormControl>
										</Stack>
									</Stack>
								))}
							</Stack>
							<div className="flex gap-4">
								<button
									type="button"
									className="bg-[#5d91b4] text-white px-4 py-2 rounded"
									onClick={() => navigate("/users")}
									disabled={isFetching || isSubmitting}
								>
									Cancel
								</button>
								<button
									type="submit"
									className="bg-[#00b740] text-white px-4 py-2 rounded"
									disabled={isFetching || isSubmitting}
								>
									{isSubmitting ? "Saving..." : "Save"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserDetailsPage;
