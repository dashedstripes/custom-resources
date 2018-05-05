import React, { Component } from 'react'
import NewResourceTypeForm from './NewResourceTypeForm';
import ResourcesList from './ResourcesList';

const MODES = {
  NEW_RESOURCE_TYPE_FORM: 0,
  RESOURCES_LIST: 1
}

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: MODES.NEW_RESOURCE_TYPE_FORM,
      resourceType: {
        title: '',
        key: '',
        fields: []
      }
    }

    this.handleNewResourceTypeFormSuccess = this.handleNewResourceTypeFormSuccess.bind(this)
  }

  handleNewResourceTypeFormSuccess(submittedResourceType) {
    this.setState({
      mode: MODES.RESOURCES_LIST,
      resourceType: submittedResourceType
    })
  }

  render() {

    if (this.state.mode === MODES.NEW_RESOURCE_TYPE_FORM) {
      return (
        <div>
          <NewResourceTypeForm
            onSuccess={this.handleNewResourceTypeFormSuccess} />
        </div>
      )
    }

    if (this.state.mode === MODES.RESOURCES_LIST) {
      return (
        <div>
          <ResourcesList resourceType={this.state.resourceType} />
        </div>
      )
    }

  }
}

export default Card
