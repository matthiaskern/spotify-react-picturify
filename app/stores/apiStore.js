"use strict";

import Store from "./defaultStore";
import AppDispatcher from "../dispatcher/appDispatcher";
import ActionTypes from "../constants/actionTypes";

let _tracks, _auth, _playlistHasBeenSaved;
class ApiStore extends Store {
  constructor() {
    super();
  }

  getTracks() {
  	return _tracks;
  }
  getAuth() {
    return _auth;
  }
  getSaveStatus() {
    return _playlistHasBeenSaved;
  }
}

let apiStoreInstance = new ApiStore();
apiStoreInstance.dispatchToken = AppDispatcher.register( action => {
  switch(action.actionType) {
    case ActionTypes.SET_TRACKS:
      _tracks = action.tracks;
      apiStoreInstance.emitChange();
      break;

    case ActionTypes.SET_AUTH:
      _auth = action.auth;
      apiStoreInstance.emitChange();
      break;

    case ActionTypes.SAVE_PLAYLIST:
      _playlistHasBeenSaved = action.playlistHasBeenSaved;
      apiStoreInstance.emitChange();
      break;

    default:
      return;
  }

  apiStoreInstance.emitChange();
});

export default apiStoreInstance;
