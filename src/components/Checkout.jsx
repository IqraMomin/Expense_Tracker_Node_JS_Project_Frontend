import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";


function Checkout() {
    const isPremium = useSelector(state=>state.auth.isPremium);
    
    
    let cashfree;
    var initializeSDK = async function () {
        cashfree = await load({
            mode: "sandbox"
        });
    }
    initializeSDK();

    

    const doPayment = async () => {

        try {
            
            const token = Cookies.get("user");
            const response =await axios.post("http://3.6.41.27:3000/pay",{},{
                headers:{
                    "Authorization":token
                }});
                let checkoutOptions = {
                    paymentSessionId: response.data.paymentSessionId,
                    redirectTarget: "_self",
                };
            await cashfree.checkout(checkoutOptions);

        } catch (err) {
            console.log(err);
        }


    };

    return (
        <div className="row">
           {!isPremium && <Button onClick={doPayment}>Buy Premium</Button>} 
        </div>
    );
}
export default Checkout;