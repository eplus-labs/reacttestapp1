import ethEnabled from "./web3"
import CampaignFactory from "./build/CampaignFactory.json"

let instance

const web3Instance = async () => {
    let web3 =  await ethEnabled()
    instance = await new web3.eth.Contract(
        JSON.parse(CampaignFactory.interface),
        "0xb6b1A7191E1193513602DD5eB565B8e108252CBE"
    )

}

web3Instance()


export default instance