import web3 from "./web3"
import CampaignFactory from "./build/CampaignFactory.json"

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x96Fae9C48C25D40Cc1DeddF07584bfFC6e9eABFC"
)

export default instance