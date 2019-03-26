import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';

class Training extends Component {
    constructor(props) {
        super(props);
        this.state = { trainings: [], search: '' };

    }
    //fetch trainings
    componentDidMount() {
        this.loadTrainings();
    }


    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(jsondata => {
                jsondata.content.forEach(activityRow => {
                    activityRow.date = moment(activityRow.date).format('DD MMM YYYY');
                });
                this.setState({ trainings: jsondata.content });
            })
            .catch(err => console.error(err));
    }


    render() {
        const columns = [
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Duration in minutes',
                accessor: 'duration'
            },
            {
                Header: 'Activity',
                accessor: 'activity'
            },


        ];
        return (
            <div>
                <ReactTable filterable={true} data={this.state.trainings} columns={columns} />
            </div>
        );
    }
}
export default Training;