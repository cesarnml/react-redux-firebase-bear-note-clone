import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import NoteListContainer from './views/NoteListContainer'
import CreateNote from './views/CreateNote'
import UpdateNote from './views/UpdateNote'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { TweenMax } from 'gsap/all'
import * as actions from './store/actions'
import { connect } from 'react-redux'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isListNote: true,
      isCreateNote: false
    }
  }

  componentDidMount () {
    this.props.fetchNotes()
  }

  render () {
    const { location } = this.props
    const { isListNote, isCreateNote } = this.state
    return (
      <div
        style={{
          position: 'absolute',
          width: '100%',
          minHeight: '100vh',
          overflowX: 'hidden',
          backgroundColor: 'rgb(250,250,250)'
        }}
      >
        <TransitionGroup>
          <CSSTransition
            classNames='fade'
            key={location.key}
            timeout={1000}
            // eslint-disable-next-line
            enter={true}
            // eslint-disable-next-line
            exit={true}
            onEnter={node => {
              TweenMax.killTweensOf(node)
              TweenMax.set(node, {
                position: 'absolute',
                left: isListNote ? '-100%' : '100%',
                opacity: 1
              })

              TweenMax.to(node, 1, {
                position: 'absolute',
                left: isListNote ? 0 : 0,
                opacity: 1,
                onComplete: () =>
                  this.setState({
                    isListNote: !isListNote,
                    isCreateNote: !isCreateNote
                  })
              })
            }}
            onExit={node => {
              TweenMax.killTweensOf(node)
              TweenMax.set(node, {
                position: 'absolute',
                left: isListNote ? 0 : 0,
                opacity: 1
              })
              TweenMax.to(node, 1, {
                position: 'absolute',
                left: isListNote ? '100%' : '-100%',
                opacity: 1
              })
            }}
          >
            <Switch location={location}>
              <Route
                exact
                path='/'
                render={props => <NoteListContainer {...props} />}
              />
              <Route
                path='/create'
                render={props => <CreateNote {...props} />}
              />
              <Route
                path='/note/:id'
                render={props => (
                  <UpdateNote
                    {...props}
                    note={this.props.notes.find(
                      note => note.id === props.match.params.id
                    )}
                  />
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
