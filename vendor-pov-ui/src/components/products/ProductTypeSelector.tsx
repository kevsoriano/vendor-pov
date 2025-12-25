import type React from "react";
import { RadioGroup } from "@headlessui/react";

export type ProductType = "standard" | "variant" | "composite";

interface ProductTypeOption {
	id: ProductType;
	title: string;
	description: string;
}

const productTypes: ProductTypeOption[] = [
	{
		id: "standard",
		title: "Standard Product",
		description: "A simple product with internal inventory tracking.",
	},
	{
		id: "variant",
		title: "Product with Variants",
		description: "A product with multiple attributes like size and color.",
	},
	{
		id: "composite",
		title: "Composite Product",
		description: "A product made of a bundle of other existing products.",
	},
];

interface ProductTypeSelectorProps {
	selectedType: ProductType;
	onChange: (type: ProductType) => void;
}

const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({ selectedType, onChange }) => {
	return (
		<div className="w-full">
			<RadioGroup value={selectedType} onChange={onChange}>
				<RadioGroup.Label className="sr-only">Product Type</RadioGroup.Label>
				<div className="grid grid-cols-1 sm:grid-cols-3 ">
					{productTypes.map((type) => (
						<RadioGroup.Option
							key={type.id}
							value={type.id}
							className={({ active, checked }) =>
								`${active ? "border-indigo-600 ring-2 ring-indigo-600" : "border-gray-300"}
                 ${checked ? "bg-indigo-50" : "bg-white hover:bg-gray-50"}
                 box-border relative flex cursor-pointer p-4 shadow-sm focus:outline-none`
							}
						>
							{() => (
								<span className="flex flex-1">
									<span className="flex flex-col">
										<RadioGroup.Label
											as="span"
											className="block text-sm font-medium text-gray-900"
										>
											{type.title}
										</RadioGroup.Label>
										<RadioGroup.Description
											as="span"
											className="mt-1 flex items-center text-sm text-gray-500"
										>
											{type.description}
										</RadioGroup.Description>
									</span>
								</span>
							)}
						</RadioGroup.Option>
					))}
				</div>
			</RadioGroup>
		</div>
	);
};

export default ProductTypeSelector;
