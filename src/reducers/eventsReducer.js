import { eventsConstants } from '../actions';

const EVENTS_INITIAL = {
  event: null,
  events: null,
  isGettingEvent: false,
  isGettingEvents: false,
  isCreatingEvent: false,
  isUpdatingEvent: false,
  isDeletingEvent: false,
};

export const eventsReducer = (state = EVENTS_INITIAL, action) => {
  switch (action.type) {
    case eventsConstants.GET_EVENT_REQUEST:
      return {
        ...state,
        isGettingEvent: true,
      };
    case eventsConstants.GET_EVENT_SUCCESS:
      return {
        ...state,
        event: action.payload,
        isGettingEvent: false,
      };
    case eventsConstants.GET_EVENT_FAILURE:
      return {
        ...state,
        event: null,
        isGettingEvent: false,
      };

    case eventsConstants.GET_EVENTS_REQUEST:
      return {
        ...state,
        isGettingEvents: true,
      };
    case eventsConstants.GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        isGettingEvents: false,
      };
    case eventsConstants.GET_EVENTS_FAILURE:
      return {
        ...state,
        events: null,
        isGettingEvents: false,
      };

    case eventsConstants.CREATE_EVENT_REQUEST:
      return {
        ...state,
        isCreatingEvent: true,
      };
    case eventsConstants.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        isCreatingEvent: false,
      };
    case eventsConstants.CREATE_EVENT_FAILURE:
      return {
        ...state,
        isCreatingEvent: false,
      };
    
    case eventsConstants.UPDATE_EVENT_REQUEST:
      return {
        ...state,
        isUpdatingEvent: true,
      };
    case eventsConstants.UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        isUpdatingEvent: false,
      };
    case eventsConstants.UPDATE_EVENT_FAILURE:
      return {
        ...state,
        isUpdatingEvent: false,
      };
    
    case eventsConstants.DELETE_EVENT_REQUEST:
      return {
        ...state,
        isDeletingEvent: true,
      };
    case eventsConstants.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        isDeletingEvent: false,
      };
    case eventsConstants.DELETE_EVENT_FAILURE:
      return {
        ...state,
        isDeletingEvent: false,
      };
      
    default:
      return state;
  }
}
