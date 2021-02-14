/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    makeStyles,
} from '@material-ui/core';
import { useFormik } from 'formik';
import styles from './style.module.css';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

import { connect } from 'react-redux';
import {
    changeProfileSchoolInfo,
    removeDegreeDetail,
} from '../../../actions/userActions';
import MYButton from '../../../components/CTAButton';
import Degree from '../../../components/Degree';

import * as yup from 'yup';

const ThirdRoute = ({
    schoolInfo,
    onChangeSchoolData,
    handleNext,
    handlePrev,
    degreeDetails,
    removeDegree,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [degrees, setDegrees] = useState([{ id: 'panel3' }]);
    const [markType, setMarkType] = useState('C');
    const [markType2, setMarkType2] = useState('C');
    const [snRef, setSnRef] = useState(null);
    const [cgRef, setCgRef] = useState(null);
    const [boardRef, setBoardRef] = useState(null);
    const [locationRef, setLocationRef] = useState(null);
    const [sn1Ref, setSn1Ref] = useState(null);
    const [cg1Ref, setCg1Ref] = useState(null);
    const [board1Ref, setBoard1Ref] = useState(null);
    const [location1Ref, setLocation1Ref] = useState(null);
    const [degreeErrors, setDegreeErrors] = useState({})

    const [error, setError] = useState({
        sn: false,
        cg: false,
        board: false,
        location: false,
        sn1: false,
        cg1: false,
        board1: false,
        location1: false,
    });
    const validate = () => {
        setDegreeErrors({})
        if(Object.keys(degreeDetails).length<1) {
            alert("Atleast one degree is required")
            return false
        }
        if (schoolInfo.schoolName10.length < 1) {
            setError((prevState) => ({ ...prevState, sn: true }));
            setExpanded('panel1');
            snRef.focus();
            return false;
        } else {
            setError((prevState) => ({ ...prevState, sn: false }));
        }
        if (
            schoolInfo.markType10 === 'C' &&
            (schoolInfo.cgpa10 > 10 || schoolInfo.cgpa10 < 1)
        ) {
            setError((prevState) => ({ ...prevState, cg: true }));
            setExpanded('panel1');
            cgRef.focus();
            return false;
        } else if (
            schoolInfo.markType10 === 'P' &&
            (schoolInfo.cgpa10 > 100 || schoolInfo.cgpa10 < 1)
        ) {
            setError((prevState) => ({ ...prevState, cg: true }));
            setExpanded('panel1');
            cgRef.focus();
            return false;
        } else {
            setError((prevState) => ({ ...prevState, cg: false }));
        }
        if (!(!isNaN(parseFloat(schoolInfo.cgpa10)) && isFinite(schoolInfo.cgpa10))) {
            setError((prevState) => ({ ...prevState, cg: true }));
            setExpanded('panel1');
            cgRef.focus();
            return false;
        } else {
            setError((prevState) => ({ ...prevState, cg: false }));
        }
        if (schoolInfo.cgpa10.length < 1) {
            setError((prevState) => ({ ...prevState, cg: true }));
            setExpanded('panel1');
            cgRef.focus();
            return false;
        } else {
            setError((prevState) => ({ ...prevState, cg: false }));
        }
        if (schoolInfo.board10.length < 1) {
            setError((prevState) => ({ ...prevState, board: true }));
            setExpanded('panel1');
            boardRef.focus();
            return false;
        } else {
            setError((prevState) => ({ ...prevState, board: false }));
        }
        if (schoolInfo.location10.length < 1) {
            setError((prevState) => ({ ...prevState, location: true }));
            setExpanded('panel1');
            locationRef.focus();
            return false;
        } else {
            setError((prevState) => ({ ...prevState, location: false }));
        }
        if (schoolInfo.schoolName12.length < 1) {
            setError((prevState) => ({ ...prevState, sn1: true }));
            setExpanded('panel2');
            sn1Ref.focus();
            return false;
        } else {
            setError((prevState) => ({ ...prevState, sn1: false }));
        }
        if (!(!isNaN(parseFloat(schoolInfo.cgpa12)) && isFinite(schoolInfo.cgpa12))) {
            setError((prevState) => ({ ...prevState, cg1: true }));
            setExpanded('panel2');
            cg1Ref.focus();
            return false;
        } else {
            setError((prevState) => ({ ...prevState, cg1: false }));
        }
        if (schoolInfo.cgpa12.length < 1) {
            setError((prevState) => ({ ...prevState, cg1: true }));
            setExpanded('panel2');
            cg1Ref.focus();
            return false;
        } else {
            setError((prevState) => ({ ...prevState, cg1: false }));
        }
        if (
            schoolInfo.markType12 === 'C' &&
            (schoolInfo.cgpa12 > 10 || schoolInfo.cgpa12 < 1)
        ) {
            setError((prevState) => ({ ...prevState, cg1: true }));
            setExpanded('panel2');
            cg1Ref.focus();
            return false;
        } else if (
            schoolInfo.markType12 === 'P' &&
            (schoolInfo.cgpa12 > 100 || schoolInfo.cgpa12 < 1)
        ) {
            setError((prevState) => ({ ...prevState, cg1: true }));
            setExpanded('panel2');
            cg1Ref.focus();
            return false;
        } else {
            setError((prevState) => ({ ...prevState, cg1: false }));
        }
        if (schoolInfo.board12.length < 1) {
            setError((prevState) => ({ ...prevState, board1: true }));
            setExpanded('panel2');
            board1Ref.focus();
            return false;
        } else {
            setError((prevState) => ({ ...prevState, board1: false }));
        }
        if (schoolInfo.location12.length < 1) {
            setError((prevState) => ({ ...prevState, location1: true }));
            setExpanded('panel2');
            location1Ref.focus();
            return false;
        } else {
            setError((prevState) => ({ ...prevState, location1: false }));
        }
        var err = true
        Object.values(degreeDetails).map((item, index) => {
           var e={}
           if((!(!isNaN(parseFloat(item.cgpa)) && isFinite(item.cgpa)))){
            // alert("Error in CGPA/Percentage in college " + (parseInt(item.id.charAt(item.id.length-1))-2))
            e={...e,cgpa:"Invalid value entered"}
            setExpanded(item.id);
            err = false
        }
            if (item.markType) {
                if (item.markType === 'C' && (item.cgpa > 10 || item.cgpa < 0)) {
                    // alert("Error in CGPA/Percentage in college " + (parseInt(item.id.charAt(item.id.length-1))-2))
                    e={...e,cgpa:"Invalid value entered"}
                    setExpanded(item.id);
                    err = false
                }
                else if (item.markType === 'P' && (item.cgpa > 100 || item.cgpa < 0)) {
                    // alert("Error in CGPA/Percentage in college" + (parseInt(item.id.charAt(item.id.length-1))-2))
                    e={...e,cgpa:"Invalid value entered"}
                    setExpanded(item.id);
                    err = false
                }
            } else {
                if (item.cgpa > 10 || item.cgpa < 0){
                    // alert("Error in CGPA/Percentage in college " + (parseInt(item.id.charAt(item.id.length-1))-2))
                    e={...e,cgpa:"Invalid value entered"}
                    setExpanded(item.id);
                    err = false
                }
            }
           
            try {
                if (!(item.degree.length > 0)) {
                    // alert("Incomplete field in degree " + (parseInt(item.id.charAt(item.id.length-1))-2))
                    e={...e,degree:"This field is required"}
                    setExpanded(item.id);
                    err = false
                }
            } catch (err) {
                e={...e,degree:"Invalid"}
                setExpanded(item.id);
                err = false
            }
            try {
                if (!(item.collegeName.length >0 )) {
                    // alert("Incomplete college name in degree " + (parseInt(item.id.charAt(item.id.length-1))-2))
                    e={...e,college:"This field is required"}
                    setExpanded(item.id);
                    err = false
                }
            } catch (err) {
                e={...e,college:"This field is required"}
                setExpanded(item.id);
                err = false
            }
            setDegreeErrors({...degreeErrors,[item.id]:e})
            console.log("errorcatched",degreeErrors)
        })
        return err;
    };

    useEffect(() => {
        const ids = Object.keys(degreeDetails);
        for (let i = 0; i < ids.length; i++) {
            if (ids[i] === 'panel3') continue;
            else setDegrees([...degrees, { id: ids[i] }]);
        }
    }, []);

    // const validate=()=>{
    //     console.log("error",error,schoolInfo.schoolName10);
    //     (schoolInfo.schoolName10)? setError(prevState=>({...prevState,sn:true})):setError(prevState=>({...prevState,sn:true}))
    //     Object.entries(error).map(val=>{
    //         if(!val) return val;
    //     })
    //     return true;
    // }
const changeDegreeError=(id,err)=>{
setDegreeErrors({...degreeErrors,[id]:err})
}
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const useStyles = makeStyles({
        textField: { marginTop: 16, maxWidth: 500 },
    });

    const classes = useStyles();
    const addMoreDegreeButton = () => {
        const len = degrees.length + 3;
        setDegrees([...degrees, { id: 'panel' + len }]);
    };

    const removeLastDegree = () => {
        setDegrees(degrees.slice(0, -1));
        try {
            removeDegree(degrees.pop().id);
        }
        catch (err) { }
    };

    return (
        <div className={styles.container}>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
            >
                <AccordionSummary>
                    <p>Enter your 10th Educational Details</p>
                </AccordionSummary>
                <AccordionDetails>
                    <form className={styles.form}>
                        <TextField
                            className={classes.textField}
                            label='School Name'
                            variant='outlined'
                            required
                            autoFocus
                            inputRef={(i) => { setSnRef(i) }}
                            error={error.sn}
                            value={schoolInfo.schoolName10}
                            helperText={error.sn ? 'Invalid' : ''}
                            error={error.sn}
                            onChange={(event) => {
                                onChangeSchoolData({
                                    schoolName10: event.target.value,
                                });
                            }}
                        />
                        <FormControl component='fieldset'>
                            <FormLabel component='legend'></FormLabel>
                            <RadioGroup
                                name='gender'
                                row
                                value={schoolInfo.markType10}
                                // value={formik.values.gender}
                                onChange={(event) =>
                                    onChangeSchoolData({
                                        markType10: event.target.value,
                                    })
                                }
                            // onChange={formik.handleChange}
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
                        </FormControl>
                        <TextField
                            className={classes.textField}
                            label={schoolInfo.markType10 === 'C' ? 'CGPA' : 'Percentage'}
                            variant='outlined'
                            required
                            error={error.cg}
                            type="number"
                            inputRef={(i) => { setCgRef(i) }}
                            helperText={error.cg ? 'Invalid' : ''}
                            onChange={(event) => {
                                onChangeSchoolData({
                                    cgpa10: event.target.value,
                                });
                            }}
                            value={schoolInfo.cgpa10}
                        />
                        <TextField
                            className={classes.textField}
                            error={error.board}
                            helperText={error.board ? 'Invalid' : ''}
                            label='Board'
                            variant='outlined'
                            inputRef={(i) => { setBoardRef(i) }}
                            required
                            onChange={(event) => {
                                onChangeSchoolData({
                                    board10: event.target.value,
                                });
                            }}
                            value={schoolInfo.board10}
                        />
                        <TextField
                            className={classes.textField}
                            label='Location'
                            error={error.location}
                            inputRef={(i) => { setLocationRef(i) }}
                            helperText={error.location ? 'Invalid' : ''}
                            variant='outlined'
                            onChange={(event) => {
                                onChangeSchoolData({
                                    location10: event.target.value,
                                });
                            }}
                            value={schoolInfo.location10}
                        />
                    </form>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}
            >
                <AccordionSummary>
                    <p>Enter your 12th Educational Details</p>
                </AccordionSummary>
                <AccordionDetails>
                    <form className={styles.form}>
                        <TextField
                            className={classes.textField}
                            label='School Name'
                            variant='outlined'
                            inputRef={(i) => { setSn1Ref(i) }}
                            error={error.sn1}
                            helperText={error.sn1 ? 'Invalid' : ''}
                            onChange={(event) => {
                                onChangeSchoolData({
                                    schoolName12: event.target.value,
                                });
                            }}
                            value={schoolInfo.schoolName12}
                        />
                        <FormControl
                            component='fieldset'
                        // error={
                        //     !!formik.errors.gender && formik.touched.gender
                        // }
                        >
                            <FormLabel component='legend'></FormLabel>
                            <RadioGroup
                                name='gender'
                                row
                                value={schoolInfo.markType12}
                                onChange={(event) =>
                                    onChangeSchoolData({ markType12: event.target.value })
                                }
                            // onChange={formik.handleChange}
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
                        </FormControl>
                        <TextField
                            className={classes.textField}
                            label={schoolInfo.markType12 === 'C' ? 'CGPA' : 'Percentage'}
                            error={error.cg1}
                            inputRef={(i) => { setCg1Ref(i) }}
                            helperText={error.cg1 ? 'Invalid' : ''}
                            variant='outlined'
                            onChange={(event) => {
                                onChangeSchoolData({
                                    cgpa12: event.target.value,
                                });
                            }}
                            value={schoolInfo.cgpa12}
                        />
                        <TextField
                            className={classes.textField}
                            error={error.board1}
                            helperText={error.board1 ? 'Invalid' : ''}
                            label='Board'
                            inputRef={(i) => { setBoard1Ref(i) }}
                            variant='outlined'
                            onChange={(event) => {
                                onChangeSchoolData({
                                    board12: event.target.value,
                                });
                            }}
                            value={schoolInfo.board12}
                        />
                        <TextField
                            className={classes.textField}
                            error={error.location1}
                            inputRef={(i) => { setLocation1Ref(i) }}
                            helperText={error.location1 ? 'Invalid' : ''}
                            label='Location'
                            variant='outlined'
                            onChange={(event) => {
                                onChangeSchoolData({
                                    location12: event.target.value,
                                });
                            }}
                            value={schoolInfo.location12}
                        />
                    </form>
                </AccordionDetails>
            </Accordion>
            {degrees.map((degree) => {
               
                return (
                    <Degree
                        expanded={expanded}
                        id={degree.id}
                        errors={degreeErrors[degree.id]}
                        onChange={(id) => handleChange(id)}
                        setError={changeDegreeError}
                    />
                );
            })}
            <div className={styles.btnDiv}>
                <MYButton
                    heading={'Add more degree'}
                    style={styles.btn}
                    onPress={() => addMoreDegreeButton()}
                />
                <MYButton
                    heading={'Remove last degree'}
                    style={styles.btn}
                    onPress={() => removeLastDegree()}
                />
            </div>
            <div className={styles.btnDiv}>
                <Button onClick={handlePrev}>Previous</Button>
                <Button
                    variant='contained'
                    color='primary'
                    disableElevation
                    onClick={() => {
                        if (validate()) handleNext();
                    }}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeSchoolData: (data) => {
            dispatch(changeProfileSchoolInfo(data));
        },
        removeDegree: (data) => {
            dispatch(removeDegreeDetail(data));
        },
    };
};

const mapStateToProps = (state) => {
    return {
        schoolInfo: state.userProfile.academics,
        degreeDetails: state.userProfile.degree,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThirdRoute);
