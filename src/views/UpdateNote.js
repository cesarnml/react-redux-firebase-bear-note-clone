import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import { ChevronLeft, Share, Info, Save } from 'react-feather'
class UpdateNote extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: this.props.note.title,
      content: this.props.note.content
    }
    this.input = null
  }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    const { title, content } = this.state
    const { id } = this.props.match.params
    e.preventDefault()
    if (!title.trim() || !content.trim()) return this.props.history.push('/')
    this.props.updateNote({ title, content, id })
    this.props.fetchNotes()
    this.props.history.push('/')
  }

  componentDidMount () {
    this.input.focus()
  }

  render () {
    const { title, content } = this.state
    return (
      <div className='create-note'>
        <div className='create-note-animated'>
          <nav className='nav'>
            <Link className='left-chevron' to='/'>
              <ChevronLeft tabIndex='4' onClick={this.handleSubmit} />
            </Link>
            <div className='nav-right'>
              <button className='menu-share'><Share /></button>
              <button className='menu-info'><Info /></button>
            </div>

          </nav>
          <div className='noteContent'>
            <div className='markdown'>H1</div>
            <form className='form-newNote' onSubmit={this.handleSubmit}>
              <input
                tabIndex='1'
                className='createTitle'
                name='title'
                type='text'
                value={title}
                placeholder='Enter title'
                onChange={this.handleChange}
                ref={input => (this.input = input)}
              />
              <textarea
                tabIndex='2'
                className='createContent'
                name='content'
                type='text'
                value={content}
                placeholder='Enter content'
                onChange={this.handleChange}
              />
              {this.state.title || this.state.content
                ? <button
                  className='button-save'
                  tabIndex='3'
                  onSubmit={this.handleSubmit}
                >
                  <Save />
                </button>
                : null}
            </form>

          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(UpdateNote)
