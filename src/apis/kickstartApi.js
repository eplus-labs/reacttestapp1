import axios from "axios"

let baseURL = "http://18.208.179.111:8080"
// let baseURL = "http://127.0.0.1:8080"

var kickstartSession = axios.create({

    baseURL: baseURL
})

const kickstartApiPost = async (formValues) => {
    await kickstartSession.post("/postkickstart", formValues)
}

export const kickstartApiGetByName = async (campaignName) => {
    let getNameURL = baseURL + "/kickstartname/" + campaignName
    let response = await kickstartSession.get(getNameURL)
    return response.data
}

export const kickstartApiGetAllCampaigns = async () => {
    let getURL = baseURL + "/kickstartall"
    let response = await kickstartSession.get(getURL)
    return response.data
}

export default kickstartApiPost
