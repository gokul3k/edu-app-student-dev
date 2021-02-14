import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import { Grid, Button,DialogActions } from "@material-ui/core";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
 
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    marginLeft: 16,
    marginRight: 16,
  },
  icon:{
    color:theme.palette.primary.light,
    marginRight:16,
    position:"absolute",
    right:"16px"
  }
}));

export default function ExperienceForm({ addExp, exp, id,handleClose }) {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      companyName: false ? exp.companyName : "",
      jobTitle: false ? exp.jobTitle : "",
      fromDate: false ? exp.fromDate : "",
      toDate: false ? exp.toDate : "",
    },
    onSubmit: (values) => {
      addExp(values, id);
      handleClose()
      formik.resetForm()
    },
  });
  return (
    <form
      className={classes.root}
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <div className={classes.container}>
        <div className={classes.row}>
          <TextField
            variant="outlined"
            margin="normal"
            className={classes.item}
            required
            size="small"
            onChange={formik.handleChange}
            value={formik.values.jobTitle}
            id="title"
            label="Job title"
            name="jobTitle"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            className={classes.item}
            size="small"
            onChange={formik.handleChange}
            value={formik.values.companyName}
            id="company"
            label="Company name"
            name="companyName"
          />
        </div>
        <div className={classes.row}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            className={classes.item}
            size="small"
            onChange={formik.handleChange}
            value={formik.values.fromDate}
            id="fromDate"
            label="From date"
            // helperText="eg:2012"
            name="fromDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={(event) => {
                        formik.setFieldValue('fromDate', event.target.value);
                    }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            className={classes.item}
            size="small"
            onChange={formik.handleChange}
            value={formik.values.toDate}
            id="toDate"
            label="To date"
            // helperText="eg:2014 "
            name="toDate"
            InputLabelProps={{ shrink: true }}
            helperText="Ignore if you are presently working"
            type="date"
            onChange={(event) => {
                        formik.setFieldValue('toDate', event.target.value);
                    }}
          />
        </div>
      </div>
      <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
    </form>
  );
}
