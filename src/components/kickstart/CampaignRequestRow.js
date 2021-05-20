import React from "react"
import { Table, Button } from "semantic-ui-react"
import ethEnabled from "../kickstart/ethereum/web3"
import Campaign from "../kickstart/ethereum/campaign"

let id
let approversCount

class CampaignRequestRow extends React.Component {

    state = {
        requestAmount: ""
    }

    async componentDidMount() {
            const web3 = await ethEnabled()
            if (web3.utils !== undefined) {
                this.setState({requestAmount: web3.utils.fromWei(this.props.request.value, "ether")})
            }
    }


    onApprove = async () => {
        console.log("***within onapprove")
        const web3 = await ethEnabled()

        const campaign = Campaign(this.props.address)

        const accounts = await web3.eth.getAccounts()
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        })
    }

    onFinalize = async () => {
        console.log("***within onfinalize")

        const web3 = await ethEnabled()

        const campaign = Campaign(this.props.address)

        const accounts = await web3.eth.getAccounts()

        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        })   
    }

    render() {
        const { Row, Cell } = Table
        const readyToFinalize = this.props.request.approvalCount > this.props.approversCount / 2

        const web3 = async () => {
            console.log("within request row web3")
            return await ethEnabled()
        }

        let value

        // if (this.state.requestAmount === "") {
        //     value = "Loading..."
        // } else {

        // }

        console.log("***within render")

        return (
            <Row disabled={this.props.request.complete} positive={readyToFinalize && !this.props.request.complete}>
                <Cell>{this.props.id}</Cell>
                <Cell>{this.props.request.description}</Cell>
                <Cell>{this.state.requestAmount}</Cell>
                <Cell>{this.props.request.recipient}</Cell>
                <Cell>{this.props.request.approvalCount}/{this.props.approversCount}</Cell>
                <Cell>
                    {this.props.request.complete ? null : (
                        <Button color="green" basic onClick={this.onApprove}>Approve</Button>
                    )}
                </Cell>
                <Cell>
                    {this.props.request.complete ? null : (
                        <Button color="teal" basic onClick={this.onFinalize}>Finalize</Button>
                    )}
                </Cell>
            </Row>
        )
    }
}

export default CampaignRequestRow