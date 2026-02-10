import TextField from "@mui/material/TextField";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// Type definitions
import SelectChips, { type AutocompleteOption } from "../../components/common/SelectChips";
import type { AutocompleteSelectOption } from "../../components/common/SelectDropdown";
import AutocompleteSelect from "../../components/common/SelectDropdown";
import type { Outlet, ProductTag, Supplier } from "../../types/models";
import { create, getAll, queryClient } from "../../utils/http";
import type { AttributeRow } from "./components/AttributeInput";
import AttributeInput from "./components/AttributeInput";
import ProductVariantsTable from "./components/ProductVariantsTable";
import OutletsTable from "./OutletsTable";

const PRODUCT_TYPES = ["Standard", "Variant", "Composite"] as const;
type ProductType = (typeof PRODUCT_TYPES)[number];
const PRODUCT_TYPE_DETAILS: { value: ProductType; description: string }[] = [
	{
		value: "Standard",
		description: "A single product with no variants.",
	},
	{
		value: "Variant",
		description: "A product with multiple variants (e.g., size, color).",
	},
	{
		value: "Composite",
		description: "A product composed of other products (bundles, kits).",
	},
];

import type { ProductVariant } from "../../types/models";

const AddProduct: React.FC = () => {
	const [selectedSupplier, setSelectedSupplier] = React.useState<AutocompleteSelectOption | null>(
		null,
	);
	const [selectedProductTags, setSelectedProductTags] = React.useState<AutocompleteOption[]>([]);
	const [attributes, setAttributes] = React.useState<AttributeRow[]>([]);
	const [productType, setProductType] = React.useState<ProductType>("Standard");
	const [productVariants, setProductVariants] = React.useState<ProductVariant[]>([]);
	const navigate = useNavigate();

	const { data: suppliers = [] } = useQuery<Supplier[]>({
		queryKey: ["suppliers"],
		queryFn: () => getAll("suppliers"),
		staleTime: 0,
	});

	const { data: productTags = [] } = useQuery<ProductTag[]>({
		queryKey: ["productTags"],
		queryFn: () => getAll("productTags"),
		staleTime: 0,
	});

	const { data: outlets = [] } = useQuery<Outlet[]>({
		queryKey: ["outlets"],
		queryFn: () => getAll("outlets"),
		staleTime: 0,
	});

	const supplierOptions: AutocompleteSelectOption[] = suppliers.map((supplier) => ({
		id: supplier.id,
		name: supplier.name,
	}));

	const productTagOptions = productTags.map((tag) => ({
		id: tag.id,
		name: tag.name,
	}));

	const { mutate: mutateSupplier } = useMutation({
		mutationFn: create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["suppliers"] });
		},
	});

	const { mutate: mutateProductTag } = useMutation({
		mutationFn: create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["productTags"] });
		},
	});

	const { mutate: mutateProduct } = useMutation({
		mutationFn: create,
		onSuccess: () => {
			navigate("/products");
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});

	const handleCreateSupplier = async (inputValue: string): Promise<AutocompleteSelectOption> => {
		const newSupplier = { name: inputValue, id: Math.random().toString() };
		mutateSupplier({ path: "suppliers", body: newSupplier });
		return newSupplier;
	};

	const handleCreateProductTag = async (inputValue: string): Promise<AutocompleteOption> => {
		const newProductTag = { name: inputValue, id: Math.random().toString() };
		mutateProductTag({ path: "productTags", body: newProductTag });
		return newProductTag;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// handle form submission logic here
		const formData = new FormData(e.currentTarget);
		const name = formData.get("name")?.toString().trim();
		const description = formData.get("description")?.toString().trim();
		// Construct payload for request
		const payload = {
			name,
			description,
			productType,
			productTags: selectedProductTags,
			productAttributes:
				attributes
					.filter((attr) => attr.name && Array.isArray(attr.values) && attr.values.length > 0)
					.flatMap((attr) =>
						attr.values.map((value) => ({
							attributeKey: attr.name,
							attributeValue: value,
						})),
					) || [],
			productVariants: productType === "Standard" ? 
			[{
				"variantSku": formData.get("variantSku")?.toString().trim(),
				"retailPrice": formData.get("price") ? parseFloat(formData.get("price")!.toString()) : undefined,
				"taxRate": formData.get("taxRate") ? parseFloat(formData.get("taxRate")!.toString()) : undefined,
				"productAttributes": [],
				"supplierProductVariants": [
					{
						"supplier": {
							"id": formData.get("supplier")?.toString() || selectedSupplier?.id,
						},  
						"supplierPrice": formData.get("supplierPrice") ? parseFloat(formData.get("supplierPrice")!.toString()) : undefined,
					}
				],
				"inventories": [
					{
						"outlet": {
							"id": formData.get("outlet")?.toString() || outlets[0]?.id,
						},
						"supplier": {
							"id": formData.get("supplier")?.toString() || selectedSupplier?.id,
						},
						"quantity": formData.get("quantity") ? parseInt(formData.get("quantity")!.toString()) : 20,
						"reorderThreshold": formData.get("reorderThreshold") ? parseInt(formData.get("reorderThreshold")!.toString()) : 10,
						"reorderQty": formData.get("reorderQty") ? parseInt(formData.get("reorderQty")!.toString()) : 5
					}
				]
			}] : productVariants,
		};
		mutateProduct({
			path: "products",
			body: payload,
		});
	};

	return (
		<div>
			<div className="px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]">
				<h1>Products</h1>
			</div>

			<div className="flex justify-between px-4 sm:px-6 lg:px-8 py-6 items-center">
				<p>Add, view and edit your products all in one place.</p>
				<div className="flex gap-2">
					<button type="button" className="bg-[#5d91b4] text-white">
						<Link to="/products/add">Cancel</Link>
					</button>
					<button
						type="submit"
						className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Save
					</button>
				</div>
			</div>

			<div className="flex flex-col px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]">
				<form onSubmit={handleSubmit}>
					<div className="flex">
						<div className="w-[35%]">
							<p>General</p>
						</div>
						<div className="flex flex-col w-full">
							<div className="flex flex-col w-full mb-4 text-sm font-medium">
								<TextField
									label="Name"
									name="name"
									id="name"
									placeholder="Enter a product name"
									variant="outlined"
									size="small"
									fullWidth
								/>
							</div>

							<div className="flex flex-col w-full mb-4 text-sm font-medium">
								<TextField
									label="Description"
									name="description"
									id="description"
									placeholder="Enter a product description"
									variant="outlined"
									size="small"
									fullWidth
								/>
							</div>
							<div className="flex flex-col w-full mb-4">
								<SelectChips
									values={selectedProductTags}
									onAdd={(tag) => {
										if (
											tag &&
											!selectedProductTags.some(
												(t) => t.id === tag.id || t.name === tag.name,
											)
										) {
											setSelectedProductTags([...selectedProductTags, tag]);
										}
									}}
									onDelete={(tag) => {
										setSelectedProductTags(
											selectedProductTags.filter((t) => t.id !== tag.id),
										);
									}}
									autocompleteOptions={productTagOptions}
									label="Product Tags"
									maxValues={10}
									onCreateOption={async (inputValue) => {
										const created = await handleCreateProductTag(inputValue);
										// Optionally, you could refresh productTagOptions here if needed
										return created;
									}}
								/>
							</div>

							{/* ProductType selection */}
							<div className="flex flex-col w-full mb-4">
								<fieldset
									className="flex w-full border-0 p-0 m-0"
									id="productType"
									aria-label="Product Type"
									style={{ width: "100%" }}
								>
									{PRODUCT_TYPE_DETAILS.map((typeObj, idx) => (
										<button
											key={typeObj.value}
											type="button"
											id={`productType-${typeObj.value}`}
											className={`flex-1 flex flex-col items-center justify-center px-0 py-4 border text-sm font-medium focus:outline-none transition-all duration-200 shadow-sm
												${
													productType === typeObj.value
														? "bg-gradient-to-b from-indigo-600 to-indigo-500 text-white border-indigo-700 shadow-lg"
														: "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:shadow-md"
												}
          
											`}
											style={{
												margin: 0,
												minWidth: 0,
												minHeight: 110,
												boxShadow:
													productType === typeObj.value
														? "0 4px 16px 0 rgba(99,102,241,0.10)"
														: undefined,
												borderRight:
													idx < PRODUCT_TYPE_DETAILS.length - 1 ? "none" : undefined,
											}}
											aria-pressed={productType === typeObj.value}
											onClick={() => setProductType(typeObj.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ") {
													setProductType(typeObj.value);
												}
											}}
										>
											<span className="font-semibold text-lg tracking-wide mb-1">
												{typeObj.value}
											</span>
											<div
												className={`w-8 h-0.5 my-1 ${productType === typeObj.value ? "bg-white/70" : "bg-gray-300"}`}
											/>
											<span
												className={`text-xs mt-1 text-center transition-colors duration-200 ${productType === typeObj.value ? "text-white" : "text-gray-500"}`}
												style={{ minHeight: 32, display: "flex", alignItems: "center" }}
											>
												{typeObj.description}
											</span>
										</button>
									))}
								</fieldset>
							</div>
							{/* Standard product type fields */}
							{productType === "Standard" && (
								<>
									<div className="mb-4">
										<TextField
											label="Variant SKU"
											name="variantSku"
											id="variantSku"
											placeholder="Enter a variant SKU"
											variant="outlined"
											fullWidth
										/>
									</div>

									<div className="flex flex-grow w-full mb-4 gap-4">
										<div className="flex-1">
											<AutocompleteSelect
												options={supplierOptions}
												resource={selectedSupplier}
												onChange={(option: AutocompleteSelectOption | null) => {
													setSelectedSupplier(option);
												}}
												placeholder="Select or create a supplier"
												onCreateOption={handleCreateSupplier}
												label={"Supplier"}
											/>
										</div>
										<div className="flex-1">
											<TextField
												label="Supplier Code"
												name="supplierCode"
												id="supplierCode"
												placeholder="Enter a supplier code"
												variant="outlined"
												fullWidth
											/>
										</div>
										<div className="flex-1">
											<TextField
												label="Supplier Price"
												name="supplierPrice"
												id="supplierPrice"
												placeholder="Enter a supplier price"
												variant="outlined"
												fullWidth
												type="number"
												InputProps={{
													startAdornment: <span style={{ marginRight: 4 }}>$</span>,
													inputMode: "numeric",
												}}
												inputProps={{
													style: {
														MozAppearance: "textfield",
														textAlign: "right",
													},
													className: "no-spinner",
													step: "0.01",
												}}
												onChange={(e) => {
													const value = e.target.value;
													const formatted = value.includes(".")
														? value.replace(/^(\d+\.\d{0,2}).*$/, "$1")
														: value;
													e.target.value = formatted;
												}}
											/>
										</div>
									</div>

									<div className="mb-6">
										<OutletsTable outlets={outlets} />
									</div>

									<div className="mb-4">
										<TextField
											label="Tax Rate"
											name="taxRate"
											id="taxRate"
											placeholder="Enter a tax rate"
											variant="outlined"
											fullWidth
										/>
									</div>

									<div className="mb-4">
										<TextField
											label="Price"
											name="price"
											id="price"
											placeholder="Enter a price"
											variant="outlined"
											fullWidth
										/>
									</div>
								</>
							)}
						</div>
					</div>
					{/* AttributeInput and ProductVariantsTable only for Variant */}
					{productType === "Variant" && (
						<div className="px-4 sm:px-6 lg:px-8 py-4">
							<AttributeInput value={attributes} onChange={setAttributes} />
							<ProductVariantsTable
								attributes={attributes}
								header={attributes.map((attr) => attr.name)}
								onVariantsChange={setProductVariants}
							/>
						</div>
					)}
					<div>
						<button type="submit">Save</button>
						<button type="button">Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddProduct;
