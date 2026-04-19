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
            const response =await axios.post("http://localhost:3000/pay");
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
        <div class="row">
            <Button onClick={doPayment}>Buy Premium</Button>
        </div>
    );
}
export default Checkout;