import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import VideoPage from "./VideoPage"
import Header from "./Header"
import PriceTicker from "./PriceTicker"
import LotteryHome from "./LotteryHome"
import CampaignList from "./kickstart/CampaignList"
import CampaignNew from "../components/kickstart/CampaignNew"
import IndividualCampaign from "./kickstart/IndividualCampaign"
import CampaignRequestList from "./kickstart/CampaignRequestList"
import ChainEventsMain from "./chainEvents/ChainEventsMain"
import CampaignRequestNew from "./kickstart/CampaignRequestNew"
import VideoPost from "./VideoPost"

const App = () => {
    return (
        <div className="ui header">
            <BrowserRouter>
                <div className="main-app">
                    <Header />
                    <Route exact path="/" component={VideoPage} />
                    <Route path="/priceticker" component={PriceTicker} />
                    <Route path="/lotteryhome" component={LotteryHome} />
                    <Route path="/currency" component={VideoPage} />
                    <Route path="/nft" component={VideoPage} />
                    <Route path="/defi" component={VideoPage} />
                    <Route path="/blockchain" component={VideoPage} />
                    <Route path="/ethereum" component={VideoPage} />
                    <Route path="/apps" component={VideoPage} />
                    <Route path="/identity" component={VideoPage} />
                    <Route path="/campaigns" exact component={CampaignList} />
                    <Route path="/campaigns/new" component={CampaignNew} />
                    <Route path="/campaign/:address" component={IndividualCampaign} />
                    <Route path="/campaigns/:address/requests" exact component={CampaignRequestList} />
                    <Route path="/chaineventsmain" component={ChainEventsMain} />
                    <Route path="/campaigns/:address/requests/new" component={CampaignRequestNew} />
                    <Route path="/videopost!!!" component={VideoPost} />
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App