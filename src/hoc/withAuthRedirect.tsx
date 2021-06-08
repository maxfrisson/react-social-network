import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { AppStateType } from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

type MapStatePropsType = ReturnType<typeof mapStateToPropsForRedirect>

export function withAuthRedirect(WrappedComponent: React.ComponentType) {
  const RedirectComponent: React.FC<MapStatePropsType>  = (props) => {
    
    if (!props.isAuth) return <Redirect to="/login" />;

    return <WrappedComponent {...props} />;
  }

  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

  return ConnectedAuthRedirectComponent;
}
