"use strict";

import AppDispatcher from "../dispatcher/appDispatcher";
import ActionTypes from "../constants/actionTypes";

export default class ImageActions {

  static addImage(image) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.ADD_IMAGE,
      image: image
    });
  }
  static addSwatches(swatches) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.ADD_SWATCHES,
      swatches: swatches
    });
  }
}
