import {
  RECEIVE_MESSAGE,
  UNSUBSCRIBE_FROM_PRODUCT_ID,
} from "../constants/action-types";

export function receiveMessage(message: MessageEvent) {
  return {
    type: RECEIVE_MESSAGE,
    payload: message,
  };
}

export function unsubscribeFromProductId(productId: string) {
  return {
    type: UNSUBSCRIBE_FROM_PRODUCT_ID,
    productId: productId,
  };
}
