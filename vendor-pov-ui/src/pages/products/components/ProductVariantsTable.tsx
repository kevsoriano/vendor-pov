import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
	Box,
	Checkbox,
	Collapse,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";

import type { AttributeRow } from "./AttributeInput";

interface VariantRow {
	id: string;
	values: string[];
	variantSku: string;
	supplierPrice: string;
	retailPrice: string;
}

import type { ProductVariant } from "../../../types/models";

interface ProductVariantsTableProps {
	attributes: AttributeRow[];
	header?: string[];
	onVariantsChange?: (variants: ProductVariant[]) => void;
}

const normalizeAttributes = (attributes: AttributeRow[]) =>
	attributes
		.map((attr) => ({
			...attr,
			name: attr.name.trim(),
			values: attr.values.map((value) => value.trim()).filter(Boolean),
		}))
		.filter((attr) => attr.name.length > 0 && attr.values.length > 0);

const buildProductVariants = (attributes: AttributeRow[]): ProductVariant[] => {
	const normalized = normalizeAttributes(attributes);
	if (normalized.length === 0) return [];

	const combinations = normalized.reduce<string[][]>((acc, attr) => {
		if (acc.length === 0) {
			return attr.values.map((value) => [value]);
		}
		return acc.flatMap((prev) => attr.values.map((value) => [...prev, value]));
	}, []);

	return combinations.map((values, index) => ({
		id: `${index + 1}`,
		variantSku: "",
		supplierPrice: "",
		retailPrice: "",
		productAttributes: normalized.map((attr, i) => ({
			id: `${index + 1}-${i}`,
			attributeKey: attr.name,
			attributeValue: values[i] || "",
		})),
	}));
};

import React from "react";

interface RowProps {
	row: VariantRow;
	columns: string[];
	index: number;
	onSkuChange: (id: string, newSku: string) => void;
	onSupplierPriceChange: (id: string, newPrice: string) => void;
	onRetailPriceChange: (id: string, newPrice: string) => void;
}

const ExpandableRow: React.FC<RowProps> = ({
	row,
	columns,
	index,
	onSkuChange,
	onSupplierPriceChange,
	onRetailPriceChange,
}) => {
	const [open, setOpen] = React.useState(false);
	const [checked, setChecked] = React.useState(false);
	const theme = useTheme();
	return (
		<React.Fragment>
			<TableRow
				hover
				sx={{
					"& > *": { borderBottom: "unset" },
					background: index % 2 === 0 ? theme.palette.action.hover : undefined,
				}}
			>
				<TableCell align="center" sx={{ width: 48 }}>
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell align="center" sx={{ width: 48 }}>
					<Checkbox
						checked={checked}
						onChange={(e) => setChecked(e.target.checked)}
						inputProps={{ "aria-label": "select variant" }}
						size="small"
					/>
				</TableCell>
				<TableCell
					align="center"
					sx={{ fontFamily: "monospace", fontSize: 15, fontWeight: 500, width: 120 }}
				>
					<TextField
						variant="standard"
						value={row.variantSku}
						onChange={(e) => onSkuChange(row.id, e.target.value)}
						inputProps={{
							style: { textAlign: "center", fontFamily: "monospace", fontSize: 15 },
						}}
						placeholder="SKU"
					/>
				</TableCell>
				<TableCell align="center" sx={{ fontFamily: "monospace", fontSize: 15, width: 120 }}>
					<TextField
						variant="standard"
						value={row.supplierPrice}
						onChange={(e) => onSupplierPriceChange(row.id, e.target.value)}
						inputProps={{
							style: { textAlign: "center", fontFamily: "monospace", fontSize: 15 },
						}}
						placeholder="Supplier Price"
						type="number"
					/>
				</TableCell>
				<TableCell align="center" sx={{ fontFamily: "monospace", fontSize: 15, width: 120 }}>
					<TextField
						variant="standard"
						value={row.retailPrice}
						onChange={(e) => onRetailPriceChange(row.id, e.target.value)}
						inputProps={{
							style: { textAlign: "center", fontFamily: "monospace", fontSize: 15 },
						}}
						placeholder="Retail Price"
						type="number"
					/>
				</TableCell>
				{row.values.map((value, idx) => (
					<TableCell
						key={`${row.id}-${idx}`}
						align="center"
						sx={{ fontFamily: "monospace", fontSize: 15 }}
					>
						{value}
					</TableCell>
				))}
				<TableCell align="center" sx={{ width: 80, p: 0 }}>
					<Box
						sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5 }}
					>
						<IconButton size="small" color="primary" aria-label="edit variant">
							<EditIcon fontSize="small" />
						</IconButton>
						<IconButton size="small" color="error" aria-label="delete variant">
							<DeleteIcon fontSize="small" />
						</IconButton>
					</Box>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box
							sx={{
								margin: 2,
								background: theme.palette.background.default,
								borderRadius: 1,
								p: 2,
							}}
						>
							<Typography variant="subtitle2" gutterBottom>
								Variant Details
							</Typography>
							{/* Placeholder for additional info, e.g. SKU, price, inventory, etc. */}
							<Typography variant="body2" color="text.secondary">
								Add more details for this variant here.
							</Typography>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
};

