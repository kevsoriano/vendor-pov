import { useState } from "react";
import CreatableSelect, { type CreatableSelectOption } from "../components/common/CreatableSelect";
import CreatableMultiSelect, {
	type CreatableMultiSelectOption,
} from "../components/common/CreatableMultiSelect";
import Modal from "../components/common/Modal";

const initialOptions: CreatableSelectOption[] = [
	{ id: 1, name: "Apple" },
	{ id: 2, name: "Banana" },
	{ id: 3, name: "Orange" },
];

export default function TestCreatableSelect() {
	const [selectedOption, setSelectedOption] = useState<CreatableSelectOption | null>(null);
	const [selectedTags, setSelectedTags] = useState<CreatableMultiSelectOption[]>([]);

	const [options, setOptions] = useState<CreatableSelectOption[]>(initialOptions);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newOptionName, setNewOptionName] = useState("");
	const [isMultiSelectCreation, setIsMultiSelectCreation] = useState(false);

	const handleCreate = (name: string, isMulti: boolean = false) => {
		setNewOptionName(name);
		setIsMultiSelectCreation(isMulti);
		setIsModalOpen(true);
	};

	const confirmCreate = () => {
		const newOption = { id: Date.now(), name: newOptionName };
		setOptions([...options, newOption]);

		if (isMultiSelectCreation) {
			setSelectedTags([...selectedTags, newOption]);
		} else {
			setSelectedOption(newOption);
		}

		setIsModalOpen(false);
		setNewOptionName("");
		setIsMultiSelectCreation(false);
	};

	return (
		<div className="p-10 max-w-md mx-auto">
			<h1 className="text-2xl font-bold mb-4">Test Creatable Select</h1>

			<div className="mb-8">
				<h2 className="text-xl font-semibold mb-2">Single Select</h2>
				<CreatableSelect
					label="Fruit"
					options={options}
					value={selectedOption}
					onChange={setSelectedOption}
					onCreate={(name) => handleCreate(name, false)}
				/>
			</div>

			<div className="mb-8">
				<h2 className="text-xl font-semibold mb-2">Multi Select (Chips)</h2>
				<CreatableMultiSelect
					label="Tags"
					options={options}
					value={selectedTags}
					onChange={setSelectedTags}
					onCreate={(name) => handleCreate(name, true)}
				/>
				<div className="mt-2 p-4 bg-gray-100 rounded">
					<p>
						<strong>Selected Tags:</strong> {JSON.stringify(selectedTags)}
					</p>
				</div>
			</div>

			<div className="mt-8 p-4 bg-gray-100 rounded">
				<p className="mt-2">
					<strong>Available Options (Shared):</strong>
				</p>
				<ul className="list-disc pl-5">
					{options.map((o) => (
						<li key={o.id}>{o.name}</li>
					))}
				</ul>
			</div>

			<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Option">
				<div className="mt-2">
					<p className="text-sm text-gray-500">
						Are you sure you want to create the option "{newOptionName}"?
					</p>
				</div>
				<div className="mt-4 flex gap-3 justify-end">
					<button
						type="button"
						className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
						onClick={confirmCreate}
					>
						Yes, Create
					</button>
					<button
						type="button"
						className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
						onClick={() => setIsModalOpen(false)}
					>
						Cancel
					</button>
				</div>
			</Modal>
		</div>
	);
}
