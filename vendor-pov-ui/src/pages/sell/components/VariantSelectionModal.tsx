import { useEffect, useMemo, useState } from "react";
import type { Product, ProductVariant } from "../../../types/models";

interface VariantSelectionModalProps {
	product: Product;
	isOpen: boolean;
	onClose: () => void;
	onSelectVariant: (variant: ProductVariant) => void;
}

const VariantSelectionModal: React.FC<VariantSelectionModalProps> = ({
	product,
	isOpen,
	onClose,
	onSelectVariant,
}) => {
	const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

	useEffect(() => {
		if (isOpen) {
			setSelectedVariant(null);
		}
	}, [isOpen]);

	const attributeKeyOrder = useMemo(() => {
		const order = new Map<string, number>();
		let index = 0;
		for (const variant of product.productVariants ?? []) {
			for (const attr of variant.productAttributes ?? []) {
				const key = attr.attributeKey.trim().toLowerCase();
				if (!key) continue;
				if (!order.has(key)) {
					order.set(key, index);
					index += 1;
				}
			}
		}
		return order;
	}, [product.productVariants]);

	if (!isOpen) return null;

	const handleConfirm = () => {
		if (selectedVariant) {
			onSelectVariant(selectedVariant);
			onClose();
		}
	};

	const handleClose = () => {
		onClose();
	};

	const getVariantLabel = (variant: ProductVariant) => {
		if (!variant.productAttributes || variant.productAttributes.length === 0) {
			return variant.variantSku;
		}
		const sortedAttributes = [...variant.productAttributes].sort((a, b) => {
			const keyA = a.attributeKey.trim().toLowerCase();
			const keyB = b.attributeKey.trim().toLowerCase();
			const rankA = attributeKeyOrder.get(keyA) ?? Number.POSITIVE_INFINITY;
			const rankB = attributeKeyOrder.get(keyB) ?? Number.POSITIVE_INFINITY;
			if (rankA !== rankB) return rankA - rankB;
			return keyA.localeCompare(keyB);
		});

		return sortedAttributes
			.map((attr) => `${attr.attributeKey}: ${attr.attributeValue}`)
			.join(" • ");
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<button
				type="button"
				className="absolute inset-0 bg-opacity-20 transition-opacity"
				onClick={handleClose}
				aria-label="Close modal"
			/>

			{/* Modal */}
			<div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
				{/* Header */}
				<div className="px-6 py-5 border-b border-gray-200">
					<h2 className="text-xl font-semibold text-gray-900">Select Product Variant</h2>
					<p className="text-sm text-gray-600 mt-1">{product.name}</p>
				</div>

				{/* Content */}
				<div className="px-6 py-4 overflow-y-auto flex-grow">
					<div className="space-y-3">
						{product.productVariants?.map((variant) => (
							<button
								key={variant.variantSku}
								type="button"
								onClick={() => setSelectedVariant(variant)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										setSelectedVariant(variant);
									}
								}}
								className={`
									w-full text-left p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
									${
										selectedVariant?.variantSku === variant.variantSku
											? "border-blue-600 bg-blue-50 shadow-sm"
											: "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
									}
								`}
							>
								<div className="flex items-center justify-between">
									<div className="flex-grow">
										<div className="font-medium text-gray-900">
											{getVariantLabel(variant)}
										</div>
										<div className="text-xs text-gray-500 mt-1">
											SKU: {variant.variantSku}
										</div>
									</div>
									<div
										className={`
											w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
											${
												selectedVariant?.variantSku === variant.variantSku
													? "border-blue-600 bg-blue-600"
													: "border-gray-300"
											}
										`}
									>
										{selectedVariant?.variantSku === variant.variantSku && (
											<svg
												className="w-3 h-3 text-white"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="3"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<title>Selected</title>
												<path d="M5 13l4 4L19 7" />
											</svg>
										)}
									</div>
								</div>
							</button>
						))}
					</div>
				</div>

				{/* Footer */}
				<div className="px-6 py-4 border-t border-gray-200 flex gap-3">
					<button
						type="button"
						onClick={handleClose}
						className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 
						         hover:bg-gray-50 transition-colors"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={handleConfirm}
						disabled={!selectedVariant}
						className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium 
						         hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed 
						         transition-all duration-200 shadow-sm hover:shadow-md disabled:hover:shadow-sm"
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default VariantSelectionModal;
