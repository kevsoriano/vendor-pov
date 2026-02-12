import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationBanner from "../../components/common/NotificationBanner/NotificationBanner";
import ResourceTable from "../../components/common/ResourceTable";
import type { Product } from "../../types/models";
import { getAll } from "../../utils/http";

function rowData(name: string, description?: string) {
	return {
		name,
		description,
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
					{row.name}
				</TableCell>
				<TableCell align="center">{row.description ?? "—"}</TableCell>
				<TableCell align="center">
					<Button>
						<EditIcon />
					</Button>
					<Button>
						<DeleteIcon />
					</Button>
				</TableCell>
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
									<span>Hello</span>
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow> */}
		</Fragment>
	);
}

const Products = () => {
	const navigate = useNavigate();

	const {
		data: products = [],
		isPending,
		isError,
		error,
	} = useQuery<Product[]>({
		queryKey: ["products"],
		queryFn: () => getAll("products"),
		staleTime: 0,
		// gcTime: 30000,
	});

	console.log(products);

	return (
		<div>
			<div className="px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]">
				<h1>Products</h1>
			</div>
			<div className="flex justify-between px-4 sm:px-6 lg:px-8 py-6 items-center">
				<p>Add, view and edit your products all in one place.</p>
				<div className="flex gap-2">
					<button type="button" className="bg-[#5d91b4] text-white">
						Import
					</button>
					<button
						type="button"
						className="bg-[#00b740] text-white px-4 py-2 rounded"
						onClick={() => navigate("/products/add")}
					>
						Add
					</button>
				</div>
			</div>

			{isError && (
				<NotificationBanner
					message={error instanceof Error ? error.message : "Failed to load"}
					type="error"
					onClose={() => {}} // Usually managed via query invalidation or local state if needed
				/>
			)}

			{isPending && <div>Loading products...</div>}

			{!isPending && products.length === 0 && <div>No products found.</div>}

			{!isPending && products.length > 0 && (
				<ResourceTable
					headers={["", "Name", "Product Description"]}
					items={products}
					renderRow={(product) => (
						<Row
							key={product.id}
							row={rowData(product.name, product.description)}
						/>
					)}
					isActionsAvailable={true}
				/>
			)}
		</div>
	);
};

export default Products;
