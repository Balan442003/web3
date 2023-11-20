import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Write from "./Writecontract";

const App = () => {
  const [address, setAddress] = useState("");
  const [web3, setWeb3] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

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
        setIsConnected(true);
      } else {
        alert("MetaMask not connected. Please connect your wallet.");
      }
    } else {
      alert("MetaMask not installed.");
    }
  };


  return (
    <div className="App mt-5 vh-100">
      <div className="text-center">
        {isConnected ? (
          <Write account={address} />
        ) : (
          <>
            <button
              onClick={btnHandler}
              className="btn btn-outline-primary m-2"
            >
              Connect to Wallet
            </button>
            
          </>
        )}
      </div>
    </div>
  );
};

export default App;
