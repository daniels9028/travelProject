import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
} from "./store/thunks/authenticationThunks";
import { AppDispatch, RootState } from "./store/store";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { message } = useSelector((state: RootState) => state.authentication);

  useEffect(() => {
    // Try register
    // dispatch(
    //   registerUserThunk({
    //     email: "daniel3@gmail.com",
    //     password: "123456",
    //     passwordRepeat: "12345678",
    //     name: "Daniel",
    //     role: "admin",
    //     profilePictureUrl:
    //       "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
    //     phoneNumber: "08976041232",
    //   })
    // );
    // Try login
    // dispatch(
    //   loginUserThunk({
    //     email: "daniel1@gmail.com",
    //     password: "1234567",
    //   })
    // );
    // Try logout
    // dispatch(logoutUserThunk());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">{message}</h1>
    </div>
  );
};

export default App;
