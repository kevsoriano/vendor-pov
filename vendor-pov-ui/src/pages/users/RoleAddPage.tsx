import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationBanner from "../../components/common/NotificationBanner/NotificationBanner";
import { create, getAll } from "../../utils/http";

interface Authority {
	id: string;
	name: string;
}

export default function RoleAddPage() {
	const navigate = useNavigate();
	const [authorities, setAuthorities] = useState<Authority[]>([]);
	const [notification, setNotification] = useState<{
		message: string;
		type: "success" | "error" | "info";
	} | null>(null);
	const [loading, setLoading] = useState(false);
	const [nameError, setNameError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAuthorities = async () => {
			try {
				const response: Authority[] = await getAll("authorities");
				setAuthorities(response);
			} catch (error) {
				const msg = error instanceof Error ? error.message : String(error);
				setNotification({
					message: msg,
					type: "error",
				});
			}
		};
		fetchAuthorities();
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setNameError(null);
		setLoading(true);

		const formData = new FormData(event.currentTarget);
		const name = formData.get("name")?.toString().trim();
		if (!name) {
			setNameError("Role name is required.");
			setLoading(false);
			return;
		}
		const selectedIds = formData.getAll("authorities");
		const selectedAuthorities = authorities.filter((a) => selectedIds.includes(a.id));
		const body = { name, authorities: selectedAuthorities };

		try {
			const response = await create("roles", body);
			setNotification({
				message: `Role ${response.name} created successfully`,
				type: "success",
			});
			setTimeout(() => navigate("/roles"), 1500);
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
				<h2>Add Roles</h2>
			</div>
			<div className="p-4 sm:p-6 lg:p-8 max-w-3xl border mx-auto">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-8"
					aria-label="Add Role Form"
				>
					<FormControl>
						<TextField
							label="Name"
							focused
							name="name"
							error={!!nameError}
							helperText={nameError}
							aria-required="true"
						/>
					</FormControl>
					<FormGroup>
						<FormLabel component="legend">Grant permissions</FormLabel>
						{authorities.map((authority) => (
							<FormControlLabel
								key={authority.id}
								control={<Checkbox name="authorities" value={authority.id} />}
								label={authority.name}
							/>
						))}
					</FormGroup>
					<div className="flex gap-4">
						<button
							type="button"
							className="bg-[#5d91b4] text-white px-4 py-2 rounded"
							onClick={() => navigate("/roles")}
							disabled={loading}
							aria-label="Cancel"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-[#00b740] text-white px-4 py-2 rounded"
							disabled={loading}
							aria-label="Add Role"
						>
							{loading ? "Adding..." : "Add Role"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
