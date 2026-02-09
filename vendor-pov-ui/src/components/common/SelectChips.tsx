import { Autocomplete, Box, Chip, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

interface SelectChipsProps {
	values: string[];
	onAdd: (value: string) => void;
	onDelete: (value: string) => void;
	maxValues?: number;
	label?: string;
	autocompleteOptions?: string[];
	onCreateOption?: (inputValue: string) => Promise<string>;
}

const SelectChips: React.FC<SelectChipsProps> = ({
	values,
	onAdd,
	onDelete,
	maxValues = 5,
	label = "Values",
	autocompleteOptions,
	onCreateOption,
}) => {
	const [inputValue, setInputValue] = useState("");

	// If autocompleteOptions is provided, use Autocomplete, else fallback to TextField
	if (autocompleteOptions && Array.isArray(autocompleteOptions)) {
		// Filter out already selected values from options
		const filteredOptions = autocompleteOptions.filter((opt) => !values.includes(opt));
		// Add 'Add "value"' option if inputValue is not empty and not in options
		const showAddOption =
			inputValue.trim() &&
			!filteredOptions.includes(inputValue.trim()) &&
			!values.includes(inputValue.trim());
		const options = showAddOption
			? [
					...filteredOptions,
					{ inputValue: inputValue.trim(), label: `Add "${inputValue.trim()}"` },
				]
			: filteredOptions;
		return (
			<Box sx={{ width: "100%" }}>
				<Autocomplete
					freeSolo
					options={options}
					getOptionLabel={(option) => {
						if (typeof option === "string") return option;
						if (typeof option === "object" && option.label) return option.label;
						return "";
					}}
					inputValue={inputValue}
					onInputChange={(_e, newInputValue) => setInputValue(newInputValue)}
					value={null}
					disabled={values.length >= maxValues}
					onChange={async (_e, newValue) => {
						if (
							typeof newValue === "string" &&
							newValue.trim() &&
							!values.includes(newValue) &&
							values.length < maxValues
						) {
							onAdd(newValue.trim());
							setInputValue("");
						} else if (
							newValue &&
							typeof newValue === "object" &&
							newValue.inputValue &&
							onCreateOption
						) {
							// Call backend to create new tag, then add to chips
							const created = await onCreateOption(newValue.inputValue);
							if (created && !values.includes(created)) {
								onAdd(created);
							}
							setInputValue("");
						}
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							label={label}
							size="small"
							fullWidth
							InputProps={{
								...params.InputProps,
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
											{values.map((chip) => (
												<Chip
													key={chip}
													label={chip}
													onDelete={() => onDelete(chip)}
													size="small"
												/>
											))}
										</Box>
									</InputAdornment>
								),
							}}
							onKeyDown={async (e) => {
								if (
									e.key === "Enter" &&
									inputValue.trim() &&
									!values.includes(inputValue.trim()) &&
									values.length < maxValues
								) {
									if (showAddOption && onCreateOption) {
										const created = await onCreateOption(inputValue.trim());
										if (created && !values.includes(created)) {
											onAdd(created);
										}
									} else {
										onAdd(inputValue.trim());
									}
									setInputValue("");
									e.preventDefault();
								}
							}}
						/>
					)}
				/>
				{values.length >= maxValues && (
					<Box sx={{ color: "text.secondary", fontSize: 12, mt: 0.5 }}>
						Maximum of {maxValues} values allowed.
					</Box>
				)}
			</Box>
		);
	}

	// Fallback: plain TextField
	return (
		<Box sx={{ width: "100%" }}>
			<TextField
				label={label}
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
								{values.map((chip) => (
									<Chip
										key={chip}
										label={chip}
										onDelete={() => onDelete(chip)}
										size="small"
									/>
								))}
							</Box>
						</InputAdornment>
					),
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter" && values.length < maxValues) {
						onAdd((e.target as HTMLInputElement).value);
						(e.target as HTMLInputElement).value = "";
					}
				}}
			/>
			{values.length >= maxValues && (
				<Box sx={{ color: "text.secondary", fontSize: 12, mt: 0.5 }}>
					Maximum of {maxValues} values allowed.
				</Box>
			)}
		</Box>
	);
};

export default SelectChips;
