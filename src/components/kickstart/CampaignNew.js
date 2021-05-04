import React from "react"
import { Form, Button, Input, Message } from "semantic-ui-react"
import KickstartHeader from "./KickstartHeader"
import factory from "../kickstart/ethereum/factory"
import web3 from "../kickstart/ethereum/web3"

class CampaignNew extends React.Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false
      };

    nextPath(path) {
    this.props.history.push(path);
    }

    onSubmit = async (event) => {
        event.preventDefault()

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts()
            await factory.methods.createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                })
            
            this.nextPath('/campaigns')
            
        } catch (err) {
            this.setState({ errorMessage: err.message });
          }

        this.setState({ loading: false })
    }

    render() {
        // Form, Button, Input, and Message components below are imported from Semantic UI for CSS styling
        return (
            <div>
                <KickstartHeader />
                <h3>Create a Campaign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            label="wei" 
                            labelPosition="right" 
                            value={this.state.minimumContribution}
                            onChange={(event) => {
                                this.setState({ minimumContribution: event.target.value })
                            }}
                        />
                    </Form.Field>
                    
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>Create!</Button>
                </Form>
            </div>
        )
    }
}

export default CampaignNew