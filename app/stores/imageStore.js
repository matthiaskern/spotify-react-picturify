"use strict";

import Store from "./defaultStore";
import AppDispatcher from "../dispatcher/appDispatcher";
import ActionTypes from "../constants/actionTypes";
import colorMappings from "../constants/colorMappings";
import {getClosestColor} from "../helpers";

let _image, _swatches, _genre;

class ImageStore extends Store {

  constructor() {
    super();
  }

  getSwatches() {
  	return _swatches;
  }

  getImage() {
    return _image;
  }

  getGenre() {
    return _genre;
  }
}


let imageStoreInstance = new ImageStore();

imageStoreInstance.dispatchToken = AppDispatcher.register( action => {
  switch(action.actionType) {
    case ActionTypes.ADD_IMAGE:
      _image = action.image;
      imageStoreInstance.emitChange();
      break;

    case ActionTypes.ADD_SWATCHES:
      _swatches = action.swatches;
      let vibrantColors = [action.swatches["Vibrant"], action.swatches["DarkVibrant"], action.swatches["LightVibrant"]];
      vibrantColors = vibrantColors.filter( Boolean );
      if (vibrantColors[0]){
        const closest = getClosestColor(vibrantColors[0].rgb, colorMappings);
        _genre = closest.genre;
        imageStoreInstance.emitChange();
      }
      break;

    default:
      return;
  }

  imageStoreInstance.emitChange();
});

export default imageStoreInstance;
