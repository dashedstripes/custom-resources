import React, { Component } from 'react'

import TextField from '../components/TextField'

class NewResourceTypeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: {
        value: '',
        error: ''
      },
      key: {
        value: '',
        error: ''
      },
      fields: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleAddNewField = this.handleAddNewField.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteField = this.handleDeleteField.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: { value: e.target.value, error: '' }
    })
  }

  handleFieldChange(index, e) {
    let name = e.target.name
    let value = e.target.value

    this.setState({
      fields: this.state.fields.map((field, i) => {
        if (i === index) return { ...field, [name]: { value: value, error: '' } }
        return field
      })
    })
  }

  handleAddNewField(e) {
    this.setState({
      fields: this.state.fields.concat({
        name: {
          value: '',
          error: ''
        },
        type: {
          value: 'string',
          error: ''
        },
        description: {
          value: '',
          error: ''
        }
      })
    })
  }

  handleDeleteField(index, e) {
    this.setState({
      fields: this.state.fields.filter((field, i) => i !== index)
    })
  }

  validate() {
    let isValid = true

    if (this.state.title.value === '') {
      this.setState({
        title: { ...this.state.title, error: 'Title cannot be blank.' }
      })
      isValid = false
    }

    if (this.state.key.value === '') {
      this.setState({
        key: { ...this.state.key, error: 'Key cannot be blank.' }
      })
      isValid = false
    }

    this.state.fields.forEach((field, index) => {

      if (field.name.value === '') {
        this.setState({
          fields: this.state.fields.map((field, i) => {
            if (i === index) {
              field.name.error = 'Name cannot be blank.'
            }
            return field
          })
        })
        isValid = false
      }

      if (field.description.value === '') {
        this.setState({
          fields: this.state.fields.map((field, i) => {
            if (i === index) {
              field.description.error = 'Description cannot be blank.'
            }
            return field
          })
        })
        isValid = false
      }

    })

    return isValid
  }

  handleSubmit() {
    if (!this.validate()) return
    // Push the resource object to the parent when sucessfully submitted
    this.props.onSuccess(this.state)
  }

  render() {
    return (
      <div>

        <div className='row'>
          <div className='col-6'>
            <TextField label='Title' name='title' value={this.state.title.value} error={this.state.title.error} onChange={this.handleChange} />
          </div>
          <div className='col-6'>
            <TextField label='Key' name='key' value={this.state.key.value} error={this.state.key.error} onChange={this.handleChange} />
          </div>
        </div>

        <div>
          {this.state.fields.map((field, index) => (
            <div key={index} className='card mb-3'>

              <div className='card-header' data-toggle="collapse" data-target={'#field' + index}>
                <h5 className='mb-0 float-left'>
                  <button className="btn btn-link">
                    {field.name.value !== '' ? field.name.value : 'New Field'}
                  </button>
                </h5>
                <button className='btn btn-outline-danger float-right' onClick={this.handleDeleteField.bind(this, index)}>Delete field</button>
              </div>

              <div className='collapse show' id={'field' + index}>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-6'>
                      <TextField label='Name' name='name' value={field.name.value} error={field.name.error} onChange={this.handleFieldChange.bind(this, index)} />
                    </div>
                    <div className='col-6'>
                      <TextField label='Description' name='description' value={field.description.value} error={field.description.error} onChange={this.handleFieldChange.bind(this, index)} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        <div>
          <button className='btn btn-link float-left' onClick={this.handleAddNewField}>Add new field</button>
        </div>

        <div>
          <button className='btn btn-primary float-right' onClick={this.handleSubmit}>Save</button>
        </div>
      </div>
    )
  }
}

export default NewResourceTypeForm
