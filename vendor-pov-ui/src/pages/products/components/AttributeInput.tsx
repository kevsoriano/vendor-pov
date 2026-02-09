import { Box, Button, Stack, TextField } from "@mui/material";
import type React from "react";

import ChipSelect from "../../../components/common/SelectChips";

export interface AttributeRow {
	rowId: string;
	name: string;
	values: string[];
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

	const handleValuesAdd = (index: number, value: string) => {
		if (!value.trim()) return;
		const updated = [...attributes];
		if (updated[index].values.length < 5 && !updated[index].values.includes(value)) {
			updated[index].values.push(value);
			onChange(updated);
		}
	};

	const handleValuesDelete = (index: number, chip: string) => {
		const updated = [...attributes];
		updated[index].values = updated[index].values.filter((v) => v !== chip);
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
