import {
  ListItem,
  ListItemText,
  Collapse,
  Grid,
  Box,
} from "@material-ui/core";
import Questions from "../Questions";
import React,{useEffect} from "react";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    btn: {
        color:"white",
        borderRadius:10,

        '&:hover':{
            color:'grey'
        },
        '&:focus':{
            color:'grey'
        },
        '&:active':{
            color:'grey'
        },
    },
  }));
export default function QuestionsList(
{handleClick,
type,
open,
current,i,
switchQuestion}
) {
    const { questions } = useSelector((state) => state.exam);
    const { responses } = useSelector((state) => state.response);
    const classes = useStyles();
    useEffect(() => {
        console.log(i,open[type])
        if(i===0&&open[type]===undefined) {
            handleClick(type)
        }
        return () => {
        }
    }, [i])

  return (
    <Box>
      <ListItem button onClick={()=>handleClick(type)} className={classes.btn}>
        <ListItemText primary={type} />
        {open[type] ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open[type]} timeout="auto" unmountOnExit>
        <Grid
          container
          direction="row"   
          justify="flex-start"
          alignItems="center"
        >
          {questions.map(
            (item, index) =>
              item.Type === type && (
                <Grid item>
                  <Questions
                    index={index}
                    current={current}
                    response={
                      responses
                        ? responses[index]
                        : { flag: false, answered: false }
                    }
                    onButtonClick={switchQuestion}
                  />
                </Grid>
              )
          )}
        </Grid>
      </Collapse>
    </Box>
  );
}
