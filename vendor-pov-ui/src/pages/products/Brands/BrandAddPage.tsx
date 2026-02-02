import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationBanner from "../../../components/common/NotificationBanner/NotificationBanner";
import { create } from "../../../utils/http";

export default function BrandAddPage() {
	const navigate = useNavigate();
	const [notification, setNotification] = useState<{
		message: string;
		type: "success" | "error" | "info";
	} | null>(null);
	const [loading, setLoading] = useState(false);
	const [nameError, setNameError] = useState<string | null>(null);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setNameError(null);
		setLoading(true);

		const formData = new FormData(event.currentTarget);
		const name = formData.get("name")?.toString().trim();
		if (!name) {
			setNameError("Brand name is required.");
			setLoading(false);
			return;
		}
		const body = { name };

		try {
			const response = await create("brands", body);
			setNotification({
				message: `Brand ${response.name} created successfully`,
				type: "success",
			});
			setTimeout(() => navigate("/brands"), 1500);
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
				<h2>Add Brand</h2>
			</div>
			<div className="p-4 sm:p-6 lg:p-8 max-w-3xl border mx-auto">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-8"
					aria-label="Add Brand Form"
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
					<div className="flex gap-4">
						<button
							type="button"
							className="bg-[#5d91b4] text-white px-4 py-2 rounded"
							onClick={() => navigate("/brands")}
							disabled={loading}
							aria-label="Cancel"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-[#00b740] text-white px-4 py-2 rounded"
							disabled={loading}
							aria-label="Add Brand"
						>
							{loading ? "Adding..." : "Add Brand"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
