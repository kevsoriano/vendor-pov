import { getAuthToken } from "./auth";

const BASE_URL = "http://localhost:8082";
const token = getAuthToken();

export async function fetchAvailableUsers() {
	const response = await fetch(`${BASE_URL}/users`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const resData = await response.json();

	if (!response.ok) {
		throw new Error(resData.message || "Failed to fetch users.");
	}

	return resData;
}

export async function create(body: any) {
	const response = await fetch(`${BASE_URL}/users/add`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const resData = await response.json();

	if (!response.ok) {
		throw new Error(resData.message || "Failed to create resource.");
	}

	return resData;
}

export async function update(id: number, body: any) {
	const response = await fetch(`${BASE_URL}/users/${id}`, {
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
