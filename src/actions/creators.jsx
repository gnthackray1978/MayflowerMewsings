

export const setSideDrawerLoaderVisible = visible =>{
  return async dispatch  => {
    dispatch({
      type: "SET_SDLOADVISIBLE",
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

// case "SET_QUESTIONVISIBILITY":
//   return {
//     ...state,
//     questionVisibility : action.questionVisibility,
// };

export const setQuestionVisibility= data =>{
  return async dispatch  => {
    dispatch({
      type: "SET_QUESTIONVISIBILITY",
      questionVisibility :{...data}
    });
  };
}

export const setProfileObj= profileObj =>{
  return async dispatch  => {
    dispatch({
      type: "SET_PROFILE",
      profileObj :profileObj
    });
  };
}
 
export const setAddQuizName= (quizAddName) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_ADDQUIZNAME",
      quizAddName : quizAddName
    });
  };
}

export const setEditQuizName= (quizEditName) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_EDITQUIZNAME",
      quizEditName : quizEditName
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





export const setCurrentTest= (currentTest) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_CURRENTTEST",
      currentTest : currentTest
    });
  };
}

export const setTestBatch= (testList, currentTest) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_TESTBATCH",
      currentTest : currentTest,
      testList : testList,
      testActive :true
    });
  };
}

export const setEndTestBatch= (currentTest, testList) =>{
  return async dispatch  => {


    dispatch({
      type: "SET_ENDTEST",
      currentTest : currentTest,
      testList : testList,
      testActive :false
    });

  };
}

export const setTestActive= (testActive) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_TESTACTIVE",
      testActive : testActive
    });
  };
}

export const setQuizName= selectedQuiz =>{
  return async dispatch  => {
    dispatch({
      type: "SET_QUIZNAME",
      selectedQuiz : selectedQuiz
    });
  };
}
export const setQuizCat= selectQuizCat =>{
  return async dispatch  => {
    dispatch({
      type: "SET_QUIZCAT",
      selectQuizCat :selectQuizCat
    });
  };
}


export const setGoogleToken= (googleId,tokenObj,tokenId,accessToken) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_GOOGLETOKEN",
      GoogleToken : {
        googleId :googleId,
        tokenObj :tokenObj,
        tokenId :tokenId,
        accessToken :accessToken,
      }
    });
  };
}


export const setGoogleApiActive = isActive =>{
  return async dispatch  => {
    dispatch({
      type: "SET_GOOGLEAPIACTIVE",
      googleApiLoggedIn :isActive
    });
  };
}

export const setQuizMetaData = data =>{
  return async dispatch  => {
    dispatch({
      type: "SET_QUIZMETADATA",
      quizMetaData :data
    });
  };
}



export const setQuizQuestionData = data =>{
  return async dispatch  => {
    dispatch({
      type: "SET_QUIZQUESTIONDATA",
      quizQuestions :data
    });
  };
}

export const setCombinedQuizData = data =>{
  return async dispatch  => {
    dispatch({
      type: "SET_COMBINEDDATA",
      data : data
    });
  };
}

export const setRelatedUserAnswers = data =>{
  return async dispatch  => {
    dispatch({
      type: "SET_RELATEDUSERANSWERS",
      data : data
    });
  };
}



export const setCatSelection = data =>{
  return async dispatch  => {
    dispatch({
      type: "SET_CATSELECTION",
      catSelection :data
    });
  };
}






export const beginSearch = term => {

  return async dispatch  => {
    dispatch({
      type: "BEGIN_SEARCH",
      term
    });

  };

};

export const setNameFilter = filter =>{
  return async dispatch  => {
    dispatch({
      type: "SET_GEDNAMEFILTER",
      filter: filter
    });

  };
}

export const setSubsetFDParams = (runfrom, speed, increment, zoomthreshold,nodethreshold, stiffness, repulsion, damping) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_SUBSETFDPARAMS",
      runfrom: runfrom,
      speed: speed,
      increment: increment,
      zoomthreshold: zoomthreshold,
      nodethreshold: nodethreshold,
      stiffness: stiffness,
      repulsion: repulsion,
      damping: damping,
    });

  };
}


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



