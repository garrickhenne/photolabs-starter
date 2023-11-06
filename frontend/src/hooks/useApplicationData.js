import { useEffect, useReducer } from "react";
import { reducer, ACTIONS } from "./reducer";

const API_ROUTES = {
  GET_PHOTOS: "http://localhost:8001/api/photos",
  GET_TOPICS: "http://localhost:8001/api/topics",
  GET_PHOTOS_BY_TOPICS: "http://localhost:8001/api/topics/photos/:topic_id",
};

const initialState = {
  showDetailsModal: false,
  modalPhotoData: {},
  likes: [],
  photos: [],
  topics: []
};

export const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Call API for photos and topics.
    const fetchPhotos = fetch(API_ROUTES.GET_PHOTOS).then(res => res.json());
    const fetchTopics = fetch(API_ROUTES.GET_TOPICS).then(res => res.json());

    Promise.all([fetchPhotos, fetchTopics])
      .then(data => {
        const [photoData, topicData] = data;

        // Update photo and topic states with data.
        dispatch({ type: ACTIONS.SET_PHOTO_DATA, value: photoData });
        dispatch({ type: ACTIONS.SET_TOPIC_DATA, value: topicData });
      });
  }, []);

  const updateToFavPhotoIds = (id) => {
    // Check if id already exists. If it does then remove it.
    if (state.likes.includes(id)) {
      dispatch({ type: ACTIONS.FAV_PHOTO_REMOVED, value: id });
      return;
    }

    // Otherwise add the liked id.
    dispatch({ type: ACTIONS.FAV_PHOTO_ADDED, value: id });
  };

  const setPhotoSelected = (photoData) => {
    dispatch({ type: ACTIONS.SELECT_PHOTO, value: photoData });
    dispatch({ type: ACTIONS.DISPLAY_PHOTO_DETAILS });
  };

  const fetchPhotosByTopicId = (topicId) => {
    const urlWithTopicId = API_ROUTES.GET_PHOTOS_BY_TOPICS.replace(':topic_id', topicId);

    // Call API for photos with given topic id and update photos state.
    fetch(urlWithTopicId)
      .then(res => res.json())
      .then(photos => {
        dispatch({ type: ACTIONS.SET_PHOTO_DATA, value: photos });
      });
  };

  const filterPhotos = (searchText) => {
    if (searchText === '') {
      return;
    }
    console.log(`Attempting to search for text with ${searchText}`);
    // Perform some escaping or something

    // Endpoint is /api/search/:text

  };

  return {
    state: state,
    onPhotoSelect: setPhotoSelected,
    updateToFavPhotoIds,
    fetchPhotosByTopicId,
    filterPhotos
  };
};