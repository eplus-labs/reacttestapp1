import React from "react"
import { Form, Button, Input, Message } from "semantic-ui-react"
import KickstartHeader from "./KickstartHeader"
import factory from "../kickstart/ethereum/factory"
import ethEnabled from "../kickstart/ethereum/web3"
import kickstartApiPost from "../../apis/kickstartApi"
import { kickstartApiGetByName } from "../../apis/kickstartApi"
import "../../styleSheets/CampaignNew.css"

class CampaignNew extends React.Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false,
        campaignName: '',
        campaignDescription: '',
        minimumContribution: ''
      };

    nextPath(path) {
        this.props.history.push(path);
    }

    onSubmit = async (event) => {
        console.log("State within on submit: ", this.state)

        event.preventDefault()

        this.setState({ loading: true, errorMessage: '' });

        try {
            let web3 = ethEnabled()
            const accounts = await web3.eth.getAccounts()
            await factory.methods.createCampaign(this.state.minimumContribution)
            // await factory.methods.createCampaign(this.state.minimumContribution)
            .send({
                    from: accounts[0]
                })
            
            const campaigns = await factory.methods.getDeployedCampaigns().call()

            console.log("Lenght of campaigns from CampaignNew: ", campaigns.length)
            console.log("Last campaign of campaigns from CampaignNew: ", campaigns[campaigns.length - 1])


            
            let apiPostData = {
                CampaignAddress: campaigns[campaigns.length - 1],
                MinimumContribution: this.state.minimumContribution,
                CampaignName: this.state.campaignName,
                CampaignDescription: this.state.campaignDescription
            }

            let jsonAPIData = JSON.stringify(apiPostData)

            await kickstartApiPost(jsonAPIData)

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
                <h3 style={{color: "white"}}>Create a Campaign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} id="campaign-new-main">

                    <Form.Field>
                        <label style={{color: "white"}}>Campaign Name</label>
                        <Input 
                            value={this.state.campaignName}
                            onChange={(event) => {
                                this.setState({ campaignName: event.target.value })
                            }}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label style={{color: "white"}}>Campaign Description</label>
                        <Input 
                            value={this.state.campaignDescription}
                            onChange={(event) => {
                                this.setState({ campaignDescription: event.target.value })
                            }}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label style={{color: "white"}}>Minimum Contribution</label>
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