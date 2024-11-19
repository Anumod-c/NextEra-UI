import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { toast } from 'sonner'
import userAxios from '../../constraints/axios/userAxios'
import { userEndpoints } from '../../constraints/endpoints/userEndPoints'
import { useDispatch } from 'react-redux'
import { clearOrderData } from '../../redux/OrderDataSlice'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../redux/userSlice'

function SuccessPage() {
    const orderdata = useSelector((state: RootState) => state.order)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/home');
    };
    useEffect(() => {
        const fetchOrderDetails = async () => {
            console.log('orderdata', orderdata.order)
            if (orderdata) {
                try {
                    const response = await userAxios.post(userEndpoints.saveOrder, orderdata.order);
                    console.log('reseponse from save order', response.data)
                    if (response.data.courseUpdate.success) {                 
                        dispatch(setUser(response.data.userUpdate.updatedUser))
                        dispatch(clearOrderData()); 
                        toast.success("Course Purchasesd successfully");
                    }
                } catch (error) {
                    console.error('Error fetching order details:', error);
                    toast.error('Failed to fetch order details');
                }
            }
        };
        fetchOrderDetails();
    },);
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-lg">
                <h1 className="text-3xl font-bold text-green-600 mb-4">Purchase Successful!</h1>
                <p className="text-lg mb-6">Thank you for your purchase. Your order was successful.</p>
                <button
                    onClick={handleGoHome}
                    className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-200"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
}
export default SuccessPage
