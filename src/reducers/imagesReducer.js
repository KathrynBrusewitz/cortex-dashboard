import { imagesConstants } from '../actions';

const IMAGES_INITIAL = {
  image: null,
  images: null,
  isGettingImage: false,
  isGettingImages: false,
  isCreatingImage: false,
  isUpdatingImage: false,
  isDeletingImage: false,
};

export const imagesReducer = (state = IMAGES_INITIAL, action) => {
  switch (action.type) {
    case imagesConstants.GET_IMAGE_REQUEST:
      return {
        ...state,
        isGettingImage: true,
      };
    case imagesConstants.GET_IMAGE_SUCCESS:
      return {
        ...state,
        image: action.payload,
        isGettingImage: false,
      };
    case imagesConstants.GET_IMAGE_FAILURE:
      return {
        ...state,
        image: null,
        isGettingImage: false,
      };

    case imagesConstants.GET_IMAGES_REQUEST:
      return {
        ...state,
        isGettingImages: true,
      };
    case imagesConstants.GET_IMAGES_SUCCESS:
      return {
        ...state,
        images: action.payload,
        isGettingImages: false,
      };
    case imagesConstants.GET_IMAGES_FAILURE:
      return {
        ...state,
        images: null,
        isGettingImages: false,
      };

    case imagesConstants.CREATE_IMAGE_REQUEST:
      return {
        ...state,
        isCreatingImage: true,
      };
    case imagesConstants.CREATE_IMAGE_SUCCESS:
      return {
        ...state,
        isCreatingImage: false,
      };
    case imagesConstants.CREATE_IMAGE_FAILURE:
      return {
        ...state,
        isCreatingImage: false,
      };
    
    case imagesConstants.UPDATE_IMAGE_REQUEST:
      return {
        ...state,
        isUpdatingImage: true,
      };
    case imagesConstants.UPDATE_IMAGE_SUCCESS:
      return {
        ...state,
        isUpdatingImage: false,
      };
    case imagesConstants.UPDATE_IMAGE_FAILURE:
      return {
        ...state,
        isUpdatingImage: false,
      };
    
    case imagesConstants.DELETE_IMAGE_REQUEST:
      return {
        ...state,
        isDeletingImage: true,
      };
    case imagesConstants.DELETE_IMAGE_SUCCESS:
      return {
        ...state,
        isDeletingImage: false,
      };
    case imagesConstants.DELETE_IMAGE_FAILURE:
      return {
        ...state,
        isDeletingImage: false,
      };
      
    default:
      return state;
  }
}
