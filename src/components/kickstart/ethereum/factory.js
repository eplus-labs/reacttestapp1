import web3 from "./web3"
import CampaignFactory from "./build/CampaignFactory.json"

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    // "0x24642382bF5dA929C047177C18295E40514aBaAb"
    // "0x579dCdf06Ae7ad0B561F08b778c1a2243B0E4516"
    "0xF0e7Fae0A40E5DD6D7fec14AFf17A058aB3D86b5"
)

export default instance