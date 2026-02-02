import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotificationBanner from "../../components/common/NotificationBanner/NotificationBanner";
import type { Authority, Role } from "../../types/models";
import { deleteResource, get, getAll, update } from "../../utils/http";

const RoleDetailsPage = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [role, setRole] = useState<Role | null>(null);
	const [authorities, setAuthorities] = useState<Authority[]>([]);
	const [selectedAuthorityIds, setSelectedAuthorityIds] = useState<string[]>([]);
	const [roleName, setRoleName] = useState("");
	const [isFetching, setIsFetching] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [notification, setNotification] = useState<{
		message: string;
		type: "success" | "error" | "info";
	} | null>(null);

	useEffect(() => {
		if (!id) return;
		setIsFetching(true);
		const fetchRole = async () => {
			try {
				const role = await get("roles", id);
				const availableAuthorities = await getAll("authorities");
				setRole(role);
				setAuthorities(availableAuthorities);
				setSelectedAuthorityIds(role.authorities.map((a: Authority) => a.id));
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
		fetchRole();
	}, [id]);

	useEffect(() => {
		if (role) setRoleName(role.name);
	}, [role]);

	function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
		setRoleName(event.target.value);
	}

	function handleAuthorityChange(event: React.ChangeEvent<HTMLInputElement>) {
		const id = event.target.value;
		setSelectedAuthorityIds((prev) =>
			event.target.checked ? [...prev, id] : prev.filter((aid) => aid !== id),
		);
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsSubmitting(true);
		try {
			const body = {
				name: roleName,
				authorities: authorities.filter((a) => selectedAuthorityIds.includes(a.id)),
			};
			if (!id) {
				setNotification({
					message: "Role ID is missing.",
					type: "error",
				});
				return;
			}
			const response = await update("roles", id, body);
			setNotification({
				message: `Role ${response.name} updated successfully`,
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
			setIsSubmitting(false);
		}
	}

	const handleDelete = async (id: string) => {
		try {
			await deleteResource(`roles`, `${id}`);
			setRole(null);
			setNotification({
				message: `Role deleted successfully`,
				type: "success",
			});
			setTimeout(() => navigate("/roles"), 1500);
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			setNotification({
				message: msg,
				type: "error",
			});
		}
	};

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

			{isFetching && <div>Loading role…</div>}

			{!isFetching && role === null && <div>Role not found.</div>}

			{!isFetching && (
				<div>
					<div className="flex px-4 sm:px-6 lg:px-8 py-6 justify-between">
						<h2>Edit Role</h2>
					</div>
					<div className="p-4 sm:p-6 lg:p-8 max-w-3xl border mx-auto">
						<form onSubmit={handleSubmit} className="flex flex-col gap-8">
							<FormControl>
								<TextField
									label="Name"
									focused
									name="name"
									value={roleName}
									onChange={handleNameChange}
									disabled={isFetching || isSubmitting}
								/>
							</FormControl>
							<FormGroup>
								<FormLabel component="legend">Grant permissions</FormLabel>
								{authorities.map((authority) => (
									<FormControlLabel
										key={authority.id}
										control={
											<Checkbox
												name="authorities"
												value={authority.id}
												checked={selectedAuthorityIds.includes(authority.id)}
												onChange={handleAuthorityChange}
												disabled={isFetching || isSubmitting}
											/>
										}
										label={authority.name}
									/>
								))}
							</FormGroup>
							<div className="flex gap-4">
								<button
									type="button"
									className="bg-[#5d91b4] text-white px-4 py-2 rounded"
									onClick={() => navigate("/roles")}
									disabled={isFetching || isSubmitting}
								>
									Cancel
								</button>
								<button
									type="submit"
									className="bg-[#00b740] text-white"
									disabled={isFetching || isSubmitting}
								>
									{isSubmitting ? "Saving..." : "Save"}
								</button>
								<button
									type="button"
									className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
									onClick={() => id && handleDelete(id)}
									disabled={isFetching || isSubmitting}
								>
									Delete
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default RoleDetailsPage;
