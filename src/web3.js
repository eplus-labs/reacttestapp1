import Web3 from "web3"

let web3

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
    // conditional above checks if we have metamask instance in the browser
    web3 = new Web3(window.web3.currentProvider)
} else {
    // else handles if we are on the server instead of browser OR metamask is noe running in
    // user's browser
    // will set up on our provider using Infura and the rinkby test network
    const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/daa0d7c6783a4b37a8ff893efd22253a"
    ) 
    web3 = new Web3(provider)
}

export default web3