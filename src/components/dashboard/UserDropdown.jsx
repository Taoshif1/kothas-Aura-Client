import { FiLogOut } from "react-icons/fi";

import useAuth from "../../hooks/useAuth";

const UserDropdown = () => {
  const { user, logoutUser } = useAuth();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="avatar cursor-pointer">
        <div className="w-12 rounded-full">
          <img
            src={
              user?.photoURL ||
              `https://ui-avatars.com/api/?name=${user?.displayName}`
            }
            alt=""
          />
        </div>
      </div>

      <ul
        tabIndex={0}
        className="menu dropdown-content mt-4 w-64 rounded-2xl bg-white p-2 shadow-xl"
      >
        <li className="pointer-events-none p-3">
          <h3>{user?.displayName}</h3>

          <small>{user?.email}</small>
        </li>

        <li>
          <button onClick={logoutUser}>
            <FiLogOut />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
