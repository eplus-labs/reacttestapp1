import React from "react"
import Campaign from "./ethereum/campaign"
import ethEnabled from "./ethereum/web3"
import { withRouter } from "react-router-dom"
import { Form, Input, Message, Button } from "semantic-ui-react"

class ContributeForm extends React.Component {
    state = {
        value: "",
        errorMessage: "",
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault()

        let web3 = await ethEnabled()

        const campaign = await Campaign(this.props.address)

        this.setState({loading: true, errorMessage: ""})

        try {
            const accounts = await web3.eth.getAccounts();

            await campaign.methods.contribute().send({
              from: accounts[0],
              value: web3.utils.toWei(this.state.value, 'ether')
            });

            this.props.history.push(`/campaign/${this.props.address}`)


        } catch (err) {
            this.setState({ errorMessage: err.message })
        }

        this.setState({ loading:false, value: "" })

    }


    // The Form, Input, Button and Message components used below from semnatic UI and are used for
    // ease of styling
    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label style={{color: "white"}}>Amount to Contribute</label>
                    <Input
                    value={this.state.value}
                    onChange={(event) => this.setState({ value: event.target.value })}
                    label="ether"
                    labelPosition="right"
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>
                    Contribute
                </Button>
            </Form>
        )
    }
}

export default withRouter(ContributeForm)