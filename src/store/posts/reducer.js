import {
  SET_TAGS,
  SET_POSTS,
  UPDATE_FILTER,
  GET_POST_BY_ID,
  GET_RELATED_POSTS,
} from "./constants";
import { tags, tagColors } from "../../data";
import config from "../../config";

const initialState = {
  posts: [],
  meta: null,
  tags,
  tagColors,
  selectedPost: null,
  filters: {
    search: "",
    page: 1,
    limit: config.POST_COUNT,
    tags: [],
  },
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS: {
      return {
        ...state,
        posts: action.payload.posts,
        meta: action.payload.meta,
      };
    }
    case SET_TAGS: {
      return {
        ...state,
        tags: action.payload,
        tagColors: action.payload.reduce(
          (obj, { value, color }) => ({ ...obj, [value]: color }),
          {}
        ),
      };
    }
    case UPDATE_FILTER: {
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    }
    case GET_POST_BY_ID: {
      return {
        ...state,
        selectedPost: action.payload,
      };
    }
    case GET_RELATED_POSTS: {
      return {
        ...state,
        relatedPosts: action.payload,
      };
    }
    default:
      return state;
  }
};

export default postReducer;
