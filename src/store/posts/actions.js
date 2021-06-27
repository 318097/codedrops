import axios from "axios";
import { get, find, includes } from "lodash";
import { captureException } from "../../lib";
import { setAppLoading } from "../app/actions";
import config from "../../config";
import {
  SET_TAGS,
  SET_POSTS,
  UPDATE_FILTER,
  GET_POST_BY_ID,
  GET_RELATED_POSTS,
  GET_BOOKMARKS,
} from "./constants";

export const fetchTags = () => async (dispatch) => {
  const {
    data: { tags },
  } = await axios.get("/posts/tags");

  const tagList = tags.map(({ _id, color, name }) => ({
    _id,
    color,
    label: name.toUpperCase(),
    value: name,
  }));

  dispatch({
    type: SET_TAGS,
    payload: tagList,
  });
};

export const fetchPosts = () => async (dispatch, getState) => {
  try {
    dispatch(setAppLoading(true));
    const {
      posts: { filters, posts },
    } = getState();
    const updatedPosts = filters && filters.page > 1 ? [...posts] : [];
    const {
      data: { posts: data, meta },
    } = await axios.get(`/posts?collectionId=${config.COLLECTION_ID}`, {
      params: filters,
    });
    updatedPosts.push(...data);
    dispatch({
      type: SET_POSTS,
      payload: {
        posts: updatedPosts,
        meta,
      },
    });
  } catch (err) {
    console.log(err);
    captureException(err);
  } finally {
    dispatch(setAppLoading(false));
  }
};

export const setFilter =
  (filterUpdate, resetPage = true) =>
  async (dispatch, getState) => {
    const { filters } = getState();
    const updatedFiters = { ...filters, ...filterUpdate };
    if (resetPage) updatedFiters["page"] = 1;
    await dispatch({ type: UPDATE_FILTER, payload: updatedFiters });
    dispatch(fetchPosts());
  };

export const getPostById = (postId) => async (dispatch, getState) => {
  try {
    dispatch(setAppLoading(true));
    const {
      posts,
      app: { session },
    } = getState();
    const postList = get(posts, "posts", []);

    let post = find(
      postList,
      (post) => post.slug === postId || post._id === postId
    );

    if (!post) {
      const { data } = await axios.get(
        `/posts/${postId}?collectionId=${config.COLLECTION_ID}`
      );
      post = get(data, "post", {});
    }

    let isBookmarked = false;
    if (session) {
      isBookmarked = includes(get(session, "bookmarkedPosts", []), post._id);
    }

    post["isBookmarked"] = isBookmarked;

    dispatch({ type: GET_POST_BY_ID, payload: post });
  } catch (err) {
    captureException(err);
  } finally {
    dispatch(setAppLoading(false));
  }
};

export const fetchRelatedPosts =
  ({ postId, tags }) =>
  async (dispatch) => {
    try {
      const {
        data: { posts },
      } = await axios.get(`/posts/random`, {
        params: { collectionId: config.COLLECTION_ID, tags, postId },
      });

      dispatch({ type: GET_RELATED_POSTS, payload: posts });
    } catch (err) {
      captureException(err);
    }
  };

export const fetchBookmarks = () => async (dispatch) => {
  try {
    const {
      data: { bookmarks },
    } = await axios.get(`/posts/bookmarks`, {
      params: { collectionId: config.COLLECTION_ID },
    });

    dispatch({ type: GET_BOOKMARKS, payload: bookmarks });
  } catch (err) {
    captureException(err);
  }
};

export const toggleBookmark =
  ({ _id, status }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setAppLoading(true));
      const {
        posts: { selectedPost },
      } = getState();

      await axios.put(`/posts/${_id}/bookmark`, {
        status,
      });

      dispatch({
        type: GET_POST_BY_ID,
        payload: { ...selectedPost, isBookmarked: status },
      });
    } catch (err) {
      captureException(err);
    } finally {
      dispatch(setAppLoading(false));
    }
  };
