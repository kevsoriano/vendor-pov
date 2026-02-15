import React from "react";

type ProductAttribute = {
	attributeKey: string;
	attributeValue: string;
};

type InventoryDraft = {
	outlet: { id?: string };
	supplier: { id?: string };
	quantity?: number;
	reorderThreshold?: number;
	reorderQty?: number;
};

type VariantRowBase = {
	variantSku?: string;
	productAttributes: ProductAttribute[];
	retailPrice?: number;
	taxRate?: number;
	supplierProductVariants?: Array<{
		supplier?: { id?: string; name?: string };
		supplierPrice?: number;
	}>;
	inventories?: InventoryDraft[];
};

type OutletOption = {
	id: string;
	name: string;
};

interface ExpandableVariantsTableProps<TVariant extends VariantRowBase> {
	variants: TVariant[];
	outlets?: OutletOption[];
	onChangeVariant?: (variantKey: string, nextVariant: TVariant) => void;
}

export const getVariantRowKeyFromAttributes = (
	attributes: Array<{ attributeKey: string; attributeValue: string }>,
	fallbackIndex: number,
) => {
	const attrsKey = [...attributes]
		.sort((a, b) => {
			const keyCompare = a.attributeKey.localeCompare(b.attributeKey);
			if (keyCompare !== 0) return keyCompare;
			return a.attributeValue.localeCompare(b.attributeValue);
		})
		.map((a) => `${a.attributeKey}:${a.attributeValue}`)
		.join("|");
	return attrsKey ? `attrs:${attrsKey}` : `idx:${fallbackIndex}`;
};

const formatAttributesSummary = (attributes: ProductAttribute[]) => {
	if (attributes.length === 0) return "—";
	return attributes.map((a) => `${a.attributeKey}: ${a.attributeValue}`).join(" • ");
};

const toNumberOrUndefined = (value: string) => {
	const trimmed = value.trim();
	if (!trimmed) return undefined;
	const parsed = Number(trimmed);
	return Number.isFinite(parsed) ? parsed : undefined;
};

const formatMoneyInput = (raw: string) => {
	const stripped = raw.replace(/[^0-9.]/g, "");
	const firstDotIndex = stripped.indexOf(".");
	const normalized =
		firstDotIndex >= 0
			? stripped.slice(0, firstDotIndex + 1) +
				stripped.slice(firstDotIndex + 1).replace(/\./g, "")
			: stripped;
	if (!normalized.includes(".")) return normalized;
	return normalized.replace(/^(\d+\.\d{0,2}).*$/, "$1");
};

const isStableMoney = (value: string) => {
	if (!value) return true;
	if (value.endsWith(".")) return false;
	return /^\d+(\.\d{0,2})?$/.test(value);
};

