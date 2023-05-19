import { ADD_MESSAGE } from "../constants/index";

const initialState = {
  messages: [],
};

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE: {
      return {
        messages: [
          {
            senderName: action.senderName,
            content: action.content,
          },
          ...state.messages,
        ],
      };
    }
    default:
      return state;
  }
}
