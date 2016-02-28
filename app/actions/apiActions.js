"use strict";

import AppDispatcher from "../dispatcher/appDispatcher";
import ActionTypes from "../constants/actionTypes";
import apiWrapper from "../api/apiWrapper";

const _apiWrapper =  new apiWrapper();

export default class ApiActions {
  constructor(){
    this.getDataFromSpotify = this.getDataFromSpotify.bind(this);
  }

  static getDataFromSpotify(genre) {
    _apiWrapper.getTracksByGenre(genre)
    .then( tracks => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.SET_TRACKS,
        tracks: tracks
      });
    })
    .catch( err => {
      console.log(err);
    });

  }

  static authenticate(){
    const authState = _apiWrapper.verifyAuthentication();
    if(authState){
      AppDispatcher.dispatch({
        actionType: ActionTypes.SET_AUTH,
        auth: authState
      });
    }
    else{
      _apiWrapper.requestAuthentication();
    }
  }

  static savePlaylist(tracks, userInput){
    _apiWrapper.saveTracksAsPlaylist(tracks, userInput)
    .then( response => {
      if(response){
        AppDispatcher.dispatch({
          actionType: ActionTypes.SAVE_PLAYLIST,
          playlistHasBeenSaved: response
        });
      }
    })
    .catch( err => {
      console.log(err);
    });
  }

}
