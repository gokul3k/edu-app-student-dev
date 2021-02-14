import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    MenuItem,
    InputLabel,
    makeStyles,
    Select,
    Grid, Card, CardContent, Typography, Paper
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getCredentials } from 'services/authService';
import api from 'api/api';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    container: {
        display: 'flex',
        flex: 1,
        padding: 24
    },
    card: {
        display: 'flex',
        flex: 1,
        flexWrap: 'wrap',
        width: "100%",
        minHeight: 500
    },
    salary: {
        fontWeight: "bold",
        fontSize: 24,
        marginTop: 18
    },
    items: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 18
    },
    heading: {
        fontWeight: "bold",
        color: "#023e8a"
    },
    subText: {
        color: "#023e8a"
    },
    subHeading: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
        padding:5,
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
        backgroundColor: "#023e8a",
    },
    emptyText: {
        fontSize: 18,
        marginTop: 18
    }
}));

const Suggestions = () => {

    const classes = useStyles();
    const [suggestions, setSuggestions] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSuggestions();
    }, [])

    const getSuggestions = async () => {
        setLoading(true);
        try {
            const res = await api.post(
                "/getSuggestions",
                null,
                {
                    headers: {
                        Authorization: `Bearer ${getCredentials()}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setSuggestions(res.data.response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <div className={classes.container}>
            {loading && (
                <Backdrop className={classes.backdrop} open={loading} >
                    <CircularProgress color="primary" />
                </Backdrop>
            )}

            {!loading &&
                <Card className={classes.card}>
                    <CardContent>
                        <Grid
                            container
                            direction="column"
                        >
                            <h4 className={classes.heading}>Recommendations For You :</h4>
                            <p className={classes.subText}>Kindly note that all the stats shown below are based on your academics and the tests taken on our website. The results will be more accurate when you take more tests.</p>
                        </Grid>

                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                xs
                            >
                                <Card>
                                    <CardContent>
                                    
                                        <h4 className={classes.subHeading}>Suggested Colleges</h4>
                                        <Divider/>
                                        {suggestions.colleges&&(suggestions.colleges.length == 0) ? <h6 className={classes.emptyText}>No data available</h6> :
                                            <ul>
                                                {suggestions.colleges&&suggestions.colleges.map((college) => {
                                                    return (
                                                        <li className={classes.items}>{college}</li>
                                                    )
                                                })}
                                            </ul>
                                        }
                                    
                                    
                                    </CardContent>
                                    </Card>
                            </Grid>

                            <Grid
                                item
                                xs
                            >
                                <Card>
                                    <CardContent>
                                        <h4 className={classes.subHeading}>Sectors To Improve</h4>
                                        <Divider />
                                        {(suggestions.improvements.length == 0) ? <h6 className={classes.emptyText}>No data available</h6> :
                                            <ul>
                                                {suggestions.improvements.map((improvement) => {
                                                    return (
                                                        <li className={classes.items}>{improvement}</li>
                                                    )
                                                })}
                                            </ul>
                                        }
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid
                                item
                                xs
                            >
                                <Card>
                                    <CardContent>
                                        <h4 className={classes.subHeading}>Courses To Pursue</h4>
                                        <Divider />
                                        {(suggestions.courses.length == 0) ? <h6 className={classes.emptyText}>No data available</h6> :
                                            <ul>
                                                {suggestions.courses.map((course) => {
                                                    return (
                                                        <li className={classes.items}>{course}</li>
                                                    )
                                                })}
                                            </ul>
                                        }
                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>


                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                xs
                            >
                                <Card>
                                    <CardContent>
                                        <h4 className={classes.subHeading}>Suggested Companies</h4>
                                        <Divider />
                                        {(suggestions.companies.length == 0) ? <h6 className={classes.emptyText}>No data available</h6> :
                                            <ul>
                                                {suggestions.companies.map((company) => {
                                                    return (
                                                        <li className={classes.items}>{company}</li>
                                                    )
                                                })}
                                            </ul>
                                        }
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid
                                item
                                xs
                            >
                                <Card>
                                    <CardContent>
                                        <h4 className={classes.subHeading}>Strong Sectors</h4>
                                        <Divider />
                                        {(suggestions.sectors.length == 0) ? <h6 className={classes.emptyText}>No data available</h6> :
                                            <ul>
                                                {suggestions.sectors.map((sector) => {
                                                    return (
                                                        <li className={classes.items}>{sector}</li>
                                                    )
                                                })}
                                            </ul>
                                        }
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid
                                item
                                xs
                            >
                                <Card>
                                    <CardContent>
                                        <h4 className={classes.subHeading}>Average Salary Package</h4>
                                        <Divider />
                                        {(suggestions.package) ? <h6 className={classes.salary}>{suggestions.package}</h6> : <h6 className={classes.emptyText}>No data available</h6>}
                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>
                    </CardContent>
                </Card>
            }
        </div>
    )
}

export default Suggestions;