import { contractDetails } from "../../actions" 
import React from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import ChainEventsDisplay from "./ChainEventsDisplay"
import PriceTicker from "../PriceTicker"
import "../../styleSheets/ChainEventsMain.css"

let eventsArray

const CustomLabelContractAddress = () => {
    var labelStyle = {
         color: 'white'
       };
   return <label style={labelStyle}> Enter Contract Address </label>
   }

const CustomLabelContractAbi = () => {
    var labelStyle = {
         color: 'white',
       };
   return <label style={labelStyle}> Enter Contract ABI </label>
   }

class ChainEventsMain extends React.Component {
    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({input, label, meta}) => {
        const className=`field ${meta.error && meta.touched ? "error": ""}`
        return (
            <div className={className}>
            <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        ) 
    }

    onSubmit = (formValues) => {
        this.props.contractDetails(formValues)
    }

    componentDidMount() {
        this.onSubmit()
    }

    render() {
        return (
            <div id="chain-events-form">
                <PriceTicker />
                <h3 id="events-current-support">Rendering Tether Data on Initial Load and Across Last Ten Blocks</h3>
                <h3 id="events-current-support">Sample Integrations Included - OMG Network and Tether ERC-20 Contracts</h3>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name="contractAddress" component={this.renderInput} label={<CustomLabelContractAddress />} />
                    <Field name="contractAbi" component={this.renderInput} label={<CustomLabelContractAbi />} />
                    <button>Submit</button>
                </form>

                <ChainEventsDisplay />
            </div>

        )
    }
}

const validate = (formValues) => {
    const errors = {}

    if (!formValues.contractAddress) {
        errors.contractAddress = "You must enter a contract address"
    }

    if (!formValues.contractAbi) {
        errors.contractAbi = "You must enter a contract ABI"
    }

    return errors
}

const formWrapped = reduxForm({
    form: "contractQuery",
    validate
})(ChainEventsMain)

const mapStateToProps = state => {
    return { contractEvents: state.contractEvents }
}

export default connect(mapStateToProps, { contractDetails })(formWrapped)






