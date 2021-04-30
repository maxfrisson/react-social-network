const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

let initialState = {
  users: [
    {
      id: 1,
      photoUrl: "https://htmlstream.com/preview/unify-v2.6.3/assets/img-temp/400x450/img5.jpg",
      fullName: "Max",
      status: "Hello World!!!",
      location: { city: "Kiev", country: "Ukraine" },
      followed: true,
    },
    {
      id: 2,
      photoUrl: "https://i1.rgstatic.net/ii/profile.image/820485688414213-1572630440525_Q512/Melissa-Cox-2.jpg",
      fullName: "Vika",
      status: "Hi World!!!",
      location: { city: "Brest", country: "Belarus" },
      followed: true,
    },
    {
      id: 3,
      photoUrl: "https://newdoorfiji.com/wp-content/uploads/2018/03/profile-img-1.jpg",
      fullName: "Lera",
      status: "Bye World!!!",
      location: { city: "Tula", country: "Russia" },
      followed: false,
    },
    {
      id: 4,
      photoUrl: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
      fullName: "Michael",
      status: "How are you World???",
      location: { city: "Kirov", country: "Russia" },
      followed: false,
    },
  ],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state, 
        users: state.users.map(u=> {
          if (u.id === action.userId){
            return {...u, followed: true}
          }
          return u;
        })
      }
    case UNFOLLOW:
      return {
        ...state, 
        users: state.users.map(u=> {
          if (u.id === action.userId){
            return {...u, followed: false}
          }
          return u;
        })
      }

    case SET_USERS: {
      return {...state, users: [...state.users, ...action.users]}
    } 
    default:
      return state;
  }
};

export const followAC = (userId) => ({ type: FOLLOW, userId });

export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, users });

export default usersReducer;
