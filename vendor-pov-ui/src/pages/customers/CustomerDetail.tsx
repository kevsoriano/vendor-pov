import { useParams } from "react-router-dom";

const Customer = () => {
    const params = useParams<{ customerId: string }>();

    return (
        <>
            <div className='flex flex-col gap-2'>
                <div>Customer Page { params.customerId }</div>
            </div>
        </>
    )
}

export default Customer;