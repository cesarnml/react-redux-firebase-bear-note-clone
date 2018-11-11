import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import { Menu, Search, FilePlus, Trash2 } from 'react-feather'
import moment from 'moment'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Link } from 'react-router-dom'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { TweenMax, Power1 } from 'gsap'

moment.relativeTimeThreshold('s', 60)
moment.relativeTimeThreshold('ss', 5)
moment.relativeTimeThreshold('m', 60)
moment.relativeTimeThreshold('h', 20)
moment.relativeTimeThreshold('d', 25)
moment.relativeTimeThreshold('M', 10)

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: 'just now',
    ss: '%ds',
    m: '%dm',
    mm: '%dm',
    h: '%dh',
    hh: '%dh',
    d: '%dD',
    dd: '%dD',
    M: '%dW',
    MM: '%dW',
    y: '%dY',
    yy: '%dY'
  }
})

const config = {
  apiKey: 'AIzaSyDqL8yTHEV2iRUOjDNAwdMLPYBYQlUY1vU',
  authDomain: 'bear-note-app.firebaseapp.com',
  databaseURL: 'https://bear-note-app.firebaseio.com',
  projectId: 'bear-note-app',
  storageBucket: 'bear-note-app.appspot.com',
  messagingSenderId: '365864384527'
}

firebase.initializeApp(config)

export const db = firebase.firestore()

db.settings({ timestampsInSnapshots: true })

class NoteList extends Component {
  constructor (props) {
    super(props)
    this.list = []
  }

  handleCreateNote = () => {
    this.props.history.push('/create')
  }

  componentDidMount () {
    this.props.fetchNotes()
    TweenMax.staggerFrom(
      this.list,
      0.5,
      { y: 50, autoAlpha: 0, ease: Power1.easeIn },
      0.3
    )
  }

  reorder = (list, startIndex, endIndex) => {
    let result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result.map((item, index) => {
      item.order = index
      return item
    })
  }

  onDragEnd = result => {
    if (!result.destination) {
      return
    }

    if (
      result.source.droppableId === result.destination.droppableId &&
      result.destination.index === result.source.index
    ) {
      return
    }

    const newOrder = this.reorder(
      this.props.notes,
      result.source.index,
      result.destination.index
    )
    this.props.dndNote(newOrder)
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
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId='notes'>
              {(provided, snapshot) => (
                <ul className='note-list' ref={provided.innerRef}>
                  {notes.map((note, index) => (
                    <Draggable
                      draggableId={String(note.id)}
                      key={note.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className='note-container'
                          note={note}
                          style={{
                            background: snapshot.isDragging
                              ? 'lightgreen'
                              : 'transparent',
                            ...provided.draggableProps.style
                          }}
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
                              this.props.deleteNote(note.id)
                            }}
                          >
                            <Trash2 />
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <button className='new-note' onClick={this.handleCreateNote}>
            <FilePlus color='white' size='30px' />
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ notes }) => ({
  notes
})

export default connect(mapStateToProps, actions)(NoteList)
