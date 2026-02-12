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
	suppliers?: Array<{ id: string; name: string }>;
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

const getPrimarySupplierLabel = (variant: VariantRowBase) => {
	const primary = variant.supplierProductVariants?.[0]?.supplier;
	return primary?.name ?? primary?.id ?? "—";
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
	suppliers = [],
	outlets = [],
	onChangeVariant,
}: ExpandableVariantsTableProps<TVariant>) => {
	const [expandedKey, setExpandedKey] = React.useState<string | null>(null);
	const [activeTabByKey, setActiveTabByKey] = React.useState<
		Record<string, "details" | "inventories">
	>({});
	const [inventoryKeysByVariant, setInventoryKeysByVariant] = React.useState<
		Record<string, string[]>
	>({});
	const [draftMoney, setDraftMoney] = React.useState<
		Record<string, { supplierPrice?: string; retailPrice?: string }>
	>({});

	const createInventoryKey = React.useCallback(() => {
		const maybeCrypto = globalThis.crypto as unknown as { randomUUID?: () => string };
		if (typeof maybeCrypto?.randomUUID === "function") {
			return maybeCrypto.randomUUID();
		}
		return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
	}, []);

	React.useEffect(() => {
		setInventoryKeysByVariant((prev) => {
			let changed = false;
			const next: Record<string, string[]> = { ...prev };
			variants.forEach((variant, index) => {
				const rowKey = getVariantRowKeyFromAttributes(variant.productAttributes, index);
				const invCount = Array.isArray(variant.inventories) ? variant.inventories.length : 0;
				const existing = next[rowKey] ?? [];
				if (existing.length === invCount) return;
				changed = true;
				if (existing.length > invCount) {
					next[rowKey] = existing.slice(0, invCount);
					return;
				}
				const padded = [...existing];
				while (padded.length < invCount) padded.push(createInventoryKey());
				next[rowKey] = padded;
			});
			return changed ? next : prev;
		});
	}, [variants, createInventoryKey]);

	return (
		<div className="mt-3 border border-gray-200 rounded-md overflow-hidden bg-white">
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200 text-sm">
					<colgroup>
						<col style={{ width: 44 }} />
						<col style={{ width: 160 }} />
						<col style={{ width: 160 }} />
						<col style={{ width: 140 }} />
						<col style={{ width: 140 }} />
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
							<th className="px-3 py-2 text-left font-medium text-gray-700">Supplier</th>
							<th className="px-3 py-2 text-right font-medium text-gray-700">
								Supplier Price
							</th>
							<th className="px-3 py-2 text-right font-medium text-gray-700">
								Retail Price
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
							const supplierPriceValue =
								typeof variant.supplierProductVariants?.[0]?.supplierPrice === "number"
									? String(variant.supplierProductVariants?.[0]?.supplierPrice)
									: "";

							const retailPriceValue =
								typeof variant.retailPrice === "number" ? String(variant.retailPrice) : "0";

							const draftSupplierPrice = draftMoney[rowKey]?.supplierPrice;
							const draftRetailPrice = draftMoney[rowKey]?.retailPrice;

							const updateVariant = (patch: Partial<TVariant>) => {
								if (!onChangeVariant) return;
								onChangeVariant(rowKey, { ...variant, ...patch } as TVariant);
							};

							const getInventories = () =>
								Array.isArray(variant.inventories) ? variant.inventories : [];

							const setInventories = (nextInventories: InventoryDraft[]) => {
								updateVariant({ inventories: nextInventories } as Partial<TVariant>);
							};

							const updatePrimarySupplier = (nextSupplier: {
								id?: string;
								name?: string;
							}) => {
								const currentPrimary = variant.supplierProductVariants?.[0];
								const nextPrimary = {
									...(currentPrimary ?? {}),
									supplier: nextSupplier,
								};

								const patch: Record<string, unknown> = {
									supplierProductVariants: [nextPrimary],
								};

								const nextSupplierId = nextSupplier.id;
								const existingInventories = getInventories();
								if (nextSupplierId && existingInventories.length > 0) {
									patch.inventories = existingInventories.map((inv) => ({
										...inv,
										supplier: {
											...(inv?.supplier ?? {}),
											id: nextSupplierId,
										},
									}));
								}

								updateVariant(patch as Partial<TVariant>);
							};

							const updateSupplierPrice = (value: string) => {
								const currentPrimary = variant.supplierProductVariants?.[0];
								const nextPrimary = {
									...(currentPrimary ?? {}),
									supplierPrice: toNumberOrUndefined(value),
								};
								updateVariant({
									supplierProductVariants: [nextPrimary],
								} as Partial<TVariant>);
							};

							const updateRetailPrice = (value: string) => {
								updateVariant({
									retailPrice: toNumberOrUndefined(value),
								} as Partial<TVariant>);
							};

							const addInventoryRow = () => {
								const firstOutletId = outlets[0]?.id;
								const nextRow: InventoryDraft = {
									outlet: { id: firstOutletId },
									supplier: { id: supplierId || undefined },
									quantity: 20,
									reorderThreshold: 10,
									reorderQty: 5,
								};
								setInventoryKeysByVariant((prev) => {
									const existing = prev[rowKey] ?? [];
									return {
										...prev,
										[rowKey]: [...existing, createInventoryKey()],
									};
								});
								setInventories([...getInventories(), nextRow]);
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
										<td className="px-3 py-2 align-top text-gray-700">
											{suppliers.length > 0 ? (
												<select
													className="w-full rounded border border-gray-200 bg-white px-2 py-1 text-sm text-gray-900"
													value={supplierId}
													onChange={(e) => {
														const nextId = e.target.value;
														const match = suppliers.find((s) => s.id === nextId);
														updatePrimarySupplier({
															id: match?.id ?? nextId,
															name: match?.name,
														});
													}}
													disabled={!onChangeVariant}
												>
													<option value="">—</option>
													{suppliers.map((s) => (
														<option key={s.id} value={s.id}>
															{s.name}
														</option>
													))}
												</select>
											) : (
												<div className="text-gray-900">
													{getPrimarySupplierLabel(variant)}
												</div>
											)}
										</td>
										<td className="px-3 py-2 align-top text-right text-gray-700 tabular-nums">
											<div className="flex items-center rounded border border-gray-200 bg-white px-2 py-1">
												<span className="text-gray-500 mr-1">$</span>
												<input
													className="no-spinner w-full bg-transparent text-sm text-right text-gray-900 tabular-nums outline-none"
													type="text"
													inputMode="decimal"
													placeholder="—"
													value={draftSupplierPrice ?? supplierPriceValue}
													style={{ MozAppearance: "textfield", textAlign: "right" }}
													onChange={(e) => {
														const formatted = formatMoneyInput(e.target.value);
														setDraftMoney((prev) => ({
															...prev,
															[rowKey]: {
																...prev[rowKey],
																supplierPrice: formatted,
															},
														}));
														if (formatted === "") {
															updateSupplierPrice("");
														} else if (isStableMoney(formatted)) {
															updateSupplierPrice(formatted);
														}
													}}
													onBlur={(e) => {
														const formatted = formatMoneyInput(e.target.value);
														updateSupplierPrice(formatted);
														setDraftMoney((prev) => {
															const next = { ...prev };
															const current = next[rowKey];
															if (!current) return next;
															next[rowKey] = {
																...current,
																supplierPrice: undefined,
															};
															return next;
														});
													}}
													disabled={!onChangeVariant}
												/>
											</div>
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
										<td className="px-3 py-2 align-top text-gray-700">
											{formatAttributesSummary(variant.productAttributes)}
										</td>
									</tr>

									{isExpanded && (
										<tr className="bg-gray-50">
											<td className="px-2 py-3 border-r border-gray-100" />
											<td className="px-3 py-3" colSpan={5}>
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
																<button
																	type="button"
																	className="rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 hover:bg-gray-50"
																	onClick={addInventoryRow}
																	disabled={
																		!onChangeVariant || outlets.length === 0
																	}
																>
																	Add inventory
																</button>
															</div>

															{outlets.length === 0 ? (
																<div className="text-gray-500">
																	No outlets available.
																</div>
															) : getInventories().length === 0 ? (
																<div className="text-gray-500">
																	No inventories yet.
																</div>
															) : (
																<div className="space-y-2">
																	{getInventories().map((inv, invIndex) => {
																		const invKey =
																			(inventoryKeysByVariant[rowKey] ?? [])[
																				invIndex
																			] ?? createInventoryKey();
																		const outletId = inv?.outlet?.id ?? "";
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

																		const updateInventoryAt = (
																			patch: Partial<InventoryDraft>,
																		) => {
																			const current = getInventories();
																			const next = current.map((row, idx) => {
																				if (idx !== invIndex) return row;
																				const nextSupplier = supplierId
																					? { id: supplierId }
																					: row?.supplier;
																				return {
																					...row,
																					...patch,
																					supplier: nextSupplier,
																				};
																			});
																			setInventories(next);
																		};

																		const removeInventoryAt = () => {
																			const current = getInventories();
																			setInventoryKeysByVariant((prev) => {
																				const existing = prev[rowKey] ?? [];
																				return {
																					...prev,
																					[rowKey]: existing.filter(
																						(k) => k !== invKey,
																					),
																				};
																			});
																			setInventories(
																				current.filter(
																					(_, idx) => idx !== invIndex,
																				),
																			);
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
																						<select
																							id={`${invKey}-outlet`}
																							className="w-full rounded border border-gray-200 bg-white px-2 py-1 text-sm text-gray-900"
																							value={outletId}
																							onChange={(e) =>
																								updateInventoryAt({
																									outlet: {
																										id: e.target.value,
																									},
																								})
																							}
																							disabled={!onChangeVariant}
																						>
																							<option value="">
																								Select outlet
																							</option>
																							{outlets.map((o) => (
																								<option
																									key={o.id}
																									value={o.id}
																								>
																									{o.name}
																								</option>
																							))}
																						</select>
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
																								updateInventoryAt({
																									quantity:
																										toNumberOrUndefined(
																											e.target.value,
																										) ?? 0,
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
																								updateInventoryAt({
																									reorderThreshold:
																										toNumberOrUndefined(
																											e.target.value,
																										) ?? 0,
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
																								updateInventoryAt({
																									reorderQty:
																										toNumberOrUndefined(
																											e.target.value,
																										) ?? 0,
																								})
																							}
																							disabled={!onChangeVariant}
																						/>
																					</div>
																					<div className="flex justify-end">
																						<button
																							type="button"
																							className="rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 hover:bg-gray-50"
																							onClick={removeInventoryAt}
																							disabled={!onChangeVariant}
																						>
																							Remove
																						</button>
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
