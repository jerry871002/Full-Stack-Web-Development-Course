const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const newNotification = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: content
  }
}

export default notificationReducer