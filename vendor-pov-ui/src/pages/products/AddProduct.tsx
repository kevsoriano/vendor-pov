import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const AddProduct = () => {

    const handleSubmit = (formData: any) => {
        const name = formData.get("name")
        const description = formData.get("description")
        console.log(name, description)
    }
    
	return (
        <div>
            <div className='px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]'>
                <h1>Products</h1>
            </div>
            <div className='flex justify-between px-4 sm:px-6 lg:px-8 py-6 items-center'>
                <p>Add, view and edit your products all in one place.</p>
                <div className='flex gap-2'>
                    <button className='bg-[#5d91b4] text-white'><Link to={'/products/add'} >Cancel</Link></button>
                    <button className='bg-[#2d25c4] text-white'>Save</button>
                </div>
            </div>
            <div className='flex flex-col px-4 sm:px-6 lg:px-8 py-6 bg-[#eff4f4]'>
                <form action={handleSubmit}>
                    <div className="flex">
                        <div className="w-[20%]"><p>General</p></div>
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col w-[78%]">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" className="border bg-white max-w-md p-2" placeholder="Enter a product name"/>
                            </div>
                            <div className="flex flex-col w-[78%]">
                                <label htmlFor="description">Description</label>
                                <input type="text" name="description" id="description" className="border bg-white max-w-md p-2" placeholder="Enter a product name"/>
                            </div>
                            <div className="flex flex-col w-[78%]">
                                <label htmlFor="brand">Brand</label>
                                <input type="text" name="brand" id="brand" className="border bg-white max-w-md p-2" placeholder="Enter a product name"/>
                            </div>
                            <div className="flex flex-col w-[78%]">
                                <label htmlFor="supplier">Supplier</label>
                                <input type="text" name="supplier" id="supplier" className="border bg-white max-w-md p-2" placeholder="Enter a product name"/>
                            </div>
                            <div className="flex flex-col w-[78%]">
                                <label htmlFor="productType">Product Type</label>
                                <input type="text" name="productType" id="productType" className="border bg-white max-w-md p-2" placeholder="Enter a product name"/>
                            </div>
                            <div className="flex flex-col w-[78%]">
                                <label htmlFor="productTags">Product Tags</label>
                                <input type="text" name="productTags" id="productTags" className="border bg-white max-w-md p-2" placeholder="Enter a product name"/>
                            </div>
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
}

export default AddProduct;
