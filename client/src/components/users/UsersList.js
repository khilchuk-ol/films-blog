import React, { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import UserItem from "../users/UserItem";

function UsersList(props) {
  const { username } = props;
  const [state, setState] = useState({
    users: [],
    page: 0,
    size: 20,
  });

  useEffect(() => {
    UserService.getAllUsers(state.page, state.size, username).then((res) => {
      setState((prev) => ({
        ...prev,
        users: res.data.items,
      }));
    });
  }, [state.page]);

  return (
    <div className="container-lg mt-3 p-3">
      {state.users.map((u) => {
        return <UserItem item={u} key={`${u.id}`} />;
      })}
    </div>
  );
}

export default UsersList;
