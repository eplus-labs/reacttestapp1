import Web3 from 'web3';

let web3;

// if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
//   // We are in the browser and metamask is running.
//   web3 = new Web3(window.web3.currentProvider);
//   console.log("within web3 - current provider = ", window.web3.currentProvider)
// } else {
//   // We are on the server *OR* the user is not running metamask
//   const provider = new Web3.providers.HttpProvider(
//     'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q'
//   );
//   web3 = new Web3(provider);
// }

const ethEnabled = async () => {
  if (window.ethereum) {
    await window.ethereum.send('eth_requestAccounts');
    web3 = new Web3(window.ethereum);
    console.log("within web3 - current provider within if = ", window.ethereum)
    return web3;
  } else {
    console.log("within web3 - current provider within else = ", window.ethereum)
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/daa0d7c6783a4b37a8ff893efd22253a'
    );
    web3 = new Web3(provider);
    return web3
  }

}

export default ethEnabled;