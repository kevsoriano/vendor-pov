import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { ReactNode } from "react";

export interface ResourceTableProps<T> {
    headers: string[];
    items: T[];
    renderRow: (item: T, index: number) => ReactNode;
}

export default function ResourceTable<T>({
    headers,
    items,
    renderRow,
}: ResourceTableProps<T>) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="resource table">
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={index} align="center">{header}</TableCell>
                        ))}
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item, index) => renderRow(item, index))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}