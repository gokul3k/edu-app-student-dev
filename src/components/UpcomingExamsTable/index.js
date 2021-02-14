import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import styles from './styles.module.css';

const UpcomingExamTable = ({ data,history }) => {
    console.log('The data is ', data);
    const columns = [
        { title: 'Name', field: 'Title' },
        { title: 'Date of Upload', field: 'StartDate' },
        { title: 'Date of Exam', field: 'StartTime' },
        { title: 'id', field: 'id' },
    ];

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => (
            <DeleteOutline {...props} ref={ref} />
        )),
        DetailPanel: forwardRef((props, ref) => (
            <ChevronRight {...props} ref={ref} />
        )),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => (
            <FirstPage {...props} ref={ref} />
        )),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => (
            <ChevronRight {...props} ref={ref} />
        )),
        PreviousPage: forwardRef((props, ref) => (
            <ChevronLeft {...props} ref={ref} />
        )),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => (
            <ArrowDownward {...props} ref={ref} />
        )),
        ThirdStateCheck: forwardRef((props, ref) => (
            <Remove {...props} ref={ref} />
        )),
        ViewColumn: forwardRef((props, ref) => (
            <ViewColumn {...props} ref={ref} />
        )),
    };

    // const data = [
    //     {
    //         name: 'Tata Consultancy Services - Entrace Test',
    //         dateOfUpload: '4th August, 2020',
    //         examDate: '4th August, 2020',
    //     },
    //     {
    //         name: 'Tata Consultancy Services - Entrace Test',
    //         dateOfUpload: '4th August, 2020',
    //         examDate: '4th August, 2020',
    //     },
    //     {
    //         name: 'Tata Consultancy Services - Entrace Test',
    //         dateOfUpload: '4th August, 2020',
    //         examDate: '4th August, 2020',
    //     },
    // ];

    const options = { search: false };
    const handleRowclick = (id)=>{
        history.push('/exam/'+id)
    }

    return (
        <div className={styles.container}>
            <MaterialTable
                options={options}
                columns={columns}
                data={data}
                icons={tableIcons}
                style={{ borderRadius: 20 }}
                title={'Upcoming Exams'}
                onRowClick={(event, rowData) => { console.log(rowData.id, "r"); handleRowclick(rowData.id) }}

            />
        </div>
    );
};

export default UpcomingExamTable;
