import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React from "react";

export type ProductAttributeDraft = {
	id: string;
	attributeKey: string;
	keyLocked: boolean;
	attributeValues: string[];
};

type PendingValuesById = Record<string, string>;

interface ProductAttributesEditorProps {
	attributes: ProductAttributeDraft[];
	onChange: (next: ProductAttributeDraft[]) => void;
	maxAttributes?: number;
	maxValuesPerAttribute?: number;
}

const DEFAULT_MAX_ATTRIBUTES = 3;
const DEFAULT_MAX_VALUES = 5;

const ProductAttributesEditor: React.FC<ProductAttributesEditorProps> = ({
	attributes,
	onChange,
	maxAttributes = DEFAULT_MAX_ATTRIBUTES,
	maxValuesPerAttribute = DEFAULT_MAX_VALUES,
}) => {
	const [pendingValues, setPendingValues] = React.useState<PendingValuesById>({});

	const addAttribute = () => {
		if (attributes.length >= maxAttributes) return;
		onChange([
			...attributes,
			{
				id: Math.random().toString(36).slice(2),
				attributeKey: "",
				keyLocked: false,
				attributeValues: [],
			},
		]);
	};

	const updateKey = (index: number, nextKey: string) => {
		const next = attributes.map((attr, i) =>
			i === index ? { ...attr, attributeKey: nextKey } : attr,
		);
		onChange(next);
	};

	const lockKeyIfValid = (index: number) => {
		const attr = attributes[index];
		if (!attr) return;
		const nextKey = attr.attributeKey.trim();
		if (!nextKey) return;
		const next = attributes.map((a, i) =>
			i === index ? { ...a, attributeKey: nextKey, keyLocked: true } : a,
		);
		onChange(next);
	};

	const removeAttribute = (id: string) => {
		onChange(attributes.filter((a) => a.id !== id));
		setPendingValues((prev) => {
			const { [id]: _removed, ...rest } = prev;
			return rest;
		});
	};

	const updatePendingValue = (id: string, value: string) => {
		setPendingValues((prev) => ({ ...prev, [id]: value }));
	};

	const addValue = (index: number, id: string) => {
		const raw = pendingValues[id] ?? "";
		const value = raw.trim();
		if (!value) return;

		const next = attributes.map((attr, i) => {
			if (i !== index) return attr;
			if (attr.attributeValues.length >= maxValuesPerAttribute) return attr;
			if (attr.attributeValues.some((v) => v.toLowerCase() === value.toLowerCase())) return attr;
			return { ...attr, attributeValues: [...attr.attributeValues, value] };
		});
		onChange(next);
		setPendingValues((prev) => ({ ...prev, [id]: "" }));
	};

	const removeValue = (index: number, valueToRemove: string) => {
		const next = attributes.map((attr, i) =>
			i === index
				? {
						...attr,
						attributeValues: attr.attributeValues.filter((v) => v !== valueToRemove),
					}
				: attr,
		);
		onChange(next);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div>
					<div className="text-sm font-medium text-gray-900">Product Attributes</div>
					<div className="text-xs text-gray-500">
						Add attribute keys (e.g., Size) and values (e.g., S, M, L).
					</div>
				</div>
				<button
					type="button"
					onClick={addAttribute}
					disabled={attributes.length >= maxAttributes}
					className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Add Attribute
				</button>
			</div>

			{attributes.length === 0 ? (
				<div className="text-sm text-gray-500">No attributes added yet.</div>
			) : (
				<div className="flex flex-col gap-4">
					{attributes.map((attr, index) => (
						<div key={attr.id} className="border border-gray-200 rounded-md p-4">
							<div className="flex items-start justify-between gap-3">
								<div className="w-full">
									<div className="flex flex-col sm:flex-row sm:items-start gap-3">
										<div className="w-full sm:w-48">
											<TextField
												label="Attribute Key"
												placeholder="e.g., Size"
												variant="outlined"
												size="small"
												fullWidth
												value={attr.attributeKey}
												disabled={attr.keyLocked}
												onChange={(e) => updateKey(index, e.target.value)}
												onBlur={() => lockKeyIfValid(index)}
												onKeyDown={(e) => {
													// The parent form blocks Enter; allow it here to lock the key.
													if (e.key === "Enter") {
														e.preventDefault();
														e.stopPropagation();
														lockKeyIfValid(index);
													}
												}}
												InputLabelProps={{ shrink: true }}
											/>
										</div>

										{attr.keyLocked && (
											<div className="flex-1 flex gap-2">
												<div className="flex-1">
													<TextField
														label="Attribute Value"
														placeholder="Type a value and press Enter"
														variant="outlined"
														size="small"
														fullWidth
														value={pendingValues[attr.id] ?? ""}
														onChange={(e) =>
															updatePendingValue(attr.id, e.target.value)
														}
														onKeyDown={(e) => {
															// The parent form blocks Enter; allow it here to add a value.
															if (e.key === "Enter") {
																e.preventDefault();
																e.stopPropagation();
																addValue(index, attr.id);
															}
														}}
														InputProps={{
															startAdornment:
																attr.attributeValues.length > 0 ? (
																	<InputAdornment position="start">
																		<div className="flex items-center gap-1 max-w-[360px] overflow-hidden">
																			{attr.attributeValues.map((v) => (
																				<Chip
																					key={v}
																					label={v}
																					size="small"
																					onDelete={() =>
																						removeValue(index, v)
																					}
																				/>
																			))}
																		</div>
																	</InputAdornment>
																) : undefined,
															endAdornment: (
																<InputAdornment position="end">
																	<IconButton
																		size="small"
																		disabled={
																			attr.attributeValues.length >=
																			maxValuesPerAttribute
																		}
																		onClick={() => addValue(index, attr.id)}
																		title={
																			attr.attributeValues.length >=
																			maxValuesPerAttribute
																				? `Max ${maxValuesPerAttribute} values`
																				: "Add value"
																		}
																	>
																		<AddIcon fontSize="small" />
																	</IconButton>
																</InputAdornment>
															),
														}}
														InputLabelProps={{ shrink: true }}
													/>
												</div>
											</div>
										)}
									</div>
								</div>

								<IconButton
									size="small"
									onClick={() => removeAttribute(attr.id)}
									title="Delete attribute"
									aria-label="Delete attribute"
								>
									<DeleteOutlineIcon fontSize="small" />
								</IconButton>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ProductAttributesEditor;
