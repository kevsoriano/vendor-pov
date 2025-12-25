import { NavLink, Outlet } from "react-router-dom";

const Customers = () => {
	const customers = [1, 2, 3, 4, 5];
	return (
		<>
			<div className="flex gap-2">
				<div className="flex flex-col gap-2">
					{customers &&
						customers.map((customer) => (
							<NavLink
								key={customer}
								to={`/customers/${customer}`}
								className={({ isActive }) => {
									return isActive ? "text-lg" : "";
								}}
							>
								Customer {customer}
							</NavLink>
						))}
				</div>
				<div>
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default Customers;
