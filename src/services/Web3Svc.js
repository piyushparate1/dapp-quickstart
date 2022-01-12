import Web3 from "web3";

async function Web3Svc() {
    try {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            return (web3);
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            const web3 = new Web3(window.web3.currentProvider);
            return (web3);
        }
        // Non-dapp browsers...
        else {
            const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
            const web3 = new Web3(provider);
            return (web3);
        }
    } 
    catch (error) 
    {
        return error;
    }
}

export default Web3Svc;