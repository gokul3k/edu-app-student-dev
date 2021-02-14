import React, { useState, useEffect } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    makeStyles,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    FormHelperText,
    Radio,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { addDegreeDetails } from '../../actions/userActions';

import styles from './degree.module.css';

const Degree = ({
    expanded,
    onChange,
    id,
    addDegreeDetails,
    degreeDetails,
    errors={degree:"",cgpa:'',college:''},
    setError
    
}) => {
    const [details, setDetails] = useState({});
    // const [markType, setMarkType] = useState('C');
  


    useEffect(() => {
        console.log(errors,"errors")
        if (degreeDetails[id]) {
            setDetails({ ...degreeDetails[id] });
        } else {
            setDetails({ markType: 'C' });
        }
    
    }, [degreeDetails.id, degreeDetails]);

    

    const useStyles = makeStyles({
        textField: { marginTop: 16 },
    });
    const classes = useStyles();

    const addDataToStore = (data) => {
        addDegreeDetails({ id: id, ...data });
    };

    //const checkValidMarks = () => {
    //     const value = details.cgpa;
    //    if (value) {
    //       if (markType === 'C' && (value > 10 || value < 0))
    //          setCgpaError(true);
    //     else if (markType === 'P' && (value > 100 || value < 0))
    //            setCgpaError(true);
    //       else setCgpaError(false);
    //   }
    // };

    return (
        <Accordion expanded={expanded === id} onChange={onChange(id)}>
            <AccordionSummary>
                <p>Enter Your Degree {(parseInt(id.charAt(id.length-1))-2)} Educational Details</p>
            </AccordionSummary>
            <AccordionDetails>
                <form className={styles.form}>
                    <TextField
                        className={classes.textField}
                        label='College Name'
                        variant='outlined'
                        error={!!errors.college}
                        helperText={errors.college}
                        onChange={(event) =>
                            {addDataToStore({
                                collegeName: event.target.value,
                            })
                            setError(id,{...errors,college:''})}
                        }
                        value={Object.keys(details).length !== 0 ? details.collegeName : ''}
                    />
                    <TextField
                        className={classes.textField}
                        label='Degree'
                        variant='outlined'
                        error={!!errors.degree}
                        helperText={errors.degree}
                        onChange={(event) =>{
                            addDataToStore({ degree: event.target.value })
                            setError(id,{...errors,degree:''})}
                            
                        }
                        value={details ? details.degree : ''}
                    />
                    <FormControl component='fieldset'>
                        <FormLabel component='legend'></FormLabel>
                        <RadioGroup
                            name='cgpa'
                            row
                            value={Object.keys(details).length !== 0 ? (details.markType?details.markType:'C') : 'C'}
                            onChange={(event) => {
                                //setMarkType(event.target.value)
                                addDataToStore({ markType: event.target.value })
                                setError(id,{...errors,cgpa:''})
                            }
                            }
                        >
                            <FormControlLabel
                                value='C'
                                label='CGPA'
                                control={<Radio />}
                            />
                            <FormControlLabel
                                value='P'
                                label='Percentage'
                                control={<Radio />}
                            />
                        </RadioGroup>
                        <FormHelperText style={{ marginTop: '-2px' }}>
                            {/* {!!formik.errors.gender && formik.touched.gender
                                    ? formik.errors.gender
                                    : false} */}
                        </FormHelperText>
                    </FormControl>{' '}
                    <TextField
                        className={classes.textField}
                        label='CGPA/Percentage'
                        variant='outlined'
                        error={!!errors.cgpa}
                        helperText={errors.cgpa}
                        onChange={(event) =>{
                            addDataToStore({ cgpa: event.target.value })
                            setError(id,{...errors,cgpa:''})
                        }}
                        value={details ? details.cgpa : ''}
                    />
                    <TextField
                        className={classes.textField}
                        label='Location'
                        variant='outlined'
                        onChange={(event) =>
                            addDataToStore({ location: event.target.value })
                        }
                        value={details ? details.location : ''}
                    />
                </form>
            </AccordionDetails>
        </Accordion>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addDegreeDetails: (data) => dispatch(addDegreeDetails(data)),
    };
};

const mapStateToProps = (state) => {
  
    return {
        degreeDetails: state.userProfile.degree,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Degree);
