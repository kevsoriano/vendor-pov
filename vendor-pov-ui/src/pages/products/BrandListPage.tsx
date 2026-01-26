import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationBanner from "../../components/common/NotificationBanner/NotificationBanner";
import ResourceTable from "../../components/common/ResourceTable";
import { getAll } from "../../utils/http";

interface Brand {
	id: string;
	name: string;
	productCount: number;
}

function Row(props: { row: Brand }) {
	const { row } = props;
	const navigate = useNavigate();

	return (
		<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
			<TableCell component="th" scope="row" align="center">
				<Button onClick={() => navigate(`/brands/${row.id}/edit`)}>{row.name}</Button>
			</TableCell>
			<TableCell component="th" scope="row" align="center">
				<Button onClick={() => navigate(`/brands/${row.id}/members`)}>
					{row.productCount}
				</Button>
			</TableCell>
		</TableRow>
	);
}
export default function BrandListPage() {
	const navigate = useNavigate();
	const [brands, setBrands] = useState<Brand[]>([]);
	const [isFetching, setIsFetching] = useState(false);
	const [notification, setNotification] = useState<{
		message: string;
		type: "success" | "error" | "info";
	} | null>(null);

	useEffect(() => {
		setIsFetching(true);
		const fetchBrands = async () => {
			try {
				const response = await getAll("brands/product-count");
				setBrands(response);
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
		fetchBrands();
	}, []);

	return (
		<div>
			<div className="px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]">
				<h1>Brands</h1>
			</div>
			<div className="flex justify-between px-4 sm:px-6 lg:px-8 py-6 items-center">
				<p>Add, view and edit your brands all in one place.</p>
				<div className="flex gap-2">
					<button type="button" className="bg-[#5d91b4] text-white">
						Import
					</button>
					<button
						type="button"
						className="bg-[#00b740] text-white px-4 py-2 rounded"
						onClick={() => navigate("/brands/add")}
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

			{isFetching && <div>Loading brands…</div>}

			{!isFetching && brands.length === 0 && <div>No brands found.</div>}

			{!isFetching && brands.length > 0 && (
				<ResourceTable
					headers={["Name", "Product Count"]}
					items={brands}
					renderRow={(brand) => <Row key={brand.name} row={brand} />}
					isActionsAvailable={false}
				></ResourceTable>
			)}
		</div>
	);
}
