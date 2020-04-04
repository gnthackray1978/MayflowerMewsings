
export const switchControlVisbility = controlVisible =>{

  if(controlVisible){
    return async dispatch  => {
      dispatch({
        type: "CONTROLS_OPEN",
      });

    };
  }
  else{
    return async dispatch  => {
      dispatch({
        type: "CONTROLS_CLOSE",
      });

    };
  }


};

export const setSideDrawerLayoutOptionsVisible = visible =>{
  return async dispatch  => {
    dispatch({
      type: "SET_SDLAYVISIBLE",
      visible :visible
    });
  };
}
export const setSideDrawerOptionsVisible = visible =>{
  return async dispatch  => {
    dispatch({
      type: "SET_SDOPTSVISIBLE",
      visible :visible
    });
  };
}

export const setDeleteQuizMode= (quizDeleteMode) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_DELETEQUIZ",
      quizDeleteMode : quizDeleteMode
    });
  };
}

export const setEditQuizMode= (quizEditMode) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_EDITQUIZ",
      quizEditMode : quizEditMode
    });
  };
}

export const setEditNameQuizMode= (quizEditNameMode) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_EDITNAMEQUIZ",
      quizEditNameMode : quizEditNameMode
    });
  };
}

export const setAddQuizMode= (quizAddMode) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_ADDQUIZ",
      quizAddMode : quizAddMode
    });
  };
}

export const setSideDrawerLoaderVisible = visible =>{
  return async dispatch  => {
    dispatch({
      type: "SET_SDLOADVISIBLE",
      visible :visible
    });
  };
}

export const setIdsLoginDetailsVisible = visible =>{
  return async dispatch  => {
    dispatch({
      type: "SET_IDSLOGINLOADVISIBLE",
      visible :visible
    });
  };
}

export const setLoginDetailsVisible = visible =>{
  return async dispatch  => {
    dispatch({
      type: "SET_LOGINLOADVISIBLE",
      visible :visible
    });
  };
}
