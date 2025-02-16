import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../store/authSlice";

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex items-center space-x-4">
      <span className="text-lg font-semibold">{user?.name}</span>
      <button
        onClick={() => dispatch(logoutSuccess())}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default UserInfo;
