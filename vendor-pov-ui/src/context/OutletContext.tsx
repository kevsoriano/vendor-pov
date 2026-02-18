import { createContext } from "react";

export const OutletContext = createContext<{
	selectedOutlet: string;
	setSelectedOutlet: (outlet: string) => void;
}>({
	selectedOutlet: "",
	setSelectedOutlet: () => {},
});
