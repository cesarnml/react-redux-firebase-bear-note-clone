import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as actions from '../store/actions'
import { Menu, Search, FilePlus, Trash2 } from 'react-feather'
import { Link } from 'react-router-dom'
import { TweenMax, Power1 } from 'gsap'
import moment from '../config/momentConfig'
import { firestoreConnect } from 'react-redux-firebase'

class NoteList extends Component {
  constructor (props) {
    super(props)
    this.list = []
    this.sidenav = []
    this.newBtn = null
  }

  handleCreateNote = () => {
    TweenMax.to(this.newBtn, 0.5, { autoAlpha: 0 })
    this.props.history.push('/create')
  }

  componentDidMount () {
    // this.props.fetchNotes()
    TweenMax.staggerFrom(
      this.list,
      0.5,
      { y: 50, autoAlpha: 0, ease: Power1.easeIn },
      0.3
    )
  }

  render () {
    const { notes } = this.props
    return (
      <div className='note-list'>
        <div className='note-list-animated'>
          <nav className='navbar'>
            <button className='nav-menu'>
              <Menu color='#9F9F9F' size='20px' />
            </button>
            <h1 className='nav-title'>
              NOTES
            </h1>
            <button className='nav-search'>
              <Search color='#9F9F9F' size='20px' />
            </button>
          </nav>
          <ul className='note-list'>
            {notes &&
              notes.map((note, i) => (
                <li
                  className='note-container'
                  key={note.id}
                  note={note}
                  ref={li => (this.list[i] = li)}
                >
                  <div className='note-moment'>
                    {moment(note.createdAt).fromNow()}
                  </div>
                  <Link className='note-link' to={`/note/${note.id}`}>
                    <div className='note'>
                      <h2 className='note-title'>
                        {note.title}
                      </h2>
                      <p className='note-content'>
                        {note.content}
                      </p>
                    </div>
                  </Link>
                  <div
                    className='note-nav'
                    onClick={() => {
                      TweenMax.to(this.sidenav[i], 0.75, { right: 0 })
                      // this.props.deleteNote(note.id)
                      // this.props.fetchNotes()
                    }}
                  >
                    <Trash2 className='trashcan' />
                  </div>
                  <div
                    className='note-nav-exp'
                    ref={div => (this.sidenav[i] = div)}
                  >
                    'NOTE NAV EXPAND'
                  </div>
                </li>
              ))}
          </ul>
          <button
            className='new-note'
            onClick={this.handleCreateNote}
            ref={newBtn => (this.newBtn = newBtn)}
          >
            <FilePlus color='white' size='30px' />
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { notes: state.firestore.ordered.notes }
}

export default compose(
  connect(mapStateToProps, actions),
  firestoreConnect([{ collection: 'notes' }])
)(NoteList)
