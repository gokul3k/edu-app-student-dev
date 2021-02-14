import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import Questions from "components/widgets/Questions";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import QuestionsList from "components/widgets/QuestionList";

const useStyles = makeStyles((theme) => ({
  root: {},
}));
export default function QuestionPalette({ switchQuestion, current }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState({});
  const handleClick = (type) => {
    setOpen({...open,[type]:!open[type]});
  };
 const {details} = useSelector((State)=>State.exam)
  return (
    <div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" style={{color:"white",fontWeight:"bold",fontSize:22}}>
            Questions
            {Object.keys(details.Categories).map((t,i) => (
                <QuestionsList
                  open={open}
                  i={i}
                  handleClick={handleClick}
                  type={t}
                  current={current}
                  switchQuestion={switchQuestion}
                />
            ))}
          </ListSubheader>
        }
        className={classes.root}
      ></List>
    </div>
  );
}
