import { ADD_MESSAGE } from "../constants/index";

export const addMessage = (payload) => ({
  type: ADD_MESSAGE,
  ...payload,
});
