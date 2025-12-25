import { redirect } from "react-router-dom";
import AuthForm from "./AuthForm";

function AuthenticationPage() {
	return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }: { request: Request }) {
	const BASE_URL = "http://localhost:8082";
	const searchParams = new URL(request.url).searchParams;
	const mode = searchParams.get("mode") || "login";

	if (mode !== "login" && mode !== "signup") {
		const message = "Unsupported mode!";
		throw { message, status: 422 };
	}

	const data = await request.formData();

	let response: Response | null = null;

	if (mode === "login") {
		response = await fetch(`${BASE_URL}/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: data.get("email"),
				password: data.get("password"),
			}),
		});
	} else if (mode === "signup") {
		response = await fetch(`${BASE_URL}/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName: data.get("firstName"),
				lastName: data.get("lastName"),
				email: data.get("email"),
				password: data.get("password"),
			}),
		});
	}

	if (!response || !response.ok) {
		const message = "Could not authenticate user.";
		throw { message, status: 422 };
	}

	if (response.status === 422 || response.status === 401) {
		return response;
	}

	const token = response.headers.get("token");

	if (token) {
		localStorage.setItem("token", token);
	}

	const expiration = new Date();
	expiration.setHours(expiration.getHours() + 1);

	localStorage.setItem("expiration", expiration.toISOString());

	return redirect("/users");
}
