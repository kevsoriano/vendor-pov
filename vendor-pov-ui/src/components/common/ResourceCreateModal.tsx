import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";

interface ResourceCreateModalProps {
	open: boolean;
	onClose: () => void;
	onCreate: (inputValue: string) => Promise<void>;
	label?: string;
	loading?: boolean;
}

export default function ResourceCreateModal({
	open,
	onClose,
	onCreate,
	label = "Name",
	loading = false,
}: ResourceCreateModalProps) {
	const [inputValue, setInputValue] = useState("");
	const [error, setError] = useState("");

	const handleCreate = async () => {
		if (!inputValue.trim()) {
			setError("This field is required.");
			return;
		}
		setError("");
		await onCreate(inputValue.trim());
		setInputValue("");
	};

	const handleClose = () => {
		setInputValue("");
		setError("");
		onClose();
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
			<DialogTitle>Create New Resource</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					label={label}
					type="text"
					fullWidth
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					error={!!error}
					helperText={error}
					disabled={loading}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} disabled={loading}>
					Cancel
				</Button>
				<Button onClick={handleCreate} disabled={loading || !inputValue.trim()} color="primary">
					{loading ? <CircularProgress size={20} /> : "Create"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
