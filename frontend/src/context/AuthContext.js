import { createContext,useReducer  } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
  user: null,
  //  user:{
  //    _id:  "635000e2870db5f374d4e0a7" ,
  //   userName:"pascal" ,
  //   password: "$2b$10$Tu5KYYVK8g6m1w8VU9nAs.Whb.l2HEVOlQ5005ajyYHNBtUDUp/La",
  //    profilePicture:"",
  //     followers:[],
  //    followings:[],
  //   },
    
  isFetching: false,
  error: false
};
export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,      
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  ); };
