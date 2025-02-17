import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../store/authSlice";

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <div style={styles.userInfo}>
      <p style={styles.name}>{user?.name}</p>
      <button style={styles.logout} onClick={() => dispatch(logoutSuccess())}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  name: {
    color: "#FC842D",
    fontWeight: "bold",
  },
  logout: {
    background: "transparent",
    border: "none",
    color: "#9B9FAA",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default UserInfo;
