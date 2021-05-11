import React from "react"
import KickstartHeader from "./KickstartHeader"
import { Button, Table } from "semantic-ui-react"
import { Link } from "react-router-dom"
import Campaign from "./ethereum/campaign"
import CampaignRequestRow from "./CampaignRequestRow"

let addressFromProps
let requests = []
let approversCount
let requestCount


class CampaignRequestList extends React.Component {
    state = {
        address: "",
        approversCount: ""
    }

    async componentDidMount() {
        console.log("within component did mount")
        addressFromProps = await this.props.match.params.address
        
        this.setState({address: addressFromProps})

        const campaign = await Campaign(this.state.address)
        requestCount = await campaign.methods.getRequestsCount().call()
        approversCount = await campaign.methods.approversCount().call()
        this.setState({ approversCount: approversCount})

        console.log("camoaign from component did mount: ", campaign)
        console.log("request count: ", requestCount)

        requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call()
            })
        )
    }

    renderRow() {
        console.log("within render row = approvers count: ", this.state.approversCount)
        console.log("requests within render row: ", requests)

        console.log("length of requests: ", requests.length)

        if (requests.length === 0) {
            return
        }

        return requests.map((request, index) => {
            return <CampaignRequestRow
                key={index}
                id={index}
                request={request}
                address={this.state.address}
                approversCount={this.state.approversCount}
             />
        })
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table
        return (
            <div>
                <KickstartHeader />
                CampaignRequestList
                <Link to={`/campaigns/${this.props.match.params.address}/requests/new`}>
                    <Button primary floated="right" style={{marginBottom: 10}}>Add Request</Button>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>
                <div>Found {requestCount} requests </div>
            </div>
        )
    }
}

export default CampaignRequestList