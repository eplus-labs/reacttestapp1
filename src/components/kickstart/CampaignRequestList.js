import React from "react"
import KickstartHeader from "./KickstartHeader"
import { Button } from "semantic-ui-react"
import { Link } from "react-router-dom"

let address

class CampaignRequestList extends React.Component {
    componentDidMount() {
        address = this.props.match.params.address
    }

    render() {
        return (
            <div>
                <KickstartHeader />
                CampaignRequestList
                <Link to={`/campaigns/${this.props.match.params.address}/requests/new`}>
                    <Button primary>Add Request</Button>
                </Link>
            </div>
        )
    }
}

export default CampaignRequestList