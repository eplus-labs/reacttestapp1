import web3 from "./web3"
import CampaignFactory from "./build/CampaignFactory.json"

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0xb6b1A7191E1193513602DD5eB565B8e108252CBE"
)

export default instance