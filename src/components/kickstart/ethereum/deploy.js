const HDWalletProvider = require("truffle-hdwallet-provider")
const Web3 = require("web3")
const compiledFactory = require("./build/CampaignFactory.json")

const provider = new HDWalletProvider(
    "ten replace crush end harsh rebuild agent peace bargain stone wave estate",
    "https://rinkeby.infura.io/v3/daa0d7c6783a4b37a8ff893efd22253a"
)

const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()

    console.log("attempting to deploy from account: ", accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({gas: "1000000", from: accounts[0]})

    console.log("Contract deployed to: ", result.options.address)
}

deploy()