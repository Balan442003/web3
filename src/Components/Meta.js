// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   const [web3, setWeb3] = useState(null);
//   const [address, setAddress] = useState('');
//   const [balance, setBalance] = useState('');
//   const [latestBlock, setLatestBlock] = useState('');
//   const [network, setNetwork] = useState('');

//   const handleLogin = async () => {
//     if (!web3) return;

//     // Check if Metamask is already logged in
//     const accounts = await web3.eth.getAccounts();
//     console.log(accounts);
//     if (accounts.length > 0) {
//       setAddress(accounts[0]);
//       setNetwork(parseInt(await web3.eth.net.getId(), 10));
//       console.log(network);
//       // Automatically switch to Mainnet if currently on a testnet (Ropsten or BSC Testnet)
//       if (network === 3 /* Ropsten Testnet */ || network === 97 /* BSC Testnet */) {
//         try {
//           await window.ethereum.request({
//             method: 'wallet_switchEthereumChain',
//             params: [{ chainId: '0x38' }], // Mainnet
//           });
//         }
//         catch(error) {
//           console.log(error);
//         }
        
//       }

//       // Request the latest block number
//       const latestBlockNumber = await web3.eth.getBlockNumber();
//       console.log(latestBlockNumber);
//       setLatestBlock(parseInt(latestBlockNumber));
//     } else {
//       // Prompt the user to log in
//       try {
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
//       } catch (error) {
//         console.error('User denied account access');
//       }
//     }
//   };

//   useEffect(() => {
//     if (window.ethereum) {
//       const web3 = new Web3(window.ethereum);
//       setWeb3(web3);

//       window.ethereum.on('accountsChanged', (accounts) => {
//         if (accounts.length > 0 && Web3.utils.isAddress(accounts[0])) {
//           setAddress(accounts[0]);
//         } else {
//           setAddress('');
//         }
//       });

//       window.ethereum.on('chainChanged', (chainId) => {
//         // Handle network change
//         setNetwork(parseInt(chainId, 16));
//       });

//       async function fetchData() {
//         if (address) {
//           const balance = await web3.eth.getBalance(address);
//           setBalance(web3.utils.fromWei(balance, 'ether'));
//         }
//       }

//       fetchData();
//     }
//   }, [address, network]);

//   return (
//     <div className='container mt-5'>
//       <button onClick={handleLogin} className='btn btn-outline-warning'>Login with Metamask</button>
//       <div>
//         Address: {address}
//       </div>
//       <div>
//         Balance: {balance} ETH
//       </div>
//       <div>
//         Latest Block: {latestBlock}
//       </div>
//       <div>
//         Network: {network}
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import Web3 from "web3";

const App = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [block, setBlock] = useState();
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
    }
  }, []);

  const btnHandler = async () => {
    if (web3) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      setAddress(accounts);

      if (accounts.length > 0) {
        web3.eth.getBalance(accounts[0]).then((balance) => {
          const balanceInEther = web3.utils.fromWei(balance, "ether");
          setBalance(balanceInEther);
        });

      } else {
        console.error("MetaMask not connected. Please connect your wallet.");
      }
    } else {
      console.error("MetaMask not installed.");
    }
  };

  const networkHandler = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: "0x38"
          }
        ]
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const blockHandler = async () => {
    await web3.eth.getBlockNumber().then((res) => setBlock((res)));
  }

  return (
    <div className="App mt-5 vh-100">
      <div className="text-center">
        <h4 className="form-label">
          <strong>Address: </strong>
          <i className="text-danger">{address}</i>
        </h4>
        <h4 className="form-label">
          <strong>Balance: </strong>
          <i className="text-info">{balance}</i>
        </h4>
        <button onClick={btnHandler} className="btn btn-outline-primary m-2">
          Connect to Wallet
        </button>
        <button onClick={networkHandler} className="btn btn-outline-success m-2">
          Switch to Network
        </button>
        <button onClick={blockHandler} className="btn btn-outline-warning">
          Latest Block
        </button><br/>
        <strong >Block Number:</strong>
        <i className="text-secondary">{parseInt(block)}</i>
      </div>
    </div>
  );
};

export default App;




// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';

// const ContractComponent = () => {
//   const [contract, setContract] = useState(null);
//   const [contractAddress, setContractAddress] = useState('0xYourContractAddress');
//   const [contractABI, setContractABI] = useState(null);
//   const [account, setAccount] = useState(null);
//   const [newValue, setNewValue] = useState('');
//   const [retrievedValue, setRetrievedValue] = useState('');

//   useEffect(() => {
//     async function loadContract() {
//       try {
//         const web3 = new Web3(window.ethereum);
//         const network = await web3.eth.net.getId();
//         const deployedContractABI = // Load your contract's ABI here
//         const deployedContractAddress = '0x0427f9e3e43a100013A618e2c3df86E508199028'; // Your deployed contract address
//         const deployedContract = new web3.eth.Contract(deployedContractABI, deployedContractAddress);

//         setContract(deployedContract);
//         setContractABI(deployedContractABI);

//         // Request account access if needed
//         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         setAccount(accounts[0]);
//       } catch (error) {
//         console.error('Error loading contract:', error);
//       }
//     }

//     if (window.ethereum) {
//       loadContract();
//     } else {
//       console.error('Please install MetaMask or another Ethereum wallet to use this component.');
//     }
//   }, []);

//   const getValue = async () => {
//     if (contract) {
//       const value = await contract.methods.getValue().call({ from: account });
//       setRetrievedValue(value);
//     }
//   };

//   const setValue = async () => {
//     if (contract) {
//       await contract.methods.setValue(newValue).send({ from: account });
//       setNewValue('');
//       // Refresh the retrieved value after setting it
//       getValue();
//     }
//   };

//   return (
//     <div>
//       <h2>Contract Interaction</h2>
//       <p>Retrieved Value: {retrievedValue}</p>
//       <input type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
//       <button onClick={getValue}>Get Value</button>
//       <button onClick={setValue}>Set Value</button>
//     </div>
//   );
// };

// export default ContractComponent;
