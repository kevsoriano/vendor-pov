import { Box, Button, Chip, InputAdornment, Stack, TextField } from "@mui/material";
import type React from "react";
import { useState } from "react";

interface AttributeRow {
	rowId: string;
	name: string;
	values: string[];
}

const AttributeInput: React.FC = () => {
	const [attributes, setAttributes] = useState<AttributeRow[]>([]);

	const handleAddAttribute = () => {
		if (attributes.length < 3) {
			const newId = Date.now().toString() + Math.random().toString(36).slice(2);
			setAttributes([...attributes, { rowId: newId, name: "", values: [] }]);
		}
	};

	const handleNameChange = (index: number, value: string) => {
		const updated = [...attributes];
		updated[index].name = value;
		setAttributes(updated);
	};

	const handleChipAdd = (index: number, value: string) => {
		if (!value.trim()) return;
		const updated = [...attributes];
		if (updated[index].values.length < 5 && !updated[index].values.includes(value)) {
			updated[index].values.push(value);
			setAttributes(updated);
		}
	};

	const handleChipDelete = (index: number, chip: string) => {
		const updated = [...attributes];
		updated[index].values = updated[index].values.filter((v) => v !== chip);
		setAttributes(updated);
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
							<TextField
								label="Values"
								size="small"
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Box
												sx={{
													display: "flex",
													flexDirection: "row",
													alignItems: "center",
													flexWrap: "nowrap",
													gap: 0.5,
													overflow: "auto",
													maxWidth: 350,
													scrollbarWidth: "none", // Firefox
													"&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
												}}
											>
												{attr.values.map((chip) => (
													<Chip
														key={chip}
														label={chip}
														onDelete={() => handleChipDelete(idx, chip)}
														size="small"
													/>
												))}
											</Box>
										</InputAdornment>
									),
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter" && attr.values.length < 5) {
										handleChipAdd(idx, (e.target as HTMLInputElement).value);
										(e.target as HTMLInputElement).value = "";
									}
								}}
							/>
							{attr.values.length >= 5 && (
								<Box sx={{ color: "text.secondary", fontSize: 12, mt: 0.5 }}>
									Maximum of 5 values allowed.
								</Box>
							)}
						</Box>
					</Box>
				))}
			</Stack>
		</Box>
	);
};

export default AttributeInput;
