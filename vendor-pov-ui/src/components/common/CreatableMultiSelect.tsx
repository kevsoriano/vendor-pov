import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'

export interface CreatableMultiSelectOption {
    id: string | number
    name: string
}

interface CreatableMultiSelectProps {
    label: string
    options: CreatableMultiSelectOption[]
    value: CreatableMultiSelectOption[]
    onChange: (value: CreatableMultiSelectOption[]) => void
    onCreate: (name: string) => void
    className?: string
}

export default function CreatableMultiSelect({
    label,
    options,
    value,
    onChange,
    onCreate,
    className
}: CreatableMultiSelectProps) {
    const [query, setQuery] = useState('')

    const filteredOptions =
        query === ''
            ? options
            : options.filter((option) =>
                option.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    const handleSelect = (selectedOption: CreatableMultiSelectOption | null) => {
        if (!selectedOption) return

        // Check if already selected
        if (value.some(v => v.id === selectedOption.id)) {
            // If needed, we could toggle it off here, but standard combobox usually just selects.
            // For multi-select, often selecting again might not remove it, but user can remove via chips.
            // Let's prevent duplicates.
            return
        }
        onChange([...value, selectedOption])
        setQuery('')
    }

    const handleRemove = (optionId: string | number) => {
        onChange(value.filter(v => v.id !== optionId))
    }

    return (
        <div className={className}>
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">{label}</label>

            <Combobox value={null} onChange={handleSelect} onClose={() => setQuery('')}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md sm:text-sm border border-gray-300 flex flex-wrap gap-2 p-2">

                        {/* Chips Display */}
                        {value.map((option) => (
                            <span key={option.id} className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                {option.name}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation() // Prevent combobox from toggling
                                        handleRemove(option.id)
                                    }}
                                    className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none"
                                >
                                    <span className="sr-only">Remove {option.name}</span>
                                    <XMarkIcon className="h-3 w-3" aria-hidden="true" />
                                </button>
                            </span>
                        ))}

                        <div className="relative flex-1 min-w-[50px]">
                            <ComboboxInput
                                className="w-full border-none p-0 text-sm leading-5 text-gray-900 focus:ring-0"
                                displayValue={() => query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder={value.length === 0 ? `Select or create ${label.toLowerCase()}...` : ''}
                            />
                        </div>

                        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </ComboboxButton>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
                            {filteredOptions.length === 0 && query !== '' ? (
                                <div
                                    className="relative cursor-default select-none px-4 py-2 text-gray-700 hover:bg-indigo-600 hover:text-white"
                                    onClick={() => {
                                        onCreate(query)
                                        setQuery('')
                                    }}
                                >
                                    Create "{query}"
                                </div>
                            ) : (
                                filteredOptions.map((option) => (
                                    <ComboboxOption
                                        key={option.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={option}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected || value.some(v => v.id === option.id) ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {option.name}
                                                </span>
                                                {value.some(v => v.id === option.id) ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-indigo-600'
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
    )
}
