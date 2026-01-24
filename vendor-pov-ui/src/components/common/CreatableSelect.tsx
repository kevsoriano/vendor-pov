import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const filter = createFilterOptions<MovieOption>();

interface MovieOption {
	title: string;
	year?: number;
	inputValue?: string;
}

export default function CreatableAutocomplete() {
	const [value, setValue] = useState<MovieOption | null>(null);
	const [options, setOptions] = useState<MovieOption[]>([
		{ title: "Inception", year: 2010 },
		{ title: "Interstellar", year: 2014 },
	]);

	return (
		<Autocomplete
			value={value}
			onChange={(_event, newValue) => {
				if (typeof newValue === "string") {
					// Case 1: User pressed enter on a freeSolo string
					setValue({ title: newValue });
				} else if (newValue?.inputValue) {
					// Case 2: User clicked the "Add" option
					setValue({ title: newValue.inputValue });
					// Logic to save to your backend could go here!
					setOptions((prev) => [...prev, { title: newValue.inputValue as string }]);
				} else {
					// Case 3: Regular selection
					setValue(newValue);
				}
			}}
			filterOptions={(options, params) => {
				const filtered = filter(options, params);

				const { inputValue } = params;
				// Suggest the creation of a new value if it's not empty
				const isExisting = options.some((option) => inputValue === option.title);

				if (inputValue !== "" && !isExisting) {
					filtered.push({
						inputValue,
						title: `Add "${inputValue}"`,
					});
				}

				return filtered;
			}}
			selectOnFocus
			clearOnBlur
			handleHomeEndKeys
			options={options}
			getOptionLabel={(option) => {
				// Value selected with enter, right from the input
				if (typeof option === "string") return option;
				// Add "xxx" option created dynamically
				if (option.inputValue) return option.inputValue;
				// Regular option
				return option.title;
			}}
			freeSolo
			renderInput={(params) => <TextField {...params} label="Search or Create Movies" />}
		/>
	);
}
