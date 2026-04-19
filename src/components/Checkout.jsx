import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import { Button } from "react-bootstrap";

function Checkout() {
    let cashfree;
    var initializeSDK = async function () {
        cashfree = await load({
            mode: "sandbox"
        });
    }
    initializeSDK();

    const doPayment = async () => {

        try {
            const isPremium = localStorage.getItem("isPremium") ==="true";
            const token = localStorage.getItem("user");
            const response =await axios.post("http://localhost:3000/pay",{},{
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