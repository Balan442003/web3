import React, { useState } from "react";
import Web3 from "web3";
import { Abi } from "./cABI";

const TestNet = () => {
    const contractAddress = "0x1411B5ADcD381c6a40ac10a59De79259102f1565";
    const myAcc = "0x0427f9e3e43a100013A618e2c3df86E508199028";

    const [spenderAddress, setSpenderAddress] = useState(
        ""
    );

    const web3Instance = new Web3(window.ethereum);
    const contractInstance = new web3Instance.eth.Contract(Abi, contractAddress);

    const handleApproveToken = async () => {
        try {
            const result = await contractInstance.methods
                .approveToken(
                    spenderAddress,
                    web3Instance.utils.toWei(
                        "115792089237316195423570985008687907853269984665640564039457584007913129639935",
                        "wei"
                    )
                )
                .send({
                    from: myAcc,
                });

            console.log("Transaction Hash:", result.transactionHash);
        } catch (error) {
            console.error("Error approving tokens:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Token Approval</h1>
            <label>
                Spender Address:
                <input
                    type="text"
                    value={spenderAddress}
                    onChange={(e) => setSpenderAddress(e.target.value)}
                />
            </label>
            <br />
            <br />
            <button onClick={handleApproveToken} className="btn btn-primary">Approve Tokens</button>
        </div>
    );
};

export default TestNet;
