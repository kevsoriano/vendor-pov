import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export interface CreatableSelectOption {
	id: string;
	name: string;
}

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import NotificationBanner from "../../components/common/NotificationBanner/NotificationBanner";
import { create, getAll } from "../../utils/http";

interface Role {
	id: string;
	name: string;
}

export default function UserAddPage() {
	const navigate = useNavigate();
	const [roles, setRoles] = useState<Role[]>([]);
	// Static lists for demo; TODO: replace with dynamic data
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
	const [notification, setNotification] = useState<{
		message: string;
		type: "success" | "error" | "info";
	} | null>(null);
	const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordErrors, setPasswordErrors] = useState<{ [key: string]: string }>({});
	const [currency, setCurrency] = useState<CreatableSelectOption | null>(null);
	const [country, setCountry] = useState<CreatableSelectOption | null>(null);

	useEffect(() => {
		const fetchRoles = async () => {
			try {
				const response: Role[] = await getAll("roles");
				setRoles(response);
			} catch (error) {
				const msg = error instanceof Error ? error.message : String(error);
				setNotification({
					message: msg,
					type: "error",
				});
			}
		};
		fetchRoles();
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const errors: { [key: string]: string } = {};

		// Validate password
		if (!password) {
			errors.password = "Password is required";
		} else if (password.length < 8) {
			errors.password = "Password must be at least 8 characters";
		}

		// Validate confirm password
		if (!confirmPassword) {
			errors.confirmPassword = "Confirm Password is required";
		} else if (password !== confirmPassword) {
			errors.confirmPassword = "Passwords do not match";
		}

		setPasswordErrors(errors);

		// If there are errors, don't submit
		if (Object.keys(errors).length > 0) {
			setNotification({
				message: "Please fix the password errors",
				type: "error",
			});
			return;
		}

		setLoading(true);

		const formData = new FormData(event.currentTarget);
		const firstName = formData.get("firstName")?.toString().trim();
		const lastName = formData.get("lastName")?.toString().trim();
		const email = formData.get("email")?.toString().trim();
		const passwordValue = formData.get("password")?.toString();
		const dailyTarget = Number(formData.get("dailyTarget"));
		const weeklyTarget = Number(formData.get("weeklyTarget"));
		const monthlyTarget = Number(formData.get("monthlyTarget"));
		const addressLine1 = formData.get("addressLine1")?.toString().trim();
		const addressLine2 = formData.get("addressLine2")?.toString().trim();
		const city = formData.get("city")?.toString().trim();
		const postalCode = Number(formData.get("postalCode"));

		const selectedIds = formData.getAll("roles");
		const selectedRoles = roles.filter((r) => selectedIds.includes(r.id));
		const body = {
			firstName,
			lastName,
			email,
			password: passwordValue,
			dailyTarget,
			weeklyTarget,
			monthlyTarget,
			currency: currency?.name,
			addresses: [
				{
					city,
					country: country?.name,
					addressLine1,
					addressLine2,
					postalCode,
					type: "RESIDENTIAL",
				},
			],
			roles: selectedRoles,
		};

		try {
			const response = await create("users", body);
			setNotification({
				message: `User ${response.name} created successfully`,
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
			setLoading(false);
		}
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
			<div className="flex px-4 sm:px-6 lg:px-8 py-6 justify-between">
				<h2>Add Users</h2>
			</div>
			<div
				className="p-4 sm:p-6 lg:p-8 max-w-5xl border mx-auto"
				style={{ backgroundColor: "white" }}
			>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-8"
					aria-label="Add User Form"
				>
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
							<TextField label="First Name" name="firstName" type="text" fullWidth />
						</FormControl>
						<FormControl sx={{ flexGrow: 1 }}>
							<TextField label="Last Name" name="lastName" type="text" fullWidth />
						</FormControl>
					</Stack>
					<FormControl>
						<TextField label="Email" name="email" aria-required="true" type="email" />
					</FormControl>
					<Stack
						direction="row"
						spacing={2}
						alignItems="center"
						useFlexGap
						flexWrap="wrap"
						sx={{ width: "100%" }}
					>
						<FormControl sx={{ flexGrow: 1 }} error={!!passwordErrors.password}>
							<TextField
								label="Password"
								name="password"
								aria-required="true"
								type="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									setPasswordErrors({ ...passwordErrors, password: "" });
								}}
								helperText={passwordErrors.password || " "}
								fullWidth
							/>
						</FormControl>
						<FormControl sx={{ flexGrow: 1 }} error={!!passwordErrors.confirmPassword}>
							<TextField
								label="Confirm Password"
								name="confirmPassword"
								aria-required="true"
								type="password"
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value);
									setPasswordErrors({ ...passwordErrors, confirmPassword: "" });
								}}
								helperText={passwordErrors.confirmPassword || " "}
								fullWidth
							/>
						</FormControl>
					</Stack>

					<Stack
						direction="row"
						spacing={2}
						alignItems="center"
						useFlexGap
						flexWrap="wrap"
						sx={{ width: "100%" }}
					>
						<FormControl sx={{ flexGrow: 1 }}>
							<TextField label="Daily Target" name="dailyTarget" type="number" fullWidth />
						</FormControl>
						<FormControl sx={{ flexGrow: 1 }}>
							<TextField label="Weekly Target" name="weeklyTarget" type="number" fullWidth />
						</FormControl>
						<FormControl sx={{ flexGrow: 1 }}>
							<TextField
								label="Monthly Target"
								name="monthlyTarget"
								type="number"
								fullWidth
							/>
						</FormControl>
						<FormControl sx={{ flexGrow: 1 }}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Currency</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={currency?.name || ""}
									label="Currency"
									onChange={(e) => {
										const selected =
											currencyOptions.find((option) => option.name === e.target.value) ||
											null;
										setCurrency(selected);
									}}
								>
									{currencyOptions.map((option) => (
										<MenuItem key={option.name} value={option.name}>
											{option.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</FormControl>
					</Stack>

					<FormGroup>
						<FormLabel component="legend">Assign Roles</FormLabel>
						{roles.map((role) => (
							<FormControlLabel
								key={role.id}
								control={<Checkbox name="roles" value={role.id} />}
								label={role.name}
							/>
						))}
					</FormGroup>

					<Stack spacing={2}>
						<Typography variant="h6" component="h2">
							Your Residential Address
						</Typography>
						<FormControl sx={{ flexGrow: 1 }}>
							<TextField label="Address Line 1" name="addressLine1" type="text" />
						</FormControl>
						<FormControl sx={{ flexGrow: 1 }}>
							<TextField label="Address Line 2" name="addressLine2" type="text" />
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
								<TextField label="City" name="city" type="text" fullWidth />
							</FormControl>
							<FormControl sx={{ flexGrow: 1 }}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Country</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={country?.name || ""}
										label="Country"
										onChange={(e) => {
											const selected =
												countryOptions.find(
													(option) => option.name === e.target.value,
												) || null;
											setCountry(selected);
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
								<TextField label="Postal Code" name="postalCode" type="text" fullWidth />
							</FormControl>
						</Stack>
					</Stack>

					<div className="flex gap-4">
						<button
							type="button"
							className="bg-[#5d91b4] text-white px-4 py-2 rounded"
							onClick={() => navigate("/users")}
							disabled={loading}
							aria-label="Cancel"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-[#00b740] text-white px-4 py-2 rounded"
							disabled={loading}
							aria-label="Add User"
						>
							{loading ? "Adding..." : "Add User"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
