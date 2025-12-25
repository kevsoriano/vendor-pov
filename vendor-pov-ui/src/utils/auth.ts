import { redirect } from "react-router-dom";

export function getTokenDuration() {
	const storedExpirationDate = localStorage.getItem("expiration");
	if (!storedExpirationDate) {
		return -1;
	}
	const expirationDate = new Date(storedExpirationDate);
	const now = new Date();
	const duration = expirationDate.getTime() - now.getTime();
	return duration;
}

export function getAuthToken() {
	const token = localStorage.getItem("token");

	if (!token) {
		return null;
	}

	const tokenDuration = getTokenDuration();

	if (tokenDuration <= 0) {
		localStorage.removeItem("token");
		localStorage.removeItem("expiration");
		return "EXPIRED";
	}

	return token;
}

export function tokenLoader() {
	return getAuthToken();
}

export function checkAuthLoader() {
	const token = getAuthToken();

	if (!token) {
		return redirect("/auth?mode=login");
	}

	return null;
}
