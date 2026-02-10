import { Box, Button, Stack, TextField } from "@mui/material";
import type React from "react";

import ChipSelect, {
	type AutocompleteOption,
} from "../../../components/common/SelectChips";

export interface AttributeRow {
	rowId: string;
	name: string;
	values: AutocompleteOption[];
}

interface AttributeInputProps {
	value: AttributeRow[];
	onChange: (nextValue: AttributeRow[]) => void;
}

const AttributeInput: React.FC<AttributeInputProps> = ({ value, onChange }) => {
	const attributes = value;

	const handleAddAttribute = () => {
		if (attributes.length < 3) {
			const newId = Date.now().toString() + Math.random().toString(36).slice(2);
			onChange([...attributes, { rowId: newId, name: "", values: [] }]);
		}
	};

	const handleNameChange = (index: number, value: string) => {
		const updated = [...attributes];
		updated[index].name = value;
		onChange(updated);
	};

	const getOptionKey = (option: AutocompleteOption) => {
		const optionValue = (option as { value?: string }).value;
		const optionLabel = (option as { label?: string }).label;
		return String(optionValue ?? optionLabel ?? "");
	};

	const handleValuesAdd = (index: number, option: AutocompleteOption) => {
		const optionKey = getOptionKey(option).trim();
		if (!optionKey) return;
		const updated = [...attributes];
		const existingKeys = updated[index].values.map(getOptionKey);
		if (updated[index].values.length < 5 && !existingKeys.includes(optionKey)) {
			updated[index].values = [...updated[index].values, option];
			onChange(updated);
		}
	};

	const handleValuesDelete = (index: number, chip: AutocompleteOption) => {
		const updated = [...attributes];
		const chipKey = getOptionKey(chip);
		updated[index].values = updated[index].values.filter(
			(v) => getOptionKey(v) !== chipKey
		);
		onChange(updated);
	};

	return (
		<Box>
			<Button
				variant="contained"
				onClick={handleAddAttribute}
				disabled={attributes.length >= 3}
				sx={{ mb: 2 }}
			>
				+ New Attribute
			</Button>
			{attributes.length >= 3 && (
				<Box sx={{ color: "text.secondary", fontSize: 13, mb: 1 }}>
					Maximum of 3 attributes allowed.
				</Box>
			)}
			<Stack spacing={2}>
				{attributes.map((attr, idx) => (
					<Box key={attr.rowId} display="flex" alignItems="flex-start" gap={2}>
						<TextField
							label="Attribute Name"
							value={attr.name}
							onChange={(e) => handleNameChange(idx, e.target.value)}
							size="small"
							sx={{ flex: 1 }}
						/>
						<Box sx={{ flex: 2, width: "100%" }}>
							<ChipSelect
								values={attr.values}
								onAdd={(val) => handleValuesAdd(idx, val)}
								onDelete={(chip) => handleValuesDelete(idx, chip)}
								maxValues={5}
							/>
						</Box>
					</Box>
				))}
			</Stack>
		</Box>
	);
};

export default AttributeInput;
