import { Autocomplete, Box, Chip, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export interface AutocompleteOption {
	id?: string;
	name: string;
}

interface CreateOption {
	inputValue: string;
	label: string;
}

interface SelectChipsProps {
	values: AutocompleteOption[];
	onAdd: (value: AutocompleteOption) => void;
	onDelete: (value: AutocompleteOption) => void;
	maxValues?: number;
	label?: string;
	autocompleteOptions?: AutocompleteOption[];
	onCreateOption?: (inputValue: string) => Promise<AutocompleteOption>;
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

	const isCreateOption = (option: unknown): option is CreateOption =>
		typeof option === "object" && option !== null && "inputValue" in option;

	const isAutocompleteOption = (option: unknown): option is AutocompleteOption =>
		typeof option === "object" && option !== null && "name" in option;

	const isSelectedName = (name: string) => values.some((value) => value.name === name);

	// If autocompleteOptions is provided, use Autocomplete, else fallback to TextField
	if (autocompleteOptions && Array.isArray(autocompleteOptions)) {
		// Filter out already selected values from options
		const filteredOptions = autocompleteOptions.filter(
			(opt) => !values.some((value) => value.id === opt.id || value.name === opt.name),
		);
		const trimmedInput = inputValue.trim();
		// Add 'Add "value"' option if inputValue is not empty and not in options
		const showAddOption = Boolean(
			trimmedInput &&
			!filteredOptions.some((opt) => opt.name === trimmedInput) &&
			!isSelectedName(trimmedInput),
		);
		const options = showAddOption
			? [
					...filteredOptions,
					{ inputValue: trimmedInput, label: `Add "${trimmedInput}"` },
				]
			: filteredOptions;
		return (
			<Box sx={{ width: "100%" }}>
				<Autocomplete
					freeSolo
					options={options}
					getOptionLabel={(option) => {
						if (typeof option === "string") return option;
						if (isCreateOption(option)) return option.label;
						if (isAutocompleteOption(option)) return option.name;
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
							!isSelectedName(newValue.trim()) &&
							values.length < maxValues
						) {
							if (onCreateOption) {
								const created = await onCreateOption(newValue.trim());
								if (created && !isSelectedName(created.name)) {
									onAdd(created);
								}
								setInputValue("");
							} else {
								onAdd({ id: newValue.trim(), name: newValue.trim() });
								setInputValue("");
							}
						} else if (isAutocompleteOption(newValue)) {
							if (!isSelectedName(newValue.name) && values.length < maxValues) {
								onAdd(newValue);
							}
							setInputValue("");
						} else if (isCreateOption(newValue) && onCreateOption) {
							// Call backend to create new tag, then add to chips
							const created = await onCreateOption(newValue.inputValue);
							if (created && !isSelectedName(created.name)) {
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
													key={chip.id}
													label={chip.name}
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
									!isSelectedName(inputValue.trim()) &&
									values.length < maxValues
								) {
									if (showAddOption && onCreateOption) {
										const created = await onCreateOption(inputValue.trim());
										if (created && !isSelectedName(created.name)) {
											onAdd(created);
										}
									} else {
										onAdd({ id: inputValue.trim(), name: inputValue.trim() });
									}
									setInputValue("");
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
				placeholder="Enter a product tag"
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
										key={chip.id}
										label={chip.name}
										onDelete={() => onDelete(chip)}
										size="small"
									/>
								))}
							</Box>
						</InputAdornment>
					),
				}}
				onKeyDown={(e) => {
					const nextValue = (e.target as HTMLInputElement).value.trim();
					if (e.key === "Enter" && nextValue && values.length < maxValues) {
						onAdd({ id: nextValue, name: nextValue });
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
