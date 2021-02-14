import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  FormControl,
} from "@material-ui/core";
import api from "api/api";
import { getCredentials } from "services/authService";
import { ResponsiveContainer, PieChart, Pie, Sector, Cell, Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import Table from "./Table";
import Footer from 'components/Footer';
import SimpleLoading from "components/loading/SimpleLoading";
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 32,
    padding: 32,
    [theme.breakpoints.down('md')]: {
      margin: 4,
    }
  },
  formControl: {
    marginRight: 16,
  },
  title: {
    color: "grey",
    fontWeight: "bold"
  }
}));

export default function Analysis(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [choice, setChoice] = useState(props.location?(props.location.state?(props.location.state.default?props.location.state.default:"all"):"all"):"all");
  const [tableData, setTableData] = useState([]);
  const [examList, setExamList] = useState([])
  const [res, setRes] = useState([])
  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  const getExamList = async () => {
    try {
      setLoading(true)
      const { data } = await api.post(
        "/getCompletedExams",
        {},
        {
          headers: {
            Authorization: `Bearer ${getCredentials()}`,
            "Content-Type": "application/json",
          },
        }
      );
      setExamList(data.response)

      setLoading(false)
    } catch (err) {
      setExamList([])
      setLoading(false)
    }
  };
  const getAnalysis = async () => {
    try {
      const { data } = await api.post(
        "/getExamPercentage",
        { examId: choice },
        {
          headers: {
            Authorization: `Bearer ${getCredentials()}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      setRes(data.response)
      if(data.response.pieChart[0].value===null)
        setChoice("all")
      console.log("analisis", data.response)
    } catch (err) { }
  };

  const data = [
    { name: "Group A", value: 25 },
    { name: "Group B", value: 25 },
    { name: "Group C", value: 25 },
    { name: "Group D", value: 25 },
  ];
  const barData = [

    {
      name: "Page C",
      score: 2000,
      total: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      score: 2780,
      total: 3908,
    },
    {
      name: "Page E",
      score: 1890,
      total: 4800,

    },
    {
      name: "Page F",
      score: 2390,
      total: 3800,

    },
    {
      name: "Page G",
      score: 3490,
      total: 4300,
    },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    getExamList()
    getAnalysis();
  }, [choice]);
  return (
    <div style={{ overflowY: "auto", flex: 1 }}>
      {loading ? (
        <SimpleLoading open={loading} />
      ) : res.pieChart && (
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="space-between">
            <Typography className={classes.title}>Test Analysis</Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Choose
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={choice}
                onChange={handleChange}
                label="Choose"
              >
                <MenuItem value="all">
                  All
                </MenuItem>
                {examList.map((item) => (
                  <MenuItem value={item.id}>{item.Title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 16 }} alignItems="center" justify="space-between">
            <Grid item xs style={{ height: 300 }}>
              <ResponsiveContainer>
                <PieChart >
                  <Pie
                    data={res.pieChart}
                    dataKey="value"

                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    label
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                  >
                    {res.pieChart.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                  {data.map((entry, index) => (
                    <Bar dataKey={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}

                </PieChart>
              </ResponsiveContainer>

            </Grid>
            <Grid item xs style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart
                  width={500}
                  height={300}
                  data={res.barChart}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#82ca9d" />
                  <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>

            </Grid>
          </Grid>
          {true && <Table data={res.barChart} />}
        </Paper>
      )}
      <Footer />
    </div>
  );
}
