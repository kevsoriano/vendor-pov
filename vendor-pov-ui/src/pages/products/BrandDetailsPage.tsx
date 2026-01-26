import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotificationBanner from "../../components/common/NotificationBanner/NotificationBanner";
import { deleteResource, get, update } from "../../utils/http";

interface Brand {
	id: string;
	name: string;
}

export default function BrandDetailsPage() {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [brand, setBrand] = useState<Brand | null>(null);
	const [isFetching, setIsFetching] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [notification, setNotification] = useState<{
		message: string;
		type: "success" | "error" | "info";
	} | null>(null);
	const [brandName, setBrandName] = useState("");

	useEffect(() => {
		if (!id) return;
		setIsFetching(true);
		const fetchBrand = async () => {
			try {
				const brand = await get("brands", id);
				setBrand(brand);
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
		fetchBrand();
	}, [id]);

	useEffect(() => {
		if (brand) setBrandName(brand.name);
	}, [brand]);

	function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
		setBrandName(event.target.value);
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsSubmitting(true);
		try {
			const body = {
				name: brandName,
			};
			if (!id) {
				setNotification({
					message: "Brand ID is missing.",
					type: "error",
				});
				return;
			}
			const response = await update("brands", id, body);
			setNotification({
				message: `Brand ${response.name} updated successfully`,
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
			setIsSubmitting(false);
		}
	}

	const handleDelete = async (id: string) => {
		try {
			await deleteResource(`brands`, `${id}`);
			setBrand(null);
			setNotification({
				message: `Brand deleted successfully`,
				type: "success",
			});
			setTimeout(() => navigate("/brands"), 1500);
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
				<h1>Brand</h1>
			</div>
			{notification && (
				<NotificationBanner
					message={notification.message}
					type={notification.type}
					onClose={() => setNotification(null)}
				/>
			)}

			{isFetching && <div>Loading brand…</div>}

			{!isFetching && brand === null && <div>Brand not found.</div>}

			{!isFetching && (
				<div>
					<div className="flex px-4 sm:px-6 lg:px-8 py-6 justify-between">
						<h2>Edit Brand</h2>
					</div>
					<div className="p-4 sm:p-6 lg:p-8 max-w-3xl border mx-auto">
						<form onSubmit={handleSubmit} className="flex flex-col gap-8">
							<FormControl>
								<TextField
									label="Name"
									focused
									name="name"
									value={brandName}
									onChange={handleNameChange}
									disabled={isFetching || isSubmitting}
								/>
							</FormControl>
							<div className="flex gap-4">
								<button
									type="button"
									className="bg-[#5d91b4] text-white px-4 py-2 rounded"
									onClick={() => navigate("/brands")}
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
}
