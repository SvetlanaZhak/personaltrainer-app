import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import AddTraining from './AddTraining';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Snackbar from '@material-ui/core/Snackbar';
import EditTraining from './EditTraining';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

class Training extends Component {
    constructor(props) {
        super(props);
        this.state = { message: '', trainings: [], open: false };

    }
    //fetch trainings
    componentDidMount() {
        this.loadTrainings();
    }

    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(jsondata =>
                /*{
                jsondata.forEach(activityRow => {
                    activityRow.date = moment(activityRow.date).format('DD MMM YYYY');
                });
                */this.setState({ trainings: jsondata, })
            )
            .catch(err => console.error(err));
    }


    // delete trainings

    deleteTraining = (link) => {

        if (window.confirm("Are you sure?")) {
            fetch("https://customerrest.herokuapp.com/api/trainings/" + link, { method: 'DELETE' })
                .then(res => this.loadTrainings())
                .then(res => this.setState({ open: true, message: 'Training deleted' }))
                .catch(err => console.error(err))

        }
    };


    //save new training
    saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings/',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(training)
            })
            .then(res => this.loadTrainings())
            .then(res => this.setState({ open: true, message: 'New training added' }))
            .catch(err => console.error(err))
    }

    //Update a training list
    updatedTraining = (link, updatedTraining) => {
        fetch("https://customerrest.herokuapp.com/gettrainings" + link,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTraining)
            })
            .then(res => this.loadTrainings())
            .then(res => this.setState({ open: true, message: 'Changes saved' }))
            .catch(err => console.error(err));

    };

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        const columns = [
            {
                Header: 'Id',
                accessor: 'id',
                show: false
            },
            {
                Header: 'Date',
                accessor: 'date',
                Cell: props => <span>{moment.utc(props.value).format('DD.MM.YYYY')}</span>,
            },
            {
                Header: 'Duration in minutes',
                accessor: 'duration'
            },
            {
                Header: 'Activity',
                accessor: 'activity',
            },
            {
                Header: 'Customer',
                accessor: 'customer.id',
            },
            {
                id: 'button',
                sortable: false,
                filterable: false,
                width: 100,
                accessor: `id`,
                Cell: ({ row, value }) => (<EditTraining updatedTraining={this.updatedTraining} link={value} training={row} />)

            },

            {
                id: 'button',
                sortable: false,
                filterable: false,
                width: 100,
                accessor: `id`,
                Cell: ({ value }) => <Button size="small" variant="contained" className="btn btn-success"
                    onClick={() => { this.deleteTraining(value) }}>Delete<DeleteIcon /></Button>
            },

        ];



        return (
            <div>
                <AddTraining saveTraining={this.saveTraining} />
                <ReactTable filterable={true} data={this.state.trainings} columns={columns} />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={this.state.message}
                />
            </div >

        );
    }
}
export default Training;