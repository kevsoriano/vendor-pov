import { Add, ClearAll, Delete, Edit, InfoOutlined, PlayArrow, Save } from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./QAPromptTester.css";

interface PromptTest {
	prompt: string;
	expected: string;
	actual: string;
	aiModel: string;
	aiVersion: string;
	result: "pending" | "pass" | "fail" | "partial";
	createdAt: string;
}

const initialPrompt: PromptTest = {
	prompt: "",
	expected: "",
	actual: "",
	aiModel: "gpt-4",
	aiVersion: "2026-01-01",
	result: "pending",
	createdAt: new Date().toLocaleTimeString(),
};

const getSimilarity = (a: string, b: string) => {
	if (!a || !b) return 0;
	if (a.trim() === b.trim()) return 1;
	// Simple similarity: percent of matching chars in order
	let matches = 0;
	for (let i = 0; i < Math.min(a.length, b.length); i++) {
		if (a[i] === b[i]) matches++;
	}
	return matches / Math.max(a.length, b.length);
};

const QAPromptTester: React.FC = () => {
	const [tests, setTests] = useState<PromptTest[]>([]);
	const [selected, setSelected] = useState<number | null>(null);
	const [editIdx, setEditIdx] = useState<number | null>(null);
	const [editDraft, setEditDraft] = useState<PromptTest | null>(null);
	const [editorDraft, setEditorDraft] = useState<PromptTest | null>(null);

	// Summary
	const total = tests.length;
	const passed = tests.filter((t) => t.result === "pass").length;
	const failed = tests.filter((t) => t.result === "fail").length;
	const partial = tests.filter((t) => t.result === "partial").length;
	const avgScore = tests.length
		? Math.round(
				(tests.reduce((acc, t) => acc + getSimilarity(t.expected, t.actual), 0) /
					tests.length) *
					100,
			)
		: null;
	// Refs for expected/actual response fields
	const expectedRef = useRef<HTMLTextAreaElement | null>(null);
	const actualRef = useRef<HTMLTextAreaElement | null>(null);
	const [sharedHeight, setSharedHeight] = useState<number | undefined>(undefined);

	// Handler to sync height from either textarea
	const handleTextareaResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
		const el = e.currentTarget;
		setSharedHeight(el.offsetHeight);
	};

	// Keep both textareas at the same height
	useEffect(() => {
		if (sharedHeight && expectedRef.current && actualRef.current) {
			expectedRef.current.style.height = `${sharedHeight}px`;
			actualRef.current.style.height = `${sharedHeight}px`;
		}
	}, [sharedHeight]);

	const addTest = () => {
		setTests([...tests, { ...initialPrompt, createdAt: new Date().toLocaleTimeString() }]);
		setSelected(tests.length);
		setEditorDraft({ ...initialPrompt, createdAt: new Date().toLocaleTimeString() });
	};

	const removeTest = (idx: number) => {
		setTests(tests.filter((_, i) => i !== idx));
		if (selected === idx) {
			setSelected(null);
			setEditorDraft(null);
		}
	};

	// For main editor (center panel)
	const handleChange = (field: keyof PromptTest, value: string) => {
		if (selected === null) return;
		setEditorDraft((draft) => (draft ? { ...draft, [field]: value } : null));
	};

	// For sidebar edit
	const handleEditChange = (field: keyof PromptTest, value: string) => {
		setEditDraft((draft) => (draft ? { ...draft, [field]: value } : null));
	};

	// Save for main editor
	const saveTest = () => {
		if (selected === null || !editorDraft) return;
		setTests((tests) => tests.map((t, i) => (i === selected ? { ...editorDraft } : t)));
	};

	// Save for sidebar edit
	const saveEdit = (idx: number) => {
		if (editDraft == null) return;
		setTests((tests) => tests.map((t, i) => (i === idx ? { ...editDraft } : t)));
		setEditIdx(null);
		setEditDraft(null);
	};

	const runTest = (idx: number) => {
		setTests((tests) =>
			tests.map((t, i) => {
				if (i !== idx) return t;
				const sim = getSimilarity(t.expected, t.actual);
				let result: PromptTest["result"] = "fail";
				if (sim === 1) result = "pass";
				else if (sim > 0.5) result = "partial";
				return { ...t, result };
			}),
		);
	};

	const runAllTests = () => {
		setTests((tests) =>
			tests.map((t) => {
				const sim = getSimilarity(t.expected, t.actual);
				let result: PromptTest["result"] = "fail";
				if (sim === 1) result = "pass";
				else if (sim > 0.5) result = "partial";
				return { ...t, result };
			}),
		);
	};

	const clearAll = () => {
		setTests([]);
		setSelected(null);
		setEditorDraft(null);
	};

	// Keep editorDraft in sync with selected
	React.useEffect(() => {
		if (selected !== null && tests[selected]) {
			setEditorDraft({ ...tests[selected] });
		} else {
			setEditorDraft(null);
		}
	}, [selected, tests]);

	// UI
	return (
		<Box
			className="min-h-screen bg-gray-50 p-0 md:p-6"
			style={{ fontFamily: "Inter, sans-serif" }}
		>
			<Box className="flex items-center justify-between mb-6 px-2 md:px-0">
				<Box className="flex items-center gap-3">
					<Box className="bg-teal-500 rounded-lg p-2">
						<svg width="28" height="28" fill="none" viewBox="0 0 24 24">
							<title>Logo</title>
							<rect width="24" height="24" rx="6" fill="#14b8a6" />
							<path d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h6v2H7v-2z" fill="#fff" />
						</svg>
					</Box>
					<Box>
						<Typography variant="h5" className="font-bold text-gray-800">
							Prompt QA
						</Typography>
						<Typography variant="body2" className="text-gray-500">
							Test AI prompt accuracy
						</Typography>
					</Box>
				</Box>
				<Box className="flex gap-2">
					<Button
						variant="outlined"
						color="inherit"
						startIcon={<ClearAll />}
						onClick={clearAll}
						disabled={!tests.length}
					>
						Clear All
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={runAllTests}
						startIcon={<PlayArrow />}
						disabled={!tests.length}
						style={{ background: "#14b8a6" }}
					>
						Run All Tests
					</Button>
				</Box>
			</Box>
			<Box className="grid grid-cols-1 md:grid-cols-5 gap-6">
				{/* Sidebar: Test Cases */}
				<Card className="col-span-1 shadow-sm">
					<CardContent>
						<Typography variant="subtitle1" className="font-semibold mb-2">
							Test Cases - {total} Total
						</Typography>
						<Button
							variant="contained"
							color="primary"
							startIcon={<Add />}
							onClick={addTest}
							fullWidth
							style={{ background: "#14b8a6", marginBottom: 12 }}
						>
							Add Test
						</Button>
						<Divider className="mb-2" />
						<List className="qa-prompt-tester-sidebar-scroll">
							{tests.length === 0 && (
								<ListItem>
									<ListItemText
										primary={<span className="text-gray-400">No test cases yet</span>}
									/>
								</ListItem>
							)}
							{tests.map((t, i) => (
								<ListItem
									key={t.prompt}
									className="rounded-lg mb-1 hover:bg-teal-50"
									secondaryAction={
										<Box className="flex gap-1">
											<Tooltip title="Edit">
												<IconButton
													edge="end"
													onClick={(e) => {
														e.stopPropagation();
														setEditIdx(i);
														setEditDraft({ ...t });
													}}
												>
													<Edit fontSize="small" />
												</IconButton>
											</Tooltip>
											<Tooltip title="Delete">
												<IconButton
													edge="end"
													onClick={(e) => {
														e.stopPropagation();
														removeTest(i);
													}}
												>
													<Delete fontSize="small" />
												</IconButton>
											</Tooltip>
										</Box>
									}
									disablePadding
								>
									{editIdx === i && editDraft ? (
										<Box className="w-full flex flex-col gap-1">
											<TextField
												size="small"
												label="Prompt"
												value={editDraft.prompt}
												onChange={(e) => handleEditChange("prompt", e.target.value)}
												className="mb-1"
											/>
											<TextField
												size="small"
												label="Expected"
												value={editDraft.expected}
												onChange={(e) => handleEditChange("expected", e.target.value)}
												className="mb-1"
											/>
											<TextField
												size="small"
												label="Actual"
												value={editDraft.actual}
												onChange={(e) => handleEditChange("actual", e.target.value)}
												className="mb-1"
											/>
											<Box className="flex gap-2 mt-1">
												<Button
													size="small"
													variant="contained"
													color="primary"
													startIcon={<Save />}
													onClick={(e) => {
														e.stopPropagation();
														saveEdit(i);
													}}
													style={{ background: "#14b8a6" }}
												>
													Save
												</Button>
												<Button
													size="small"
													variant="outlined"
													onClick={(e) => {
														e.stopPropagation();
														setEditIdx(null);
														setEditDraft(null);
													}}
												>
													Cancel
												</Button>
											</Box>
										</Box>
									) : (
										<ListItemButton
											selected={selected === i}
											onClick={() => setSelected(i)}
											className="rounded-lg"
										>
											<ListItemText
												primary={
													<span className="truncate font-medium">
														{t.prompt ? t.prompt.slice(0, 18) : "Empty prompt..."}
													</span>
												}
												secondary={
													<span className="text-xs text-gray-400">{t.createdAt}</span>
												}
											/>
											{t.result !== "pending" && (
												<Chip
													label={
														t.result === "pass"
															? "Passed"
															: t.result === "fail"
																? "Failed"
																: "Partial"
													}
													size="small"
													style={{
														background:
															t.result === "pass"
																? "#22c55e"
																: t.result === "fail"
																	? "#ef4444"
																	: "#f59e42",
														color: "#fff",
														marginLeft: 8,
													}}
												/>
											)}
										</ListItemButton>
									)}
								</ListItem>
							))}
						</List>
					</CardContent>
				</Card>

				{/* Main Panel: Test Case Editor & Summary */}
				<Box className="col-span-4 flex flex-col gap-6">
					{/* Summary Cards */}
					<Box className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<Card className="bg-white shadow-sm">
							<CardContent className="text-center">
								<Typography variant="subtitle2" className="text-green-600">
									PASSED
								</Typography>
								<Typography variant="h5" className="font-bold text-green-600">
									{passed}
								</Typography>
							</CardContent>
						</Card>
						<Card className="bg-white shadow-sm">
							<CardContent className="text-center">
								<Typography variant="subtitle2" className="text-yellow-600">
									PARTIAL
								</Typography>
								<Typography variant="h5" className="font-bold text-yellow-600">
									{partial}
								</Typography>
							</CardContent>
						</Card>
						<Card className="bg-white shadow-sm">
							<CardContent className="text-center">
								<Typography variant="subtitle2" className="text-red-600">
									FAILED
								</Typography>
								<Typography variant="h5" className="font-bold text-red-600">
									{failed}
								</Typography>
							</CardContent>
						</Card>
						<Card className="bg-white shadow-sm">
							<CardContent className="text-center">
								<Typography variant="subtitle2" className="text-cyan-600">
									AVG SCORE
								</Typography>
								<Typography variant="h5" className="font-bold text-cyan-600">
									{avgScore !== null ? `${avgScore}%` : "-"}
								</Typography>
							</CardContent>
						</Card>
					</Box>

					{/* Test Case Editor */}
					<Card className="shadow-sm">
						<CardContent>
							{selected === null || !editorDraft ? (
								<Box className="flex flex-col items-center justify-center py-16">
									<Typography variant="h6" className="text-gray-400 mb-2">
										No Test Case Selected
									</Typography>
									<Typography variant="body2" className="text-gray-400 mb-4">
										Add a test case or select one from the list
									</Typography>
									<Button
										variant="contained"
										color="primary"
										onClick={addTest}
										style={{ background: "#14b8a6" }}
									>
										Add Test Case
									</Button>
								</Box>
							) : (
								<Box>
									<Box className="flex flex-col md:flex-row gap-6 mb-6">
										<Box className="flex-1">
											<Box className="flex items-center gap-1 mb-1">
												<Typography variant="subtitle2" className="text-gray-600">
													PROMPT
												</Typography>
												<Tooltip title="The input prompt you want to test against the AI.">
													<InfoOutlined
														fontSize="small"
														color="action"
														style={{ cursor: "pointer" }}
													/>
												</Tooltip>
											</Box>
											<TextField
												multiline
												minRows={3}
												fullWidth
												placeholder="Enter the prompt to test..."
												value={editorDraft.prompt}
												onChange={(e) => handleChange("prompt", e.target.value)}
												variant="outlined"
												className="bg-white qa-prompt-tester-resizable"
											/>
										</Box>
									</Box>
									<Box className="flex flex-col md:flex-row gap-6">
										<Box className="flex-1">
											<Box className="flex items-center gap-1 mb-1">
												<Typography variant="subtitle2" className="text-gray-600">
													EXPECTED RESPONSE
												</Typography>
												<Tooltip title="The ideal or correct response you expect from the AI for this prompt.">
													<InfoOutlined
														fontSize="small"
														color="action"
														style={{ cursor: "pointer" }}
													/>
												</Tooltip>
											</Box>
											<textarea
												ref={expectedRef}
												className="bg-white qa-prompt-tester-resizable block w-full border border-gray-300 rounded p-2 text-base font-mono focus:outline-none focus:ring-2 focus:ring-teal-400"
												style={{
													minHeight: 48,
													maxHeight: 300,
													resize: "vertical",
													height: sharedHeight ? sharedHeight : undefined,
												}}
												placeholder="Enter what you expect the AI to respond with..."
												value={editorDraft.expected}
												onChange={(e) => {
													handleChange("expected", e.target.value);
													handleTextareaResize(e);
												}}
												onInput={handleTextareaResize}
												onMouseUp={handleTextareaResize}
											/>
										</Box>
										<Box className="flex-1">
											<Box className="flex items-center gap-1 mb-1">
												<Typography variant="subtitle2" className="text-gray-600">
													ACTUAL RESPONSE
												</Typography>
												<Tooltip title="The real response returned by the AI for this prompt.">
													<InfoOutlined
														fontSize="small"
														color="action"
														style={{ cursor: "pointer" }}
													/>
												</Tooltip>
											</Box>
											<textarea
												ref={actualRef}
												className="bg-white qa-prompt-tester-resizable block w-full border border-gray-300 rounded p-2 text-base font-mono focus:outline-none focus:ring-2 focus:ring-teal-400"
												style={{
													minHeight: 48,
													maxHeight: 300,
													resize: "vertical",
													height: sharedHeight ? sharedHeight : undefined,
												}}
												placeholder="Enter the actual AI response..."
												value={editorDraft.actual}
												onChange={(e) => {
													handleChange("actual", e.target.value);
													handleTextareaResize(e);
												}}
												onInput={handleTextareaResize}
												onMouseUp={handleTextareaResize}
											/>
										</Box>
										<Box className="flex-1 flex flex-col gap-2">
											<Typography variant="subtitle2" className="mb-1 text-gray-600">
												RESPONSE COMPARISON
											</Typography>
											<Box className="flex items-center gap-2 mt-2">
												<Typography variant="caption" className="text-gray-500">
													Similarity Score:
												</Typography>
												<Typography
													variant="subtitle2"
													className={
														getSimilarity(
															editorDraft.expected,
															editorDraft.actual,
														) === 1
															? "text-green-600"
															: getSimilarity(
																		editorDraft.expected,
																		editorDraft.actual,
																	) > 0.5
																? "text-yellow-600"
																: "text-red-600"
													}
												>
													{Math.round(
														getSimilarity(editorDraft.expected, editorDraft.actual) *
															100,
													)}
													%
												</Typography>
											</Box>
										</Box>
									</Box>
									{/* AI Model and Version fields */}
									<Box className="flex flex-col md:flex-row gap-6 mt-4">
										<Box className="flex-1">
											<Box className="flex items-center gap-1 mb-1">
												<Typography variant="subtitle2" className="text-gray-600">
													AI MODEL
												</Typography>
												<Tooltip title="The AI model used for this test case (e.g., gpt-4, gpt-3.5-turbo).">
													<InfoOutlined
														fontSize="small"
														color="action"
														style={{ cursor: "pointer" }}
													/>
												</Tooltip>
											</Box>
											<TextField
												fullWidth
												placeholder="e.g., gpt-4"
												value={editorDraft.aiModel}
												onChange={(e) => handleChange("aiModel", e.target.value)}
												variant="outlined"
												className="bg-white qa-prompt-tester-resizable mb-2"
											/>
										</Box>
										<Box className="flex-1">
											<Box className="flex items-center gap-1 mb-1">
												<Typography variant="subtitle2" className="text-gray-600">
													AI VERSION
												</Typography>
												<Tooltip title="The version or date of the AI model used (e.g., 2026-01-01).">
													<InfoOutlined
														fontSize="small"
														color="action"
														style={{ cursor: "pointer" }}
													/>
												</Tooltip>
											</Box>
											<TextField
												fullWidth
												placeholder="e.g., 2026-01-01"
												value={editorDraft.aiVersion}
												onChange={(e) => handleChange("aiVersion", e.target.value)}
												variant="outlined"
												className="bg-white qa-prompt-tester-resizable mb-2"
											/>
										</Box>
									</Box>
									<Box className="flex justify-end mt-6 gap-2">
										<Button
											variant="contained"
											color="primary"
											startIcon={<Save />}
											onClick={saveTest}
											style={{ background: "#14b8a6" }}
										>
											Save
										</Button>
										<Button
											variant="contained"
											color="primary"
											startIcon={<PlayArrow />}
											onClick={() => runTest(selected)}
											style={{ background: "#14b8a6" }}
										>
											Run Test
										</Button>
									</Box>
								</Box>
							)}
						</CardContent>
					</Card>
				</Box>
			</Box>
		</Box>
	);
};

export default QAPromptTester;

// (removed all code after this point)
