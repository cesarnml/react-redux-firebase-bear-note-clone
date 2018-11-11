import { FETCH_NOTES } from '../actions/types'

const notesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_NOTES:
      return action.payload.sort((a, b) => {
        return Number(b.order) - Number(a.order)
      })
    case 'DND_NOTES':
      return action.payload
    default:
      return state
  }
}

export default notesReducer
