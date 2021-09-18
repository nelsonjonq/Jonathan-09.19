import { RECEIVE_MESSAGE } from "../constants/action-types";

export function receiveMessage(message) {
  return {
    type: RECEIVE_MESSAGE,
    payload: message,
  };
}
