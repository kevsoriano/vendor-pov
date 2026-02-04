import { Link } from "react-router-dom";

const AddProduct = () => {
	const handleSubmit = (formData: FormData) => {
		const name = formData.get("name");
		const description = formData.get("description");
		console.log(name, description);
	};

	return (
		<div>
			<div className="px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]">
				<h1>Products</h1>
			</div>
			<div className="flex justify-between px-4 sm:px-6 lg:px-8 py-6 items-center">
				<p>Add, view and edit your products all in one place.</p>
				<div className="flex gap-2">
					<button type="button" className="bg-[#5d91b4] text-white">
						<Link to={"/products/add"}>Cancel</Link>
					</button>
					<button
						type="button"
						className={`inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
					>
						Save
					</button>
				</div>
			</div>
			<div className="flex flex-col px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]">
				<form action={handleSubmit}>
					<div className="flex">
						<div className="w-[15%]">
							<p>General</p>
						</div>
						<div className="flex flex-col w-full">
							<div className="flex flex-col w-[78%] mb-4">
								<label htmlFor="name" className="text-sm font-medium text-gray-900">
									Name
								</label>
								<div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border border-gray-300">
									<input
										type="text"
										name="name"
										id="name"
										className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
										placeholder="Enter a product name"
									/>
								</div>
							</div>

							<div className="flex flex-col w-[78%] mb-4 text-sm font-medium">
								<label htmlFor="description" className="text-sm font-medium text-gray-900">
									Description
								</label>
								<div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border border-gray-300">
									<input
										type="text"
										name="description"
										id="description"
										className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
										placeholder="Enter a product description"
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="flex">
						<div className="w-[15%]">
							<p>Inventory</p>
						</div>
					</div>
					<div>
						<button type="submit">Save</button>
						<button type="button">Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddProduct;
