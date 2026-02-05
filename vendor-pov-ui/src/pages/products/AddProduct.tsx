import TextField from "@mui/material/TextField";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AutocompleteSelect, {
	type AutocompleteSelectOption,
} from "../../components/common/AutocompleteSelect";
import type { ProductTag, Supplier } from "../../types/models";
import { create, getAll, queryClient } from "../../utils/http";
import AttributeInput from "./components/AttributeInput";

const AddProduct = () => {
	const navigate = useNavigate();
	const { data: suppliers = [] } = useQuery<Supplier[]>({
		queryKey: ["suppliers"],
		queryFn: () => getAll("suppliers"),
		staleTime: 0,
		// gcTime: 30000,
	});

	const { data: productTags = [] } = useQuery<ProductTag[]>({
		queryKey: ["productTags"],
		queryFn: () => getAll("productTags"),
		staleTime: 0,
		// gcTime: 30000,
	});

	const handleSubmit = (formData: FormData) => {
		const name = formData.get("name");
		const description = formData.get("description");
		console.log(name, description);
	};

	const supplierOptions: AutocompleteSelectOption[] = suppliers.map((supplier) => ({
		id: supplier.id,
		name: supplier.name,
	}));

	const productTagOptions: AutocompleteSelectOption[] = productTags.map((tag) => ({
		id: tag.id,
		name: tag.name,
	}));

	const handleCreateSupplier = async (inputValue: string): Promise<AutocompleteSelectOption> => {
		// Simulate API call or resource creation
		const newSupplier = { name: inputValue };
		const payload = newSupplier;
		mutateSupplier({
			path: "suppliers",
			body: payload,
		});
		return newSupplier;
	};

	const handleCreateProductTag = async (inputValue: string): Promise<AutocompleteSelectOption> => {
		// Simulate API call or resource creation
		const newProductTag = { name: inputValue };
		const payload = newProductTag;
		mutateProductTag({
			path: "productTags",
			body: payload,
		});
		return newProductTag;
	};

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

	const [selectedSupplier, setSelectedSupplier] = React.useState<Supplier | null>(null);
	const [selectedProductTag, setSelectedProductTag] = React.useState<ProductTag | null>(null);

	return (
		<div>
			<div className="px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]">
				<h1>Products</h1>
			</div>
			<div className="flex justify-between px-4 sm:px-6 lg:px-8 py-6 items-center">
				<p>Add, view and edit your products all in one place.</p>
				<div className="flex gap-2">
					<button type="button" className="bg-[#5d91b4] text-white">
						<Link to={"/products/add"}>Cancel</Link>
					</button>
					<button
						type="button"
						className={`inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
					>
						Save
					</button>
				</div>
			</div>

			<div className="flex flex-col px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]">
				<form action={handleSubmit}>
					<div className="flex">
						<div className="w-[15%]">
							<p>General</p>
						</div>
						<div className="flex flex-col w-full">
							<div className="flex flex-col w-[78%] mb-4">
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

							<div className="flex flex-col w-[78%] mb-4 text-sm font-medium">
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

							<div className="flex flex-col w-[78%] mb-4">
								<AutocompleteSelect
									options={productTagOptions}
									resource={
										selectedProductTag
											? { id: selectedProductTag.id, name: selectedProductTag.name }
											: null
									}
									onChange={(option) => {
										if (option) {
											const productTag = productTags.find((pt) => pt.id === option.id);
											setSelectedProductTag(productTag ?? null);
										} else {
											setSelectedProductTag(null);
										}
									}}
									placeholder="Select or create a product tag"
									onCreateOption={handleCreateProductTag}
									label={"Product Tag"}
								/>
							</div>

							<div className="flex flex-col w-[78%] mb-4">
								<AutocompleteSelect
									options={supplierOptions}
									resource={
										selectedSupplier
											? { id: selectedSupplier.id, name: selectedSupplier.name }
											: null
									}
									onChange={(option) => {
										if (option) {
											const supplier = suppliers.find((s) => s.id === option.id);
											setSelectedSupplier(supplier ?? null);
										} else {
											setSelectedSupplier(null);
										}
									}}
									placeholder="Select or create a supplier"
									onCreateOption={handleCreateSupplier}
									label={"Supplier"}
								/>
							</div>
						</div>
					</div>

					{/* AttributeInput component for adding attributes */}
					<div className="px-4 sm:px-6 lg:px-8 py-4">
						<AttributeInput />
					</div>
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
