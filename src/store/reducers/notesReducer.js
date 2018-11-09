import { FETCH_NOTES, CREATE_NOTE } from '../actions/types'

const notesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_NOTES:
      return action.payload.sort((a, b) => {
        return Number(a.order) - Number(b.order)
      })
    case 'DND_NOTES':
      return action.payload
    default:
      return state
  }
}

export default notesReducer
