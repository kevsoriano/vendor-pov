import React from "react";
import ResourceTable from "./ResourceTable";

export interface Place {
	id: string | number;
	image: { src: string; alt: string };
	title: string;
}

interface Props {
	title?: string;
	places: Place[];
	isLoading?: boolean;
	onSelect?: (p: Place) => void;
}

export default function PlacesList({
	title = "Places",
	places,
	isLoading = false,
	onSelect,
}: Props) {
	return (
		<ResourceTable
			title={title}
			items={places}
			isLoading={isLoading}
			keyExtractor={(p) => p.id}
			onSelect={onSelect}
			getImageSrc={(p) => `http://localhost:3000/${p.image.src}`}
			getImageAlt={(p) => p.image.alt}
			getTitle={(p) => p.title}
		/>
	);
}
