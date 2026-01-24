import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import type React from "react";

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
		<FormControl component="fieldset" fullWidth>
			<FormLabel component="legend">Product Type</FormLabel>
			<RadioGroup
				row
				value={selectedType}
				onChange={(e) => onChange(e.target.value as ProductType)}
				aria-label="product-type"
				name="product-type"
			>
				{productTypes.map((type) => (
					<FormControlLabel
						key={type.id}
						value={type.id}
						control={<Radio />}
						label={
							<div>
								<div style={{ fontWeight: 500 }}>{type.title}</div>
								<div style={{ fontSize: "0.85em", color: "#666" }}>{type.description}</div>
							</div>
						}
						sx={{ flex: 1, m: 1, alignItems: "flex-start" }}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
};

export default ProductTypeSelector;
