import React from "react"
import {Field, reduxForm } from "redux-form"
import { connect } from "react-redux"
import { createVideoRef } from "../actions"

class VideoPost extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
     }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? "error" : ""}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.createVideoRef(formValues)
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="name" component={this.renderInput} label="Enter video name"/>
                <Field name="category" component={this.renderInput} label="Enter video category" />
                <Field name="embedId" component={this.renderInput} label="Enter YouTube EmbedID" />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {}

    if (!formValues.name) {
        errors.name = "You must enter a name for the video"
    }

    if (!formValues.category) {
        errors.category = "You must enter a category for the video"
    }

    if (!formValues.embedId) {
        errors.embedId = "You must enter a YouTube embed ID for the video"
    }

    return errors

}

const formWrapped = reduxForm({
    form: "videoPost",
    validate
})(VideoPost)

export default connect(null, { createVideoRef })(formWrapped)