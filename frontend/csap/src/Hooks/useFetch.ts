import { useEffect, useReducer } from "react";
import axios from "../Utils/axiosInstance";
import { redirect, useLocation } from "react-router-dom";
import { logoutUser } from "../Feature/User/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
type props = {
  url: string;
  method: ACTIONS;
  data: [];
};

export enum ACTIONS {
  API_REQUEST = "api-request",
  GET_REQUEST = "get-request",
  POST_REQUEST = "post-request",
  PATCH_REQUEST = "patch-request",
  DELETE_REQUEST = "delete-request",
  ERROR = "error",
}

export type FetchState = {
  data: {
    data: [];
    status: string;
    statusCode: number;
    message: string;
  };
  loading: boolean;
  error: string | null;
};
const initialState: FetchState = {
  data: { data: [], status: "", statusCode: 0, message: "" },
  loading: true,
  error: null,
};

interface FetchAction {
  type: ACTIONS;
  payload: FetchState;
}

const KnownResponseErrors = {
  NotAuthenticated: "Authentication Required!",
  Unauthorized: "Unauthorized",
};

function reducer(_state: FetchState, { type, payload }: FetchAction) {
  console.log(payload);
  switch (type) {
    case ACTIONS.API_REQUEST:
      return payload;
    case ACTIONS.GET_REQUEST:
      return payload;
    case ACTIONS.DELETE_REQUEST:
      return payload;
    case ACTIONS.PATCH_REQUEST:
      return payload;
    case ACTIONS.ERROR:
      return payload;
    case ACTIONS.POST_REQUEST:
      return payload;
    default:
      return initialState;
  }
}

function useFetch({ url, data, method }: props) {
  const dispatchState = useDispatch();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ACTIONS.API_REQUEST, payload: initialState });
    switch (method) {
      case ACTIONS.GET_REQUEST:
        get(url);
        break;
      case ACTIONS.POST_REQUEST:
        post(url, data);
        break;
      case ACTIONS.DELETE_REQUEST:
        del(url, data);
        break;
      case ACTIONS.PATCH_REQUEST:
        patch(url, data);
        break;
      default:
        break;
    }
  }, [url]);

  async function get(url: string) {
    console.log("get");
    await axios
      .get(url)
      .then((res) => {
        dispatch({
          type: ACTIONS.GET_REQUEST,
          payload: { ...state, data: res.data, loading: false },
        });
      })
      .catch((err: Error) => {
        console.log(err);
        ResolveAuthError(err);
        dispatch({
          type: ACTIONS.ERROR,
          payload: { ...state, error: err.message, loading: false },
        });
      });
  }
  async function post(url: string, data: object[]) {
    if (data.length === 0)
      dispatch({
        type: ACTIONS.ERROR,
        payload: {
          loading: false,
          data: initialState.data,
          error: "post body is Required!",
        },
      });
    await axios
      .post(url, data)
      .then((res) => {
        dispatch({
          type: ACTIONS.GET_REQUEST,
          payload: { ...state, data: res.data, loading: false },
        });
      })
      .catch((err: Error) => {
        ResolveAuthError(err);
        dispatch({
          type: ACTIONS.ERROR,
          payload: { ...state, error: err.message, loading: false },
        });
      });
  }

  async function del(url: string, data: object[]) {
    await axios
      .delete(url, { data })
      .then((res) => {
        dispatch({
          type: ACTIONS.GET_REQUEST,
          payload: { ...state, data: res.data, loading: false },
        });
      })
      .catch((err: Error) => {
        ResolveAuthError(err);
        dispatch({
          type: ACTIONS.ERROR,
          payload: { ...state, error: err.message, loading: false },
        });
      });
  }
  async function patch(url: string, data: object[]) {
    // checking data to patch is not empty
    if (data.length === 0)
      dispatch({
        type: ACTIONS.ERROR,
        payload: {
          loading: false,
          data: initialState.data,
          error: "post body is Required!",
        },
      });
    await axios
      .patch(url, data)
      .then((res) => {
        dispatch({
          type: ACTIONS.GET_REQUEST,
          payload: { ...state, data: res.data, loading: false },
        });
      })
      .catch((err: Error) => {
        ResolveAuthError(err);
        dispatch({
          type: ACTIONS.ERROR,
          payload: { ...state, error: err.message, loading: false },
        });
      });
  }

  // Handle Authentication Errors
  function ResolveAuthError(error: Error) {
    if (error.message.includes(KnownResponseErrors.NotAuthenticated)) {
      dispatchState(logoutUser(""));
      return navigate("/login", { replace: true });
    } else if (error.message.includes(KnownResponseErrors.Unauthorized)) {
      return redirect("/unauthrozed", { statusText: "Unauthorized" });
    }
  }
  return state;
}

export default useFetch;
