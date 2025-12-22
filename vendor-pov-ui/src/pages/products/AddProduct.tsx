import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreatableSelect, { type CreatableSelectOption } from "../../components/common/CreatableSelect";
import type { CreatableMultiSelectOption } from "../../components/common/CreatableMultiSelect";
import CreatableMultiSelect from "../../components/common/CreatableMultiSelect";
import Modal from '../../components/common/Modal'
import type { ProductVariant } from "../../components/products/ProductVariantTable";
import type { ProductAttribute } from "../../components/products/ProductAttributesInput";
import ProductTypeSelector, { type ProductType } from "../../components/products/ProductTypeSelector";

const initialOptions: CreatableSelectOption[] = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Orange' },
]

const AddProduct = () => {
    const [selectedOption, setSelectedOption] = useState<CreatableSelectOption | null>(null)
    const [selectedTags, setSelectedTags] = useState<CreatableMultiSelectOption[]>([])

    const [options, setOptions] = useState<CreatableSelectOption[]>(initialOptions)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newOptionName, setNewOptionName] = useState('')
    const [isMultiSelectCreation, setIsMultiSelectCreation] = useState(false)
    const [productType, setProductType] = useState<ProductType>('standard');

    const [attributes, setAttributes] = useState<ProductAttribute[]>([])
    const [variants, setVariants] = useState<ProductVariant[]>([])

    useEffect(() => {
        // Generate variants based on attributes
        const generateVariants = () => {
            const attributesWithValues = attributes.filter(attr => attr.values.length > 0 && attr.name.trim() !== '')

            if (attributesWithValues.length === 0) {
                setVariants([])
                return
            }

            // Start with an empty variant
            let generated: Record<string, string>[] = [{}]

            for (const attr of attributesWithValues) {
                const nextGenerated: Record<string, string>[] = []
                for (const existing of generated) {
                    for (const value of attr.values) {
                        nextGenerated.push({
                            ...existing,
                            [attr.name]: value.name
                        })
                    }
                }
                generated = nextGenerated
            }

            // Transform into ProductVariant objects
            const newVariants: ProductVariant[] = generated.map(variantAttrs => ({
                id: crypto.randomUUID(),
                attributes: variantAttrs,
                price: 0,
                stock: 0,
                sku: ''
            }))

            setVariants(newVariants)
        }

        generateVariants()
    }, [attributes])

    const handleCreate = (name: string, isMulti: boolean = false) => {
        setNewOptionName(name)
        setIsMultiSelectCreation(isMulti)
        setIsModalOpen(true)
    }

    const confirmCreate = () => {
        const newOption = { id: Date.now(), name: newOptionName }
        setOptions([...options, newOption])

        if (isMultiSelectCreation) {
            setSelectedTags([...selectedTags, newOption])
        } else {
            setSelectedOption(newOption)
        }

        setIsModalOpen(false)
        setNewOptionName('')
        setIsMultiSelectCreation(false)
    }

    const handleSubmit = (formData: any) => {
        const name = formData.get("name")
        const description = formData.get("description")
        console.log(name, description)
    }

    return (
        <div>
            <div className='px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]'>
                <h1>Products</h1>
            </div>
            <div className='flex justify-between px-4 sm:px-6 lg:px-8 py-6 items-center'>
                <p>Add, view and edit your products all in one place.</p>
                <div className='flex gap-2'>
                    <button className='bg-[#5d91b4] text-white'><Link to={'/products/add'} >Cancel</Link></button>
                    <button className={`inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>Save</button>
                </div>
            </div>
            <div className='flex flex-col px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]'>
                <form action={handleSubmit}>
                    <div className="flex" id="general">
                        <div className="w-[15%]"><p>General</p></div>
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col mb-4">
                                <label htmlFor="name" className="text-sm font-medium text-gray-900">Name</label>
                                <div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border border-gray-300">
                                    <input type="text" name="name" id="name" className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0" placeholder="Enter a product name" />
                                </div>
                            </div>

                            <div className="flex flex-col mb-4 text-sm font-medium">
                                <label htmlFor="description" className="text-sm font-medium text-gray-900">Description</label>
                                <div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border border-gray-300">
                                    <input type="text" name="description" id="description" className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0" placeholder="Enter a product description" />
                                </div>
                            </div>

                            <div className="mb-4">
                                <CreatableSelect
                                    label="Brand"
                                    options={options}
                                    value={selectedOption}
                                    onChange={setSelectedOption}
                                    onCreate={(name) => handleCreate(name, false)}
                                />
                            </div>

                            <div className="mb-4">
                                <CreatableSelect
                                    label="Product Category"
                                    options={options}
                                    value={selectedOption}
                                    onChange={setSelectedOption}
                                    onCreate={(name) => handleCreate(name, false)}
                                />
                            </div>

                            <div className="mb-4">
                                <CreatableMultiSelect
                                    label="Product Attributes"
                                    options={options}
                                    value={selectedTags}
                                    onChange={setSelectedTags}
                                    onCreate={(name) => handleCreate(name, true)}
                                />
                            </div>

                            <div className="mb-4">
                                <CreatableMultiSelect
                                    label="Tags"
                                    options={options}
                                    value={selectedTags}
                                    onChange={setSelectedTags}
                                    onCreate={(name) => handleCreate(name, true)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex mb-8" id="product-type">
                        <div className="w-[15%]"><p>Product Type</p></div>
                        <div className="flex flex-col">
                            <ProductTypeSelector selectedType={productType} onChange={setProductType} />
                        </div>
                    </div>

                    <div className="flex" id="inventory">
                        <div className="w-[15%]"><p>Inventory</p></div>
                        <div className="w-[15%]">
                            <p>Inventory</p>
                        </div>
                    </div>

                    <div className="flex" id="tax">
                        <div className="w-[15%]"><p>Tax</p></div>
                    </div>

                    <div className="flex" id="price">
                        <div className="w-[15%]"><p>Price</p></div>
                    </div>

                    <div>
                        <button type="submit">Save</button>
                        <button type="button">Cancel</button>
                    </div>
                </form>
            </div>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Option"
            >
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

export default AddProduct;
