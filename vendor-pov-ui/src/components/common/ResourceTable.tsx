import type React from "react";

export interface ResourceTableProps<T> {
	title?: string;
	items: T[];
	isLoading?: boolean;
	loading?: React.ReactNode;
	fallback?: React.ReactNode;
	className?: string;
	keyExtractor?: (item: T) => string | number;
	onSelect?: (item: T) => void;
	renderItem?: (item: T) => React.ReactNode;
	// convenience helpers for common layouts
	getImageSrc?: (item: T) => string | undefined;
	getImageAlt?: (item: T) => string | undefined;
	getTitle?: (item: T) => React.ReactNode;
}

export default function ResourceTable<T>({
	title,
	items,
	isLoading = false,
	loading,
	fallback,
	className,
	keyExtractor = (it: any) => it.id ?? JSON.stringify(it),
	onSelect,
	renderItem,
	getImageSrc,
	getImageAlt,
	getTitle,
}: ResourceTableProps<T>) {
	return (
		<section className={className ?? "places-category"}>
			{title && <h2>{title}</h2>}

			{isLoading ? (
				(loading ?? <p className="fallback-text">Loading…</p>)
			) : items.length === 0 ? (
				(fallback ?? <p className="fallback-text">No items found.</p>)
			) : (
				<ul className="places">
					{items.map((item) => {
						const key = keyExtractor(item);
						return (
							<li key={key} className="place-item">
								{renderItem ? (
									<div
										role="button"
										tabIndex={0}
										onClick={() => onSelect?.(item)}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") onSelect?.(item);
										}}
									>
										{renderItem(item)}
									</div>
								) : (
									<button type="button" onClick={() => onSelect?.(item)}>
										{getImageSrc && (
											<img
												src={getImageSrc(item)}
												alt={getImageAlt ? (getImageAlt(item) ?? "") : ""}
											/>
										)}
										<h3>{getTitle ? getTitle(item) : String(key)}</h3>
									</button>
								)}
							</li>
						);
					})}
				</ul>
			)}
		</section>
	);
}
