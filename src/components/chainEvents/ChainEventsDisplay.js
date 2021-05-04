import React from "react"
import { connect } from "react-redux"
import "../../styleSheets/ChainEventsDisplay.css"

let events = []

class ChainEventsDisplay extends React.Component {

    renderEvents() {

        console.log("events array length: ", this.props.contractEventsArray.length)
        console.log("this.props.contractEventsArray", this.props.contractEventsArray)


        if (this.props.contractEventsArray.length === 0) {
            return "Loading..."
        } 

        const items = this.props.contractEventsArray.map((event) => {
            // console.log(event)
            return (
                <div className="chain-events-display-main" key={event.id}>
                    <table className="ui celled table black">
                        <thead>
                        <tr>
                            <th>Event Type</th>
                            <th>Block Number</th>
                            <th>Transaction from</th>
                            <th>Transaction to</th>
                            <th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td data-label="Event Type">{event.event}</td>
                          <td data-label="Block Number">{event.blockNumber}</td>
                          <td data-label="Transaction from">{event.returnValues.from}</td>
                          <td data-label="Transaction to">{event.returnValues.to}</td>
                          <td data-label="Value">{event.returnValues.value}</td>
                        </tr>
                      </tbody>
                    </table>

                </div>
            )
        })
        return items
    }

    render() {
        return (
            <div>
                {this.renderEvents()}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return { contractEventsArray: state.contractEvent }
}

export default connect(mapStateToProps)(ChainEventsDisplay)