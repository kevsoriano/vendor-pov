import { getAuthToken } from "./auth";

const BASE_URL = "http://localhost:8082";

export async function deleteResource(path: string, id: string) {
	const token = getAuthToken();
	const response = await fetch(`${BASE_URL}/${path}/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const resData = await response.json();

	if (!response.ok) {
		throw new Error(resData.message || "Failed to delete resource.");
	}

	return resData;
}

export async function getAll(path: string) {
	const token = getAuthToken();
	const response = await fetch(`${BASE_URL}/${path}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const resData = await response.json();

	if (!response.ok) {
		throw new Error(resData.message || "Failed to fetch resources.");
	}

	return resData;
}

export async function get(path: string, id: string) {
	const token = getAuthToken();
	const response = await fetch(`${BASE_URL}/${path}/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const resData = await response.json();

	if (!response.ok) {
		throw new Error(resData.message || "Failed to fetch resources.");
	}

	return resData;
}

export async function create({ path, body }: { path: string; body: Record<string, unknown> }) {
	const token = getAuthToken();
	const response = await fetch(`${BASE_URL}/${path}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});
	const resData = await response.json();

	if (!response.ok) {
		throw new Error(resData.message || "Failed to create resource.");
	}

	return resData;
}

export async function update(path: string, id: string, body: Record<string, unknown>) {
	const token = getAuthToken();
	const response = await fetch(`${BASE_URL}/${path}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});

	const resData = await response.json();

	if (!response.ok) {
		throw new Error(resData.message || "Failed to update resource.");
	}

	return resData;
}
