import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import NoteList from './views/NoteList'
import CreateNote from './views/CreateNote'
import UpdateNote from './views/UpdateNote'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { TweenMax } from 'gsap/all'
import * as actions from './store/actions'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import { Transition } from 'react-spring'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isListNote: true
    }
  }

  componentDidMount () {
    this.props.fetchNotes()
  }

  animateMount = node => {
    const { isListNote } = this.state
    TweenMax.from(node, 1, {
      position: 'absolute',
      left: isListNote ? '100%' : '-100%',
      opacity: 1,
      onComplete: () =>
        this.setState({
          isListNote: !isListNote
        })
    })
  }

  animateUnmount = node => {
    const { isListNote } = this.state
    TweenMax.to(node, 1, {
      position: 'absolute',
      left: isListNote ? '-100%' : '100%',
      opacity: 0
    })
  }

  findNote = (notes, props) =>
    notes.find(note => note.id === props.match.params.id)

  render () {
    const { location, notes } = this.props
    return (
      <div className='app-container'>
        <TransitionGroup component={null}>
          <CSSTransition
            classNames='fade'
            key={location.key}
            timeout={1000}
            enter
            exit
            onEnter={this.animateMount}
            onExit={this.animateUnmount}
          >
            <Switch location={location}>
              <Route exact path='/' render={props => <NoteList {...props} />} />
              <Route
                path='/create'
                render={props => <CreateNote {...props} />}
              />
              <Route
                path='/note/:id'
                render={props => (
                  <UpdateNote {...props} note={this.findNote(notes, props)} />
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

const mapStateToProps = ({ notes }) => ({ notes })
export default connect(mapStateToProps, actions)(App)