export const initYearIncrementor = (increment,speed) => {
  return async dispatch  => {
    dispatch({
      type: "YEAR_INCREMENT_INIT",
      incrementSize : increment,
      timeSpeed : speed
    });
  };
};

export const gedLoadingStatus = (message, show) => {
  return async dispatch  => {
    dispatch({
      type: "GED_LOAD_STATUS",
      gedLoadingMessage : message,
      gedLoadingMessagesDisplayed : show
    });
  };
};

export const setContext = (context) => {
  return async dispatch  => {
    dispatch({
      type: "SET_CONTEXT",
      context : context
    });
  };
};

export const gedLoadFailed = (message) => {
  return async dispatch  => {
    dispatch({
      type: "GED_LOAD_ERROR",
      gedLoaded :false,
      gedError :message
    });
  };
};

export const setRowsPerPage = rowsPerPage =>{
  return async dispatch  => {

    if(rowsPerPage){
      dispatch({
        type: "SET_ROWSPERPAGE",
        rowsPerPage : rowsPerPage,

      });
    }
    else{
      dispatch({
        type: "SET_ROWSPERPAGE",
        rowsPerPage : Math.round(window.innerHeight /82),

      });
    }
  };
}
// export const setSideDrawerLoaderVisible = visible =>{
//   return async dispatch  => {
//     dispatch({
//       type: "SET_SDLOADVISIBLE",
//       visible :visible
//     });
//   };
// }
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



export const setPage = page =>{
  return async dispatch  => {
    dispatch({
      type: "SET_PAGE",
      page :page
    });
  };
}

export const setSelected = selection =>{
  return async dispatch  => {
    dispatch({
      type: "SET_SELECTED",
      selection :selection
    });
  };
}

export const setOrder = (order,orderBy) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_ORDER",
      order :order,
      orderBy : orderBy
    });
  };
}

export const setLayout = (layout) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_LAYOUT",
      layout : layout
    });
  };
}

export const activateLayout = (isActive,graphActiveLayout,graphActiveSelection) =>{
  return async dispatch  => {
    dispatch({
      type: "ACTIVATE_GRAPH",
      graphActive : isActive,
      graphActiveLayout : graphActiveLayout,
      graphActiveSelection : graphActiveSelection
    });
  };
}


export const setGedData = (persons, families,range) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_DATA",
      persons : persons,
      families : families,
      gedDataRange :range
    });
  };
}

export const zoomIn = (isSet) =>{
  return async dispatch  => {
      dispatch({
        type: "ZOOMIN_DOWN",
        isSet : isSet,
      });
  };
}

export const zoomOut = (isSet) =>{
  return async dispatch  => {
      dispatch({
        type: "ZOOMOUT_DOWN",
        isSet : isSet,
      });
  };
}


export const mapUp = (isSet) =>{
  return async dispatch  => {
      dispatch({
        type: "MAPUP_DOWN",
        isSet : isSet,
      });
  };
}

export const mapDown = (isSet) =>{
  return async dispatch  => {
      dispatch({
        type: "MAPDOWN_DOWN",
        isSet : isSet,
      });
  };
}

export const mapLeft = (isSet) =>{
  return async dispatch  => {
      dispatch({
        type: "MAPLEFT_DOWN",
        isSet : isSet,
      });
  };
}

export const mapRight = (isSet) =>{
  return async dispatch  => {
      dispatch({
        type: "MAPRIGHT_DOWN",
        isSet : isSet,
      });
  };
}

export const toggleGraphRunning = (isSet) =>{
  return async dispatch =>{
    dispatch({
      type: "TOGGLE_GRAPHRUNNING",
      isSet : isSet
    });
  };
}

export const setLayoutDefaults = (defaults) =>{
  return async dispatch =>{
    dispatch({
      type: "SET_LAYOUTDEFAULT",
      layoutDefaults : defaults
    });
  };
}


export const reset = term => {

  if(term =="rubbish"){
    return async dispatch  => {
      dispatch({
        type: "RUBBISH_SEARCH",
        term
      });

    };
  }else {
    return async dispatch  => {
      dispatch({
        type: "DONE_SEARCH",
        term
      });

    };
  }


};
