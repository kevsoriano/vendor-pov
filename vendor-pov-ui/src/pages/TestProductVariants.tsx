import { useState, useEffect } from 'react'
import ProductAttributesInput, { type ProductAttribute } from '../components/products/ProductAttributesInput'
import ProductVariantTable, { type ProductVariant } from '../components/products/ProductVariantTable'

export default function TestProductVariants() {
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

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Test Product Attributes & Variants</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Attributes Input */}
                <div className="lg:col-span-1 border-r border-gray-200 pr-0 lg:pr-8">
                    <ProductAttributesInput
                        attributes={attributes}
                        onChange={setAttributes}
                    />
                </div>

                {/* Right Column: Variants Table */}
                <div className="lg:col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Generated Variants ({variants.length})</h3>
                    <ProductVariantTable
                        variants={variants}
                        attributeNames={attributes.map(a => a.name).filter(n => n.trim() !== '')}
                    />
                </div>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded text-xs font-mono overflow-auto max-h-40">
                <p className="font-bold mb-2">Debug Data:</p>
                <pre>{JSON.stringify({ attributes, variants }, null, 2)}</pre>
            </div>
        </div>
    )
}