const ProductVariantsTable: React.FC<ProductVariantsTableProps> = ({
	attributes,
	header,
	onVariantsChange,
}) => {
	const normalized = normalizeAttributes(attributes);
	const [variants, setVariants] = React.useState<ProductVariant[]>(() =>
		buildProductVariants(attributes),
	);

	React.useEffect(() => {
		const newVariants = buildProductVariants(attributes);
		setVariants(newVariants);
	}, [attributes]);

	React.useEffect(() => {
		if (onVariantsChange) {
			// Remove extra fields before calling onVariantsChange
			onVariantsChange(variants.map(({ supplierPrice, retailPrice, ...rest }) => rest));
		}
	}, [onVariantsChange, variants]);

	const handleSkuChange = (id: string, newSku: string) => {
		setVariants((prev) =>
			prev.map((variant) => (variant.id === id ? { ...variant, variantSku: newSku } : variant)),
		);
	};
	const handleSupplierPriceChange = (id: string, newPrice: string) => {
		setVariants((prev) =>
			prev.map((variant) =>
				variant.id === id ? { ...variant, supplierPrice: newPrice } : variant,
			),
		);
	};
	const handleRetailPriceChange = (id: string, newPrice: string) => {
		setVariants((prev) =>
			prev.map((variant) =>
				variant.id === id ? { ...variant, retailPrice: newPrice } : variant,
			),
		);
	};

	// Use header prop if provided, otherwise use attribute names
	const columnHeaders =
		header && header.length === normalized.length ? header : normalized.map((attr) => attr.name);

	if (normalized.length === 0) {
		return (
			<Box sx={{ mt: 2 }}>
				<Typography variant="body2" color="text.secondary">
					Add attribute names and values to generate product variants.
				</Typography>
			</Box>
		);
	}

	return (
		<TableContainer component={Paper} sx={{ mt: 2, borderRadius: 3, boxShadow: 3 }}>
			<Table size="small" aria-label="product variants table">
				<TableHead>
					<TableRow sx={{ background: (theme) => theme.palette.grey[100] }}>
						<TableCell align="center" sx={{ width: 48 }}></TableCell>
						<TableCell align="center" sx={{ width: 48, fontWeight: 700 }}>
							{/* Checkbox header */}
							<Checkbox size="small" disabled />
						</TableCell>
						{columnHeaders.map((col) => (
							<TableCell
								key={`${col}-${Date.now()}`}
								align="center"
								sx={{ fontWeight: 700 }}
							>
								{col}
							</TableCell>
						))}
						<TableCell align="center" sx={{ fontWeight: 700, width: 120 }}>
							SKU
						</TableCell>
						<TableCell align="center" sx={{ fontWeight: 700, width: 120 }}>
							Supplier Price
						</TableCell>
						<TableCell align="center" sx={{ fontWeight: 700, width: 120 }}>
							Retail Price
						</TableCell>
						<TableCell align="center" sx={{ width: 120, fontWeight: 700 }}>
							Actions
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{variants.map((variant, idx) => (
						<ExpandableRow
							key={variant.id}
							row={{
								id: variant.id,
								values: variant.productAttributes.map((attr) => attr.attributeValue),
								variantSku: variant.variantSku,
								supplierPrice: variant.supplierPrice || "",
								retailPrice: variant.retailPrice || "",
							}}
							columns={columnHeaders}
							index={idx}
							onSkuChange={handleSkuChange}
							onSupplierPriceChange={handleSupplierPriceChange}
							onRetailPriceChange={handleRetailPriceChange}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ProductVariantsTable;
