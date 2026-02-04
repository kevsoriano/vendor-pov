import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import NotificationBanner from "../../../components/common/NotificationBanner/NotificationBanner";
import { create, queryClient } from "../../../utils/http";

export default function SuppliersAddPage() {
	const navigate = useNavigate();

	const { mutate, isPending, isError, error } = useMutation({
		mutationFn: create,
		onSuccess: () => {
			navigate("/suppliers");
			queryClient.invalidateQueries({ queryKey: ["suppliers"] });
		},
	});

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const payload = {
			name: formData.get("name") as string,
			description: formData.get("description") as string,
		};
		mutate({
			path: "suppliers",
			body: payload,
		});
	}

	return (
		<div>
			{isError && <NotificationBanner message={error.message} type="error" onClose={() => {}} />}
			<div className="flex px-4 sm:px-6 lg:px-8 py-6 justify-between">
				<h2>Add Supplier</h2>
			</div>
			<div className="p-4 sm:p-6 lg:p-8 max-w-3xl border mx-auto">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-8"
					aria-label="Add Supplier Form"
				>
					<FormControl>
						<TextField
							label="Name"
							focused
							name="name"
							error={false}
							helperText=""
							aria-required="true"
						/>
					</FormControl>
					<FormControl>
						<TextField
							label="Description"
							focused
							name="description"
							error={false}
							helperText=""
							aria-required="true"
						/>
					</FormControl>
					<div className="flex gap-4">
						<button
							type="button"
							className="bg-[#5d91b4] text-white px-4 py-2 rounded"
							onClick={() => navigate("/suppliers")}
							disabled={isPending}
							aria-label="Cancel"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-[#00b740] text-white px-4 py-2 rounded"
							disabled={isPending}
							aria-label="Add Supplier"
						>
							{isPending ? "Adding..." : "Add Supplier"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
