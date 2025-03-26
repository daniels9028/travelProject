import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { message } = useSelector((state: RootState) => state.user);

  useEffect(() => {}, [dispatch]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">{message.updateUserRole}</h1>
    </div>
  );
};

export default App;
