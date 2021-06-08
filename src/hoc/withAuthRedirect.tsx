import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { AppStateType } from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

type MapStatePropsType = {
  isAuth: boolean
}

type DispatchPropsType = {}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapStatePropsType & DispatchPropsType>  = (props) => {
    let { isAuth, ...restProps } = props;
    
    if (!isAuth) return <Redirect to="/login" />;

    return <WrappedComponent {...restProps as unknown as WCP} />;
  }

  let ConnectedAuthRedirectComponent = connect<MapStatePropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect, {})(RedirectComponent);

  return ConnectedAuthRedirectComponent;
}
