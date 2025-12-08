import { useParams } from "react-router-dom";

const Customer = () => {
    const params = useParams<{ productId: string }>();

    return (
        <>
            <div className='flex flex-col gap-2'>
                <div>Customer Page { params.productId }</div>
            </div>
        </>
    )
}

export default Customer;