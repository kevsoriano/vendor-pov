import {
	Combobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
	Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";

export interface CreatableSelectOption {
	id: string | number;
	name: string;
}

interface CreatableSelectProps {
	label: string;
	options: CreatableSelectOption[];
	onChange: (value: CreatableSelectOption | null) => void;
	onCreate: (name: string) => void;
	value: CreatableSelectOption | null;
	className?: string;
}

export default function CreatableSelect({
	label,
	options,
	onChange,
	onCreate,
	value,
	className,
}: CreatableSelectProps) {
	const [query, setQuery] = useState("");

	const filteredOptions =
		query === ""
			? options
			: options.filter((option) =>
					option.name
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, "")),
				);

	return (
		<div className={className}>
			<Combobox value={value} onChange={onChange} onClose={() => setQuery("")}>
				<div className="relative mt-1">
					<label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
						{label}
					</label>
					<div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border border-gray-300">
						<ComboboxInput
							className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
							displayValue={(option: CreatableSelectOption) => option?.name}
							onChange={(event) => setQuery(event.target.value)}
							placeholder={`Select or create ${label.toLowerCase()}...`}
						/>
						<ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
						</ComboboxButton>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery("")}
					>
						<ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
							{filteredOptions.length === 0 && query !== "" ? (
								<div
									className="relative cursor-default select-none px-4 py-2 text-gray-700 hover:bg-indigo-600 hover:text-white"
									onClick={() => onCreate(query)}
								>
									Create "{query}"
								</div>
							) : (
								filteredOptions.map((option) => (
									<ComboboxOption
										key={option.id}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? "bg-indigo-600 text-white" : "text-gray-900"
											}`
										}
										value={option}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected ? "font-medium" : "font-normal"
													}`}
												>
													{option.name}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active ? "text-white" : "text-indigo-600"
														}`}
													>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</ComboboxOption>
								))
							)}
						</ComboboxOptions>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
}
