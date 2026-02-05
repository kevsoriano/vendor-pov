import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import ResourceCreateModal from "./ResourceCreateModal";

export interface AutocompleteSelectOption {
	id?: string;
	name: string;
	description?: string;
}

interface AutocompleteSelectProps {
	options: AutocompleteSelectOption[];
	resource: AutocompleteSelectOption | null;
	onChange: (value: AutocompleteSelectOption | null) => void;
	placeholder?: string;
	onCreateOption?: (inputValue: string) => Promise<AutocompleteSelectOption>;
	label: string;
}

const filter = createFilterOptions<
	AutocompleteSelectOption | { inputValue: string; label: string }
>();

const AutocompleteSelect: React.FC<AutocompleteSelectProps> = ({
	options,
	resource,
	onChange,
	placeholder = "Select...",
	onCreateOption,
	label,
}) => {
	const [inputValue, setInputValue] = useState("");
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [pendingCreateValue, setPendingCreateValue] = useState<string>("");

	// Find the selected option object
	const selectedOption = resource
		? options.find((opt) => opt.name === resource.name) || null
		: null;

	// Handler for modal creation
	const handleCreateResource = async (name: string) => {
		if (onCreateOption) {
			setLoading(true);
			const created = await onCreateOption(name);
			onChange(created);
			setLoading(false);
			setModalOpen(false);
			setPendingCreateValue("");
		}
	};

	return (
		<>
			<Autocomplete
				value={selectedOption}
				onChange={(_event, newValue) => {
					if (typeof newValue === "string") {
						onChange(null);
					} else if (newValue && "inputValue" in newValue && onCreateOption) {
						setPendingCreateValue(newValue.inputValue);
						setModalOpen(true);
					} else if (newValue && "name" in newValue) {
						onChange(newValue);
					} else {
						onChange(null);
					}
				}}
				filterOptions={(opts, params) => {
					const { inputValue } = params;
					const filtered = opts.filter((opt) => {
						if ("label" in opt && typeof opt.label === "string") {
							return opt.label.toLowerCase().includes(inputValue.toLowerCase());
						}
						if ("name" in opt && typeof opt.name === "string") {
							return opt.name.toLowerCase().includes(inputValue.toLowerCase());
						}
						return false;
					});
					const exactExists = opts.some((opt) => {
						if ("label" in opt && typeof opt.label === "string") {
							return opt.label.toLowerCase() === inputValue.toLowerCase();
						}
						if ("name" in opt && typeof opt.name === "string") {
							return opt.name.toLowerCase() === inputValue.toLowerCase();
						}
						return false;
					});
					if (inputValue !== "" && !exactExists && onCreateOption) {
						return [...filtered, { inputValue, label: `Add "${inputValue}"` }];
					}
					return filtered;
				}}
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				options={
					options as (AutocompleteSelectOption | { inputValue: string; label: string })[]
				}
				getOptionLabel={(option) => {
					if (typeof option === "string") return option;
					if ("label" in option && typeof option.label === "string") return option.label;
					if ("inputValue" in option && typeof option.inputValue === "string")
						return option.inputValue;
					if ("name" in option && typeof option.name === "string") return option.name;
					return "hello";
				}}
				loading={loading}
				freeSolo={!!onCreateOption}
				renderInput={(params) => <TextField {...params} label={label} />}
				inputValue={inputValue}
				onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
				isOptionEqualToValue={(option, val) => {
					if (
						typeof option === "string" ||
						typeof val === "string" ||
						!("id" in option) ||
						!("id" in val)
					) {
						return false;
					}
					return option.id === val.id;
				}}
			/>
			<ResourceCreateModal
				open={modalOpen}
				onClose={() => {
					setModalOpen(false);
					setPendingCreateValue("");
				}}
				onCreate={handleCreateResource}
				label={label}
				loading={loading}
			/>
		</>
	);
};

export default AutocompleteSelect;