const ExpandableVariantsTable = <TVariant extends VariantRowBase>({
	variants,
	outlets = [],
	onChangeVariant,
}: ExpandableVariantsTableProps<TVariant>) => {
	const [expandedKey, setExpandedKey] = React.useState<string | null>(null);
	const [activeTabByKey, setActiveTabByKey] = React.useState<
		Record<string, "details" | "inventories">
	>({});
	const [draftMoney, setDraftMoney] = React.useState<
		Record<string, { retailPrice?: string; taxRate?: string }>
	>({});

	return (
		<div className="mt-3 border border-gray-200 rounded-md overflow-hidden bg-white">
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200 text-sm">
					<colgroup>
						<col style={{ width: 44 }} />
						<col style={{ width: 160 }} />
						<col style={{ width: 140 }} />
						<col style={{ width: 120 }} />
						<col />
					</colgroup>
					<thead className="bg-gray-50">
						<tr>
							<th
								className="px-2 py-2 text-center text-xs font-medium text-gray-600 border-r border-gray-200"
								aria-label="Expand"
							>
								Toggle
							</th>
							<th className="px-3 py-2 text-left font-medium text-gray-700">SKU</th>
							<th className="px-3 py-2 text-right font-medium text-gray-700">
								Retail Price
							</th>
							<th className="px-3 py-2 text-right font-medium text-gray-700">
								Tax Rate
							</th>
							<th className="px-3 py-2 text-left font-medium text-gray-700">Attributes</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{variants.map((variant, index) => {
							const rowKey = getVariantRowKeyFromAttributes(
								variant.productAttributes,
								index,
							);
							const isExpanded = expandedKey === rowKey;

							const supplierId = variant.supplierProductVariants?.[0]?.supplier?.id ?? "";
							const retailPriceValue =
								typeof variant.retailPrice === "number" ? String(variant.retailPrice) : "0";
							const taxRateValue =
								typeof variant.taxRate === "number" ? String(variant.taxRate) : "";

							const draftRetailPrice = draftMoney[rowKey]?.retailPrice;
							const draftTaxRate = draftMoney[rowKey]?.taxRate;

							const updateVariant = (patch: Partial<TVariant>) => {
								if (!onChangeVariant) return;
								onChangeVariant(rowKey, { ...variant, ...patch } as TVariant);
							};

							const getInventories = () =>
								Array.isArray(variant.inventories) ? variant.inventories : [];

							const setInventories = (nextInventories: InventoryDraft[]) => {
								updateVariant({ inventories: nextInventories } as Partial<TVariant>);
							};

							const updateRetailPrice = (value: string) => {
								updateVariant({
									retailPrice: toNumberOrUndefined(value),
								} as Partial<TVariant>);
							};

							const updateTaxRate = (value: string) => {
								updateVariant({
									taxRate: toNumberOrUndefined(value),
								} as Partial<TVariant>);
							};

							const activeTab = activeTabByKey[rowKey] ?? "details";

							return (
								<React.Fragment key={rowKey}>
									<tr className="bg-white">
										<td className="px-2 py-2 align-top text-center border-r border-gray-100">
											<button
												type="button"
												className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-gray-100 text-gray-900 hover:bg-gray-200"
												aria-expanded={isExpanded}
												aria-label={isExpanded ? "Collapse variant" : "Expand variant"}
												onClick={() =>
													setExpandedKey((prev) => {
														const next = prev === rowKey ? null : rowKey;
														if (next) {
															setActiveTabByKey((tabs) => ({
																...tabs,
																[next]: tabs[next] ?? "details",
															}));
														}
														return next;
													})
												}
											>
												<span className="text-base leading-none" aria-hidden="true">
													{isExpanded ? "▾" : "▸"}
												</span>
											</button>
										</td>
										<td className="px-3 py-2 align-top text-gray-900">
											<input
												className="w-full rounded border border-gray-200 bg-white px-2 py-1 text-sm text-gray-900"
												value={variant.variantSku ?? ""}
												placeholder={`variant-${index + 1}`}
												onChange={(e) =>
													updateVariant({
														variantSku: e.target.value,
													} as Partial<TVariant>)
												}
												disabled={!onChangeVariant}
											/>
										</td>
										<td className="px-3 py-2 align-top text-right text-gray-700 tabular-nums">
											<div className="flex items-center rounded border border-gray-200 bg-white px-2 py-1">
												<span className="text-gray-500 mr-1">$</span>
												<input
													className="no-spinner w-full bg-transparent text-sm text-right text-gray-900 tabular-nums outline-none"
													type="text"
													inputMode="decimal"
													placeholder="—"
													value={draftRetailPrice ?? retailPriceValue}
													style={{ MozAppearance: "textfield", textAlign: "right" }}
													onChange={(e) => {
														const formatted = formatMoneyInput(e.target.value);
														setDraftMoney((prev) => ({
															...prev,
															[rowKey]: {
																...prev[rowKey],
																retailPrice: formatted,
															},
														}));
														if (formatted === "") {
															updateRetailPrice("0");
														} else if (isStableMoney(formatted)) {
															updateRetailPrice(formatted);
														}
													}}
													onBlur={(e) => {
														const formatted = formatMoneyInput(e.target.value) || "0";
														updateRetailPrice(formatted);
														setDraftMoney((prev) => {
															const next = { ...prev };
															const current = next[rowKey];
															if (!current) return next;
															next[rowKey] = { ...current, retailPrice: undefined };
															return next;
														});
													}}
													disabled={!onChangeVariant}
												/>
											</div>
										</td>
										<td className="px-3 py-2 align-top text-right text-gray-700 tabular-nums">
											<div className="flex items-center rounded border border-gray-200 bg-white px-2 py-1">
												<input
													className="no-spinner w-full bg-transparent text-sm text-right text-gray-900 tabular-nums outline-none"
													type="text"
													inputMode="decimal"
													placeholder="—"
													value={draftTaxRate ?? taxRateValue}
													style={{ MozAppearance: "textfield", textAlign: "right" }}
													onChange={(e) => {
														const formatted = formatMoneyInput(e.target.value);
														setDraftMoney((prev) => ({
															...prev,
															[rowKey]: {
																...prev[rowKey],
																taxRate: formatted,
															},
														}));
														if (formatted === "") {
															updateTaxRate("");
														} else if (isStableMoney(formatted)) {
															updateTaxRate(formatted);
														}
													}}
													onBlur={(e) => {
														const formatted = formatMoneyInput(e.target.value);
														updateTaxRate(formatted);
														setDraftMoney((prev) => {
															const next = { ...prev };
															const current = next[rowKey];
															if (!current) return next;
															next[rowKey] = {
																...current,
																taxRate: undefined,
															};
															return next;
														});
													}}
													disabled={!onChangeVariant}
												/>
												<span className="ml-1 text-gray-500">%</span>
											</div>
										</td>
										<td className="px-3 py-2 align-top text-gray-700">
											{formatAttributesSummary(variant.productAttributes)}
										</td>
									</tr>

									{isExpanded && (
										<tr className="bg-gray-50">
											<td className="px-2 py-3 border-r border-gray-100" />
												<td className="px-3 py-3" colSpan={4}>
												<div className="text-xs text-gray-600">
													<div className="flex items-center gap-2 border-b border-gray-200 pb-2 mb-3">
														<button
															type="button"
															className={`px-2 py-1 rounded text-xs font-medium ${
																activeTab === "details"
																	? "bg-white border border-gray-300 text-gray-900"
																	: "text-gray-600 hover:text-gray-900"
															}`}
															onClick={() =>
																setActiveTabByKey((prev) => ({
																	...prev,
																	[rowKey]: "details",
																}))
															}
														>
															Details
														</button>
														<button
															type="button"
															className={`px-2 py-1 rounded text-xs font-medium ${
																activeTab === "inventories"
																	? "bg-white border border-gray-300 text-gray-900"
																	: "text-gray-600 hover:text-gray-900"
															}`}
															onClick={() =>
																setActiveTabByKey((prev) => ({
																	...prev,
																	[rowKey]: "inventories",
																}))
															}
														>
															Inventories
														</button>
													</div>

													{activeTab === "details" ? (
														<>
															<div className="font-medium text-gray-800 mb-2">
																Details
															</div>
															{variant.productAttributes.length === 0 ? (
																<div>—</div>
															) : (
																<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
																	{variant.productAttributes.map((a) => (
																		<div
																			key={`${a.attributeKey}-${a.attributeValue}`}
																			className="flex justify-between gap-3 rounded border border-gray-200 bg-white px-2 py-1"
																		>
																			<span className="text-gray-700">
																				{a.attributeKey}
																			</span>
																			<span className="text-gray-900 font-medium">
																				{a.attributeValue}
																			</span>
																		</div>
																	))}
																</div>
															)}
															<div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
																<div className="rounded border border-gray-200 bg-white px-2 py-1">
																	<span className="text-gray-700">
																		Retail Price:
																	</span>{" "}
																	<span className="text-gray-900 font-medium">
																		{typeof variant.retailPrice === "number"
																			? variant.retailPrice
																			: 0}
																	</span>
																</div>
																<div className="rounded border border-gray-200 bg-white px-2 py-1">
																	<span className="text-gray-700">Tax Rate:</span>{" "}
																	<span className="text-gray-900 font-medium">
																		{typeof variant.taxRate === "number"
																			? variant.taxRate
																			: "—"}
																	</span>
																</div>
															</div>
														</>
													) : (
														<>
															<div className="flex items-center justify-between mb-2">
																<div className="font-medium text-gray-800">
																	Inventories
																</div>
															</div>

															{outlets.length === 0 ? (
																<div className="text-gray-500">
																	No outlets available.
																</div>
															) : (
																<div className="space-y-2">
																	{outlets.map((outlet) => {
																		const invKey = `${rowKey}:${outlet.id}`;
																		const current = getInventories();
																		const existingIndex = current.findIndex(
																			(row) =>
																				(row?.outlet?.id ?? "") === outlet.id,
																		);
																		const inv =
																			existingIndex >= 0
																				? current[existingIndex]
																				: undefined;
																		const quantity =
																			typeof inv?.quantity === "number"
																				? String(inv.quantity)
																				: "";
																		const reorderThreshold =
																			typeof inv?.reorderThreshold === "number"
																				? String(inv.reorderThreshold)
																				: "";
																		const reorderQty =
																			typeof inv?.reorderQty === "number"
																				? String(inv.reorderQty)
																				: "";

																		const upsertInventoryForOutlet = (
																			patch: Partial<InventoryDraft>,
																		) => {
																			const baseSupplier = supplierId
																				? { id: supplierId }
																				: { id: undefined };
																			const latest = getInventories();
																			const idx = latest.findIndex(
																				(row) =>
																					(row?.outlet?.id ?? "") ===
																					outlet.id,
																			);
																			if (idx >= 0) {
																				const next = latest.map(
																					(row, rowIndex) => {
																						if (rowIndex !== idx) return row;
																						return {
																							...row,
																							...patch,
																							supplier: supplierId
																								? { id: supplierId }
																								: row?.supplier,
																						};
																					},
																				);
																				setInventories(next);
																				return;
																			}

																			setInventories([
																				...latest,
																				{
																					outlet: { id: outlet.id },
																					supplier: baseSupplier,
																					...patch,
																				},
																			]);
																		};

																		return (
																			<div
																				key={invKey}
																				className="rounded border border-gray-200 bg-white p-2"
																			>
																				<div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-end">
																					<div className="sm:col-span-2">
																						<label
																							htmlFor={`${invKey}-outlet`}
																							className="block text-[11px] text-gray-600 mb-1"
																						>
																							Outlet
																						</label>
																						<input
																							id={`${invKey}-outlet`}
																							className="w-full rounded border border-gray-200 bg-white px-2 py-1 text-sm text-gray-900"
																							value={outlet.name}
																							readOnly
																							disabled
																						/>
																					</div>
																					<div>
																						<label
																							htmlFor={`${invKey}-qty`}
																							className="block text-[11px] text-gray-600 mb-1"
																						>
																							Qty
																						</label>
																						<input
																							id={`${invKey}-qty`}
																							className="w-full rounded border border-gray-200 bg-white px-2 py-1 text-sm text-gray-900"
																							type="number"
																							inputMode="numeric"
																							value={quantity}
																							onChange={(e) =>
																								upsertInventoryForOutlet({
																									quantity:
																										toNumberOrUndefined(
																											e.target.value,
																										),
																								})
																							}
																							disabled={!onChangeVariant}
																						/>
																					</div>
																					<div>
																						<label
																							htmlFor={`${invKey}-reorder-threshold`}
																							className="block text-[11px] text-gray-600 mb-1"
																						>
																							Reorder Threshold
																						</label>
																						<input
																							id={`${invKey}-reorder-threshold`}
																							className="w-full rounded border border-gray-200 bg-white px-2 py-1 text-sm text-gray-900"
																							type="number"
																							inputMode="numeric"
																							value={reorderThreshold}
																							onChange={(e) =>
																								upsertInventoryForOutlet({
																									reorderThreshold:
																										toNumberOrUndefined(
																											e.target.value,
																										),
																								})
																							}
																							disabled={!onChangeVariant}
																						/>
																					</div>
																					<div>
																						<label
																							htmlFor={`${invKey}-reorder-qty`}
																							className="block text-[11px] text-gray-600 mb-1"
																						>
																							Reorder Qty
																						</label>
																						<input
																							id={`${invKey}-reorder-qty`}
																							className="w-full rounded border border-gray-200 bg-white px-2 py-1 text-sm text-gray-900"
																							type="number"
																							inputMode="numeric"
																							value={reorderQty}
																							onChange={(e) =>
																								upsertInventoryForOutlet({
																									reorderQty:
																										toNumberOrUndefined(
																											e.target.value,
																										),
																								})
																							}
																							disabled={!onChangeVariant}
																						/>
																					</div>
																				</div>
																			</div>
																		);
																	})}
																</div>
															)}

															<div className="mt-2 text-[11px] text-gray-500">
																Supplier ID is inherited: {supplierId || "—"}
															</div>
														</>
													)}
												</div>
											</td>
										</tr>
									)}
								</React.Fragment>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ExpandableVariantsTable;
