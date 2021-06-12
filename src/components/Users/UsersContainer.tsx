import React from "react";
import { useSelector } from "react-redux";
import { getIsFetching } from "../../redux/usersSelectors";
import Preloader from "../common/Preloader/Preloader";
import { Users } from "./Users";

type UsersPagePropsType = {
  pageTitle: string;
};
export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching);

  return (
    <>
      <h2 style={{ textAlign: "center", fontSize: "2 rem" }}>{props.pageTitle}</h2>

      <Users />

      {isFetching ? <Preloader /> : null}
    </>
  );
};
