import React from "react"
import KickstartHeader from "./KickstartHeader"
import Campaign from "./ethereum/campaign"
import ContributeForm from "./ContributeForm"
import ethEnabled from "./ethereum/web3"
import { Link } from "react-router-dom"
import { Card, Grid, Button } from "semantic-ui-react"

let address
let balance
let bnBalance = "0"
let manager
let minimumContribution
let requestsCount
let approversCount

class IndividualCampaign extends React.Component {
    state = {
        manager: ""
    }


    async componentDidMount() {
        const campaign = await Campaign(this.props.match.params.address)

        address = this.props.match.params.address

        const summary = await campaign.methods.getSummary().call()

        minimumContribution = summary[0]
        balance = summary[1]
        if (balance === "0") {
            bnBalance = "0"
        } else {
            bnBalance = balance.toString()
        }
        requestsCount = summary[2]
        approversCount = summary[3]
        // manager = summary[4]
        this.setState({ manager: summary[4] })

        console.log("minimum contribution: ", minimumContribution)
        console.log("balance: ", balance)
    }

    renderCards() {
        let web3 = ethEnabled()
        let campaignBalance

        if (web3.utils === undefined) {
            campaignBalance = "loading"
        } else {
            campaignBalance = web3.utils.fromWei(bnBalance.toString(), "ether")
        }

        const items = [
            {
                header: this.state.manager,
                meta: "Address of Manager",
                description: "The manager created this campaign and can create requests to withdraw money",
                style: { overflowWrap: "break-word" }
            },
            {
                header: minimumContribution,
                meta: "Minimum Contribution (wei)",
                description: "You must contribute this much wei to become an approver"
            },
            {
                header: requestsCount,
                meta: "Number of Requests",
                description: "A request tries to withdraw money from the contract.  Requests must be approved by approvers."
            },
            {
                header: approversCount,
                meta: "Number of Approvers",
                description: "Number of people who have already donated to this campaign"
            },
            {
                header: campaignBalance,
                meta: "Campaign Balance (Ether)",
                description: "The balance is how much money this campaign has left to spend."
            }
        ]
        return <Card.Group items={items} />
    }

    // Grid, Button, and Card components are used from the semantic UI library for ease of CSS styling
    render() {
        return (
            <div>
                <KickstartHeader />
                <h3>Campaign Details</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>

                        <Grid.Column width={6}>
                            <ContributeForm address={address} />
                        </Grid.Column>

                        <Grid.Row>
                            <Grid.Column>
                                <Link to={`/campaigns/${this.props.match.params.address}/requests`}>
                                    <Button primary>View Requests</Button>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default IndividualCampaign