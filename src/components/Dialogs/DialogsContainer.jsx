import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
  AddMessageActionCreator,
  UpdateNewMessageTextActionCreator,
} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

// const DialogsContainer = (props) => {
//   let state = props.store.getState();

//   let addMessage = () => {
//     props.store.dispatch(AddMessageActionCreator());
//   };

//   let onMessageChange = (text) => {
//     props.store.dispatch(UpdateNewMessageTextActionCreator(text));
//   };

//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         let state = store.getState();

//         let addMessage = () => {
//           store.dispatch(AddMessageActionCreator());
//         };

//         let onMessageChange = (text) => {
//           store.dispatch(UpdateNewMessageTextActionCreator(text));
//         };

//         return (
//           <Dialogs
//             addMessage={addMessage}
//             updateNewMessageText={onMessageChange}
//             dialogs={state.dialogsPage.dialogs}
//             messages={state.dialogsPage.messages}
//             newMessageText={state.dialogsPage.newMessageText}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: () => {
      dispatch(AddMessageActionCreator());
    },
    updateNewMessageText: (text) => {
      dispatch(UpdateNewMessageTextActionCreator(text));
    },
  };
};

// let AuthRedirectComponent = withAuthRedirect(Dialogs);

// (props) => {
//   if (!this.props.isAuth) return <Redirect to="/login" />;
//   return <Dialogs {...props} />
// }

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect,
)(Dialogs);
