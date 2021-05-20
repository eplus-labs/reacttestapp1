import React from "react"
import { Form, Button, Message, Input } from "semantic-ui-react"
import Campaign from "./ethereum/campaign"
import ethEnabled from "./ethereum/web3"
import { Link } from "react-router-dom"
import KickstartHeader from "./KickstartHeader"
import "../../styleSheets/CampaignRequestNew.css"


let address

class CampaignRequestNew extends React.Component {    
    state = {
        value: "",
        description: "",
        recipient: "",
        loading: false,
        errorMessage: ""
    }

    nextPath(path) {
        this.props.history.push(path);
        }

    componentDidMount() {
        address = this.props.match.params.address
    }

    onSubmit = async event => {
        event.preventDefault()

        const campaign = await Campaign(address)
        const { value, description, recipient } = this.state

        this.setState({ loading: true, errorMessage: ""})

        try {
            console.log("***eithin request new onsubmit")
            let web3 = await ethEnabled()
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value, "ether"),
                recipient
                ).send({ from: accounts[0] })

                this.nextPath(`/campaigns/${address}/requests`)
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }

        this.setState({ loading: false })
    }

    // Form, Button, and Input are from semantic UI for simple CSS styling
    render() {
        return (
            <div>
                <KickstartHeader />
                <Link to={`/campaigns/${this.props.match.params.address}/requests`}>
                    Back
                </Link>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} id="request-new-form-outer">
                    <Form.Field>
                        <label style={{color: "white"}}>Description</label>
                        <Input 
                        value={this.state.description}
                        onChange={event => this.setState({description: event.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label style={{color: "white"}}>Value in Ether</label>
                        <Input 
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label style={{color: "white"}}>Recipient</label>
                        <Input 
                        value={this.state.recipient}
                        onChange={event => this.setState({recipient: event.target.value})}
                        />
                    </Form.Field>

                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Create!</Button>
                </Form>
            </div>
        )
    }
}

export default CampaignRequestNew 