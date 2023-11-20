
// import React from 'react';
// import Web3 from 'web3';
// import { ABI } from './contractABI';
// // import { Button } from 'react-bootstrap';

// const Write = () => {
//     const account = "0x0427f9e3e43a100013A618e2c3df86E508199028";
//     const caccount = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

//     // Initialize web3 and contract instances
//     const web3Instance = new Web3(window.ethereum);

//     const contractInstance = new web3Instance.eth.Contract(
//         ABI,
//         caccount
//     );

//     const pauseContract = async () => {
//         try {

//             await contractInstance.methods.pause().send({ from: account });
//             console.log('Contract paused successfully');
//         } catch (error) {
//             console.error('Error pausing contract:', error);
//         }
//     };

//     const transferAmt = async () => {
//         try {
//             const toAddress = "0x96Bb411C9F4AC36Cfbf3AaB32bE43EC6408Fd64d";
//             const amount = "1024560";

//             const senderAddress = "0x0427f9e3e43a100013A618e2c3df86E508199028";

//             const web3Instance = new Web3(window.ethereum);

//             const contractInstance = new web3Instance.eth.Contract(
//                 ABI,
//                 caccount
//             );

//             const transfered = await contractInstance.methods
//                 .transfer(toAddress, amount)
//                 .send({ from: senderAddress });

//             console.log(transfered, "transferred");
//         } catch (error) {
//             console.error("Error transferring funds:", error.message);
//         }
//     };

//     return (
//         <div>
//             <p>Connected Account: {account}</p>
//             <button onClick={pauseContract} className='btn btn-info'>Pause Contract</button>
//             <button onClick={transferAmt} className="ms-3 btn btn-primary">
//                 Transfer amount
//             </button>
//         </div>
//     );
// };

// export default Write;



import React from 'react';
import { useState } from 'react';
import Web3 from 'web3';
import { ABI } from './contractABI'
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
import { Button, Form, Card } from 'react-bootstrap';

// const validationSchema = Yup.object().shape({
//     recipientAddress: Yup.string()
//         .required('recipientAddress is required').trim(),
//     amount: Yup.string()
//         .required('amount is required').trim(),
//     recipientaddress: Yup.string()
//         .required('recipientaddress is required').trim()
// });

const Write = () => {
    const [toAddressInput, setToAddressInput] = useState("");
    const [valueInput, setValueInput] = useState("");
    const [toAddressBlackList, settoAddressBlackList] = useState("");

    // const { register, handleSubmit, reset, trigger, formState: { errors } } = useForm({
    //     resolver: yupResolver(validationSchema),
    //     mode: 'all',
    // });
    const account = "0x0427f9e3e43a100013A618e2c3df86E508199028";

    const caccount = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    const abi = ABI;

    const web3Instance = new Web3(window.ethereum);
    const contractInstance = new web3Instance.eth.Contract(
        abi,
        caccount
    );

    const pauseContract = async () => {
        try {
            await contractInstance.methods.pause().send({ from: account });
            console.log('Contract paused successfully');
        } catch (error) {
            console.error('Error pausing contract:', error);
        }
    };

    const transferAmount = async () => {
        let toAddress = '0x4c7Cd983a716cA48F97D88be2a1Ec15f4c2e48Cb';
        let amount = 100;

        try {
            await contractInstance.methods.transfer(toAddress, amount).send({ from: account });
            console.log(`Transferred ${amount} tokens to ${toAddress}`);

        } catch (error) {
            console.error('Error transferring amount:', error);
        }
    };

    const unpauseContract = async () => {
        try {
            await contractInstance.methods.unpause().send({ from: account });
            console.log('Contract unpaused successfully');
        } catch (error) {
            console.error('Error unpausing contract:', error);
        }
    };

    const transferAmt = async (e) => {
        e.preventDefault()
        try {

            const web3 = new Web3(window.ethereum);
            if (web3) {
                const accounts = await web3.eth.getAccounts();

                if (accounts.length > 0) {
                    const amount = parseFloat(valueInput, "ether");

                    const senderAddress = accounts[0];
                    console.log(senderAddress);

                    const transfered = await contractInstance.methods
                        .transfer(toAddressInput, amount)
                        .send({ from: senderAddress });

                    console.log(transfered, "transferred");
                }
            }

        } catch (error) {
            console.error("Error transferring funds:", error.message);
        }
    };

    const blackList = async (e) => {
        e.preventDefault()
        try {
            const web3 = new Web3(window.ethereum);
            if (web3) {
                const accounts = await web3.eth.getAccounts();
                if (accounts.length > 0) {
                }
                const res = await contractInstance.methods
                    .removeBlackList(toAddressBlackList)
                    .send({ from: accounts[0] });
                console.log(res, "Cleared Blacklist");
            }
        } catch (error) {
            console.error("Error transferring funds:", error.message);
        }
    };



    return (

        <div>
            <p>Connected Account:<button className='btn btn-secondary'>{account}</button></p>
            <Button onClick={pauseContract} className='btn btn-info m-2'>Pause Contract</Button>
            <Button onClick={transferAmount} className='btn btn-warning m-2'>Transfer</Button>
            <Button onClick={unpauseContract} className='btn btn-danger m-2'>Unpause</Button>
            <Card style={{ width: '18rem' }} className='container mt-5'>
                <Card.Body>
                    <Card.Title>Transfer</Card.Title>
                    <Card.Text>
                        <Form onSubmit={transferAmt}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Transfer To Address</Form.Label>
                                <Form.Control type="text" value={toAddressInput}
                                    onChange={(e) => setToAddressInput(e.target.value)} placeholder="Enter recipient address"  />
                                {/* <div className="invalid-feedback">{errors.recipientAddress?.message}</div> */}
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Transfer Amount</Form.Label>
                                <Form.Control type="number" value={valueInput} 
                                    onChange={(e) => setValueInput(e.target.value)} placeholder="Enter amount" />
                                {/* <div className="invalid-feedback">{errors.amount?.message}</div> */}
                            </Form.Group>

                            <Button variant="dark" className='m-2' type="submit">
                                TransferFrom
                            </Button>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }} className='container mt-5 '>
                <Card.Body >
                    <Card.Title>removeBlackList</Card.Title>
                    <Card.Text>
                        <Form onSubmit={blackList}>
                            <Form.Group className="mb-3" >
                                <Form.Label>_clearedUser address</Form.Label>
                                <Form.Control type="text" value={toAddressBlackList}
                                    onChange={(e) => settoAddressBlackList(e.target.value)} placeholder="Enter recipient address" />
                                {/* <div className="invalid-feedback">{errors.recipientaddress?.message}</div> */}
                            </Form.Group>
                            <Button variant="dark" className='m-2' type="submit">
                                RemoveBlackList
                            </Button>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <br />


        </div>

    );
};

export default Write;

