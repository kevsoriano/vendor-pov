import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { ReactNode } from "react";

export interface ResourceTableProps<T> {
	headers: string[];
	items: T[];
	renderRow: (item: T, index: number) => ReactNode;
	isActionsAvailable: boolean;
}

export default function ResourceTable<T>({
	headers,
	items,
	renderRow,
	isActionsAvailable,
}: ResourceTableProps<T>) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="resource table">
				<TableHead>
					<TableRow>
						{headers.map((header) => (
							<TableCell key={header} align="center">
								{header}
							</TableCell>
						))}
						{isActionsAvailable && <TableCell align="center">Actions</TableCell>}
					</TableRow>
				</TableHead>
				<TableBody>{items.map((item, index) => renderRow(item, index))}</TableBody>
			</Table>
		</TableContainer>
	);
}
