import { connect } from "react-redux";
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
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    newMessageText: state.dialogsPage.newMessageText,
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

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
