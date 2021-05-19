import React from "react"
import KickstartHeader from "./KickstartHeader"
import { Button, Table } from "semantic-ui-react"
import { Link } from "react-router-dom"
import Campaign from "./ethereum/campaign"
import CampaignRequestRow from "./CampaignRequestRow"
import "../../styleSheets/CampaignRequestList.css"

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
        addressFromProps = await this.props.match.params.address
        
        this.setState({address: addressFromProps})

        const campaign = await Campaign(this.state.address)
        requestCount = await campaign.methods.getRequestsCount().call()
        approversCount = await campaign.methods.approversCount().call()


        requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call()
            })
        )
        this.setState({ approversCount: approversCount})    
    }

    renderRow() {

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
                <div className="white-text" id="top-level-text">CampaignRequestList</div>  
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
                <div className="white-text">Found {requestCount} requests </div>
            </div>
        )
    }
}

export default CampaignRequestList