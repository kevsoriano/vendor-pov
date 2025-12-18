import { Fragment, useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export interface ProductVariant {
    id: string
    attributes: Record<string, string> // e.g., { Color: 'Red', Size: 'M' }
    price?: number
    sku?: string
    stock?: number
}

interface ProductVariantTableProps {
    variants: ProductVariant[]
    attributeNames: string[]
}

export default function ProductVariantTable({ variants, attributeNames }: ProductVariantTableProps) {
    // Track expanded rows by ID
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

    const toggleRow = (id: string) => {
        const newExpanded = new Set(expandedRows)
        if (newExpanded.has(id)) {
            newExpanded.delete(id)
        } else {
            newExpanded.add(id)
        }
        setExpandedRows(newExpanded)
    }

    if (variants.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                No variants generated yet. Add attributes and values to generate variants.
            </div>
        )
    }

    return (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 w-10">
                            <span className="sr-only">Expand</span>
                        </th>
                        {attributeNames.map((name) => (
                            <th key={name} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                {name}
                            </th>
                        ))}
                        <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                            Price
                        </th>
                        <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                            SKU
                        </th>
                        <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                            Stock
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {variants.map((variant) => (
                        <Fragment key={variant.id}>
                            <tr className={expandedRows.has(variant.id) ? 'bg-gray-50' : undefined}>
                                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium text-gray-900 sm:pr-6 cursor-pointer" onClick={() => toggleRow(variant.id)}>
                                    {expandedRows.has(variant.id) ? (
                                        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                                    )}
                                </td>
                                {attributeNames.map((name) => (
                                    <td key={name} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                                        {variant.attributes[name] || '-'}
                                    </td>
                                ))}
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className="block w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={variant.price}
                                    />
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <input
                                        type="text"
                                        placeholder="SKU"
                                        className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={variant.sku}
                                    />
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="block w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={variant.stock}
                                    />
                                </td>
                            </tr>
                            {expandedRows.has(variant.id) && (
                                <tr className="bg-gray-50">
                                    <td colSpan={attributeNames.length + 4} className="px-4 py-4 sm:px-6">
                                        <div className="rounded-md border border-gray-200 bg-white p-4">
                                            <h4 className="text-sm font-medium text-gray-900 mb-2">Variant Details</h4>
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Image</label>
                                                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                                        <div className="space-y-1 text-center">
                                                            <div className="flex text-sm text-gray-600">
                                                                <label htmlFor={`file-upload-${variant.id}`} className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                                                    <span>Upload a file</span>
                                                                    <input id={`file-upload-${variant.id}`} name="file-upload" type="file" className="sr-only" />
                                                                </label>
                                                                <p className="pl-1">or drag and drop</p>
                                                            </div>
                                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                                    <div className="mt-1">
                                                        <textarea
                                                            rows={3}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            placeholder="Variant specific description..."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
