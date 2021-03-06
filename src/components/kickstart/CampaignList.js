import React from "react"
import { Card, Button, Container } from "semantic-ui-react"
import factory from "./ethereum/factory"
import KickstartHeader from "./KickstartHeader"
import { Link } from "react-router-dom"
import { kickstartApiGetAllCampaigns } from "../../apis/kickstartApi"
import "../../styleSheets/CampaignList.css"

class CampaignList extends React.Component {
    state = {campaigns: []}
    async componentDidMount() {

        // const campaigns = await factory.methods.getDeployedCampaigns().call()

        let response = await kickstartApiGetAllCampaigns()
        // let jsonResponse = JSON.stringify(response)
        let campaigns = JSON.parse(response)

        this.setState({campaigns})
    }

    // renderCampaigns uses Semantic UI and the semantic-ui-react module imported to render a card that will hold campaigns with the
    // necessary styling for the card
    renderCampaigns() {
        if (this.state.campaigns.length === 0) {
            return "Loading..."
        }

        const items = this.state.campaigns.map((campaign) => {
            let addressPlusContribution = "Campaign Address: " + campaign.CampaignAddress + " ------- " + "Minimum Contribution: " + campaign.MinimumContribution
            return {
                header: campaign.CampaignName,
                meta: addressPlusContribution,
                description: (
                    <Link to={`/campaign/${campaign.CampaignAddress}`}>View Campaign</Link>
                ),
                fluid: true
            }
        })
        return <Card.Group items={items} />
    }

    // The Button element comes from semantic UI
    render() {
        return (
                <div id="video-page-main">
                    <KickstartHeader />
                    <Container>
                        <div className="campaign-list-main">
                            <h3>Distributed Application Requires Local Metmask Instance.  Use Rinkby Test Network.</h3>
                            <h3>Open Campaigns</h3>
                            <Link to="/campaigns/new">
                                <Button
                                floated="right" 
                                content="Create Campaign"
                                icon="add circle"
                                primary
                                />
                            </Link>
                            {this.renderCampaigns()}
                        </div>
                    </Container>

                </div>

        )
    }
}

export default CampaignList