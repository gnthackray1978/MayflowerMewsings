import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import QuestionOutline from "./QuestionOutline.jsx";
import QuestionInput from "./QuestionInput.jsx";
import {MatchLib} from "../../scripts/MatchLib.js"
import {ScoreLib} from "../../scripts/ScoreLib.js"
import { connect } from "react-redux";

import { setQuizMetaData,setCatSelection,setQuizName,setQuizCat,setQuestionVisibility} from "../../actions/creators.jsx";



const styles = theme => ({
  root: {
     padding: '2px 4px',
     display: 'flex',
     alignItems: 'center',
     width: 300,
   },

  answerContainer: {
    width: 320,
    margin :5,
    padding: 10
  },

  questionContent: {
  //  height: 110,
    width: 320,
    margin: 0,
    padding: 0

  },

  button: {
    margin :0,
    top: -11
  },

  toprow: {

    height:35
  },

  questionrow: {

    height:55
  },

  red: {
    color: 'red',
    display: 'contents'
  },
  black: {
    color: 'black',
    display: 'contents'
  },

  answersofarlabel: {
    marginTop :5,
    height:30
  },
  answersofar: {
    marginTop :5,
    height:70
  }

});






class MultiAnswer extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
                    answerInput : '',
                    answers :[]
                  };
    }


   componentWillMount() {
     let answerData = this.props.answerData;
     let answerArray = this.props.value.answer.map((id)=>{
       return answerData[id].answer;
     });

     this.setState({
       answers : answerArray,
     });

    // console.log(' answer array now:  '+ this.state.answers.length);
   }

  onClick = (arg)=>{
    MatchLib.Match(this.state.answers,this.state.answerInput, 2, (correctAnswers,remainingAnswers)=>{
      console.log(correctAnswers.length + ' ' + remainingAnswers.length);
    });
  }



  render() {
    const { classes,value,questionVisibility,quizMetaData,selectQuizCat,selectedQuiz,answerData } = this.props;

    let questionKey = value.id + '-' + selectedQuiz.key + '-'+selectQuizCat;
    const tpAnswerSoFar = ['oranges', 'and', 'lemons', 'sing', 'the','bells','of','st clements'];
    let answerVisible = false;

    if(questionVisibility.hasOwnProperty(questionKey)){
       answerVisible =questionVisibility[questionKey].visible
    }

    const handleOnChange = event => {
      //  console.log('Click');
      //  console.log(event.target.value);

        this.setState({
          answerInput : event.target.value,
        });

      };

    //check answer

    //store correct ansswers
    //store incorrect answers

    //calculate scores
    //store question score
    //store test score

    const formatAnswer =(value,index)=>{
        if(index !=0) value = ',' + value;

        if(index % 2 ==0){
          return   <Typography variant="h6" className ={classes.black}  >
              {value}
            </Typography>
        }
        else {
            return   <Typography variant="h6"  className ={classes.red}  >
                {value}
              </Typography>
          }
    };

  //  let matchLib = this.MatchLib;



    //onClick.bind(this);

    let experiment =  <div>

                      <QuestionInput onChange={handleOnChange} onClick = {this.onClick}/>


                      <Typography variant="h6" color="inherit"  className ={classes.answersofarlabel}>
                        Answer so far
                      </Typography>

                      <Paper className={classes.root} elevation={1} className ={classes.answersofar}>
                        {tpAnswerSoFar.map((value,index) => (
                             formatAnswer(value,index)
                           ))}
                      </Paper>

                      </div>



    let tpAnswer = this.state.answers.map((value,index) => (
         formatAnswer(value,index)
       ));


    let answerBlock = <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
                         {tpAnswer}
                       </Typography>

    let result;

    if(!answerVisible) result = experiment;
    if(answerVisible) result = answerBlock;

    return (
      <QuestionOutline label = 'Multi Answer' score = '90%' question = {value.question}  value = {value}>{result}</QuestionOutline>
    );
  }
}

// <Grid item xs={12}>
//   <QuestionFooter  buttonClicked = { this.handleInput }/>
// </Grid>


const mapStateToProps = state => {
  return {

    quizMetaData : state.quizMetaData,
    catSelection : state.catSelection,
    selectQuizCat : state.selectQuizCat,
    selectedQuiz : state.selectedQuiz,
    questionVisibility :state.questionVisibility,
    answerData : state.answerData
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setQuestionVisibility :data =>{
      dispatch(setQuestionVisibility(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MultiAnswer));
