import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import CreatableMultiSelect, {
	type CreatableMultiSelectOption,
} from "../common/CreatableMultiSelect";

export interface ProductAttribute {
	id: string;
	name: string;
	values: CreatableMultiSelectOption[];
}

interface ProductAttributesInputProps {
	attributes: ProductAttribute[];
	onChange: (attributes: ProductAttribute[]) => void;
}

const MAX_ATTRIBUTES = 3;
const MAX_VALUES_PER_ATTRIBUTE = 3;

export default function ProductAttributesInput({
	attributes,
	onChange,
}: ProductAttributesInputProps) {
	// We treat the incoming attributes as the source of truth,
	// but for local UI interactions (like typing a name) we might want some local state if it was purely a form.
	// However, for simplicity, we'll delegate everything to parent or modify in place and call onChange.

	const handleAddAttribute = () => {
		if (attributes.length >= MAX_ATTRIBUTES) return;

		const newAttribute: ProductAttribute = {
			id: crypto.randomUUID(),
			name: "",
			values: [],
		};
		onChange([...attributes, newAttribute]);
	};

	const handleRemoveAttribute = (id: string) => {
		onChange(attributes.filter((attr) => attr.id !== id));
	};

	const handleAttributeNameChange = (id: string, newName: string) => {
		onChange(attributes.map((attr) => (attr.id === id ? { ...attr, name: newName } : attr)));
	};

	const handleAttributeValuesChange = (id: string, newValues: CreatableMultiSelectOption[]) => {
		// Enforce value limit
		if (newValues.length > MAX_VALUES_PER_ATTRIBUTE) {
			// Re-read current values to compare
			const currentAttr = attributes.find((a) => a.id === id);
			if (currentAttr && newValues.length > currentAttr.values.length) {
				// Trying to add
				return;
			}
		}

		onChange(attributes.map((attr) => (attr.id === id ? { ...attr, values: newValues } : attr)));
	};

	// Since CreatableMultiSelect requires an ID for options, we need a way to generate them for new values
	// We'll trust the component effectively handles "onCreate" by the parent passing that logic down,
	// or we implement `onCreate` here for the specific attribute.

	const handleCreateValue = (attributeId: string, valueName: string) => {
		const attribute = attributes.find((a) => a.id === attributeId);
		if (!attribute) return;

		if (attribute.values.length >= MAX_VALUES_PER_ATTRIBUTE) return;

		const newValue: CreatableMultiSelectOption = {
			id: crypto.randomUUID(),
			name: valueName,
		};

		handleAttributeValuesChange(attributeId, [...attribute.values, newValue]);
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="text-sm font-medium text-gray-900">Attributes</h3>
				<div className="flex items-center gap-2">
					<span className="text-xs text-gray-500">
						{attributes.length}/{MAX_ATTRIBUTES} attributes
					</span>
					<button
						type="button"
						onClick={handleAddAttribute}
						disabled={attributes.length >= MAX_ATTRIBUTES}
						className={`inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
							attributes.length >= MAX_ATTRIBUTES
								? "bg-gray-400 cursor-not-allowed"
								: "bg-indigo-600 hover:bg-indigo-700"
						} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
					>
						<PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
						Add Attribute
					</button>
				</div>
			</div>

			{attributes.length === 0 && (
				<p className="text-sm text-gray-500 italic">
					No attributes added yet. Add attributes like "Color" or "Size" to generate variants.
				</p>
			)}

			<div className="space-y-4">
				{attributes.map((attribute) => (
					<div
						key={attribute.id}
						className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
					>
						<div className="absolute top-4 right-4">
							<button
								type="button"
								onClick={() => handleRemoveAttribute(attribute.id)}
								className="text-gray-400 hover:text-red-500"
							>
								<span className="sr-only">Remove attribute</span>
								<TrashIcon className="h-5 w-5" aria-hidden="true" />
							</button>
						</div>

						<div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
							<div className="sm:col-span-2">
								<label
									htmlFor={`attr-name-${attribute.id}`}
									className="block text-sm font-medium text-gray-700"
								>
									Attribute Name
								</label>
								<div className="mt-1">
									<input
										type="text"
										name={`attr-name-${attribute.id}`}
										id={`attr-name-${attribute.id}`}
										value={attribute.name}
										onChange={(e) =>
											handleAttributeNameChange(attribute.id, e.target.value)
										}
										placeholder="e.g. Color"
										className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
									/>
								</div>
							</div>

							<div className="sm:col-span-4">
								<CreatableMultiSelect
									label="Values"
									options={attribute.values} // In a real app, maybe we suggest existing values for this attribute name
									value={attribute.values}
									onChange={(newValues) =>
										handleAttributeValuesChange(attribute.id, newValues)
									}
									onCreate={(name) => handleCreateValue(attribute.id, name)}
									className=""
								/>
								<div className="mt-1 text-xs text-gray-400 flex justify-end">
									{attribute.values.length}/{MAX_VALUES_PER_ATTRIBUTE} values
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
