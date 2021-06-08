import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { actions } from "../../redux/dialogsReducer";
import { AppStateType } from "../../redux/redux-store";
import Dialogs from "./Dialogs";

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage
  };
};
// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     addMessage: (newMessageBody: string) => {
//       dispatch(actions.AddMessage(newMessageBody));
//     },
//   };
// };

export default compose<React.ComponentType>(connect(mapStateToProps, {...actions}), withAuthRedirect)(Dialogs);
