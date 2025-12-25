import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
	const error = useRouteError() as { statusCode: number; data: { message: string } };

	let title = "An error occurred!";
	let message = "Something went wrong!";

	if (error.statusCode === 500) {
		message = error.data.message;
	}

	if (error.statusCode === 404) {
		title = "Not found!";
		message = "Could not find resource or page.";
	}

	return (
		<>
			<div className="flex flex-col gap-2">
				<p>{message}</p>
				<Link to="/home">Go back to Home</Link>
			</div>
		</>
	);
}

export default ErrorPage;
