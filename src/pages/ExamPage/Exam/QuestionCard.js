import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Button, Grid, Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Flag } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { updateResponse } from "actions/examActions";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    margin: 16,
    flex: 1,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  group: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 16,
  },
  paper: {
    padding: 8,
  },
  question: {
    fontWeight: "bold",
    padding: 24,
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    borderRadius: 10
  },
  opt: {
    textTransform: "none",
  },
  optButton: {
    minWidth: 200,
    minHeight: 50,
    textTransform: "none",
    margin: 8,
    color: "black",
    marginTop: 16,
    marginBottom: 16,
    border: "1px solid rgba(0, 0, 0, 0.12) !important",
    "&.MuiToggleButton-root.Mui-selected": {
      color: "white",
      backgroundColor: theme.palette.primary.light,
      border: "1px solid rgba(0, 0, 0, 0.12) !important",
    },
  },
  flag: {
    textTransform: "none",
    fontSize: 12,
    border: "1px solid rgba(0, 0, 0, 0.12)",
    "&.MuiToggleButton-root.Mui-selected": {
      color: "white",
      backgroundColor: "grey",
      border: "1px solid rgba(0, 0, 0, 0.12)",
    },
  },
}));

export default function QuestionCard({ current, onNext, onPrev }) {
  const { responses } = useSelector((state) => state.response);
  const { questions } = useSelector((state) => state.exam);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [option, setOption] = useState(null);
  const [selected, setSelected] = useState(false);

  const getOpt = (nextView) => {
    switch (nextView) {
      case 'a':
        return questions[current].Option1
      case 'b':
        return questions[current].Option2
      case 'c':
        return questions[current].Option3
      case 'd':
        return questions[current].Option4
      default:
        return null
    }
  }
  useEffect(() => {
    console.log(responses[current])
    if (responses && responses[current]) {
      setOption(getOpt(responses[current].ans));
      setSelected(responses[current].flag);
    } else {
      setOption(null);
      setSelected(false);
      dispatch(
        updateResponse({
          index: current,
          id: questions[current].id,
          flag: false,
          ans: null,
          type: questions[current].Type,
        })
      );
    }
    return () => { };
  }, [current]);

  const getVal = (nextView) => {
    switch (nextView) {
      case questions[current].Option1:
        return 'a'
      case questions[current].Option2:
        return 'b'
      case questions[current].Option3:
        return 'c'
      case questions[current].Option4:
        return 'd'
      default:
        return ''
    }
  }

  const handleChange = (event, nextView) => {

    setOption(nextView);
    dispatch(
      updateResponse({
        index: current,
        id: questions[current].id,
        ans: getVal(nextView),
        type: questions[current].Type,
      })
    );
  };
  const renderOption = (opt) => {
    return (
      <ToggleButton className={classes.optButton} value={opt} aria-label={opt}>
        <Typography className={classes.opt}>{opt}</Typography>
      </ToggleButton>
    );
  };
  const clear = () => {
    dispatch(
      updateResponse({
        index: current,
        id: questions[current].id,
        ans: null,
        flag: false,
        type: questions[current].Type,
      })
    );
    setOption(null);
  };
  return (
    <div className={classes.root}>
      <div className={classes.buttons}>

        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => clear()}
          disableElevation
        >
          clear
            </Button>
      </div>
      <Paper className={classes.paper}>
        <Grid direction="column">
          <Typography className={classes.question}>
            {questions[current].Question}
          </Typography>
          <ToggleButtonGroup
            orientation="vertical"
            value={option}
            exclusive
            size="small"
            onChange={handleChange}
          >
            {questions[current].Option1 &&
              renderOption(questions[current].Option1)}
            {questions[current].Option2 &&
              renderOption(questions[current].Option2)}

            {questions[current].Option3 &&
              renderOption(questions[current].Option3)}
            {questions[current].Option4 &&
              renderOption(questions[current].Option4)}

          </ToggleButtonGroup>
          <Grid container direction="row" justify="space-between">
            <ToggleButton
              value="check"
              size="small"
              className={classes.flag}
              selected={selected}
              onChange={() => {
                dispatch(
                  updateResponse({
                    index: current,
                    id: questions[current].id,
                    flag: !selected,
                    type: questions[current].Type,
                  })
                );
                setSelected(!selected);
              }}
            >
              <Flag />
              <Typography>Flag for review</Typography>
            </ToggleButton>
            <div className={classes.group}>
              <Button
                disabled={current === 0}
                variant="contained"
                color="primary"
                onClick={onPrev}
                style={{marginRight:"22px"}}
                size="small"
              >
                Previous
        </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={current === questions.length - 1}
                size="small"
                onClick={() => {
                  onNext();
                }}
              >
                Next
        </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
