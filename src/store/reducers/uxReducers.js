
export default (state = {
  SideDrawerLoaderVisible : true,
  LogInDetailsVisible : false,
  IdsLogInDetailsVisible :false,
  quizAddMode :false,
  quizDeleteMode :false,
  quizEditMode :false,
  quizEditNameMode :false
}, action) => {
  switch (action.type) {


    case "SET_IDSLOGINLOADVISIBLE":
      return {
        ...state,
        IdsLogInDetailsVisible : action.visible,
      };

    case "SET_LOGINLOADVISIBLE":
      return {
        ...state,
        LogInDetailsVisible : action.visible,
      };

    case "SET_SDLOADVISIBLE":
      return {
      ...state,
      SideDrawerLoaderVisible : action.visible,
    };

    case "SET_ADDQUIZ":
      return {
      ...state,
      quizAddMode : action.quizAddMode,
    };

    case "SET_DELETEQUIZ":
      return {
      ...state,
      quizDeleteMode : action.quizDeleteMode,
    };

    case "SET_EDITQUIZ":
      return {
      ...state,
      quizEditMode : action.quizEditMode,
    };

    case "SET_EDITNAMEQUIZ":
      return {
      ...state,
      quizEditNameMode : action.quizEditNameMode,
    };

    case "SET_SDLAYVISIBLE":
      return {
      ...state,
      SideDrawerLayoutOptionsVisible : action.visible,
    };

    case "SET_SDOPTSVISIBLE":
      return {
        ...state,
        SideDrawerOptionsVisible : action.visible,
    };

    default:
        return state;
  }
};
