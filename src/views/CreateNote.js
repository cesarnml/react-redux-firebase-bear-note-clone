import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import { ChevronLeft, Share, Info, Save } from 'react-feather'
class CreateNote extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      content: ''
    }
    this.input = null
  }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    const { title, content } = this.state
    let note = this.state
    const { notes } = this.props
    const order = notes.length ? notes.length : 0
    note.order = order
    e.preventDefault()
    if (!title.trim() || !content.trim()) return this.props.history.push('/')
    this.props.createNote(note)
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

const mapStateToProps = ({ notes }) => ({
  notes
})

export default connect(mapStateToProps, actions)(CreateNote)
