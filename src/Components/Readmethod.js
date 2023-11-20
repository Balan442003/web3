import React from 'react'
import Web3 from 'web3'
import { ABI } from './contractABI'

const Readmethod = () => {
    const jsonRpcURL = 'https://mainnet.infura.io/v3/917c4f75f17a4e28b78263cddd8f1b46'
    const web3 = new Web3(jsonRpcURL)
    const abi = ABI
    const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'

    const contract = new web3.eth.Contract(abi, contractAddress)

    const handleClick = async function readFromSmartContract() {
        let tokenName = await contract.methods.name().call()
        console.log("Name: ", tokenName)

        let tokendeprecated = await contract.methods.deprecated().call()
        console.log("deprecated",tokendeprecated);

        let tokenSymbol = await contract.methods.symbol().call()
        console.log("Symbol: ", tokenSymbol)

        let tokenTotalSupply = await contract.methods.totalSupply().call()
        console.log("Total supply: ", tokenTotalSupply)


        const address = '0x69166e49d2fd23e4cbea767d7191be423a7733a5'
        let balanceOfAccount = await contract.methods.balanceOf(address).call()
        const balance = await web3.utils.fromWei(balanceOfAccount, 'ether');
        console.log('Balanceof',balance);

        let tokenbalances = await contract.methods.balances(address).call()
        console.log('Balances', tokenbalances);
        let tokengetOwner = await contract.methods.getOwner(address).call()
        console.log('getOwner', tokengetOwner);

        const owneraddress = '0x0427f9e3e43a100013A618e2c3df86E508199028'
        const spenderaddress = '0x5eE7a3d268250740029796654169D27E5Ebb3ac9'
        let tokenallowances = await contract.methods.allowance(owneraddress,spenderaddress).call()
        console.log('allowance',parseInt(tokenallowances));
        

        
    
    }
    return (
        <div className='container mt-5'>
            <button className='btn btn-info' onClick={() => handleClick()}>Contract</button>
        </div>
    )
}

export default Readmethod
