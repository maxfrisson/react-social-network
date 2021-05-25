import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { AddMessageActionCreator } from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (newMessageBody) => {
      dispatch(AddMessageActionCreator(newMessageBody));
    },
  };
};

// let AuthRedirectComponent = withAuthRedirect(Dialogs);

// (props) => {
//   if (!this.props.isAuth) return <Redirect to="/login" />;
//   return <Dialogs {...props} />
// }

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);