import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from '@material-ui/core/Button';
import AddCustomer from './AddCustomer';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Snackbar from '@material-ui/core/Snackbar';
import EditCustomer from './EditCustomer';
import DeleteIcon from '@material-ui/icons/Delete';



class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = { message: '', customers: [], open: false };

    }
    //fetch customers
    componentDidMount() {
        this.loadCustomers();
    }


    loadCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(jsondata => this.setState({ customers: jsondata.content }))
            .catch(err => console.error(err));
    }
    //Delete customers
    deleteCustomer = (customerLink) => {
        if (window.confirm("Are you sure?")) {
            fetch(customerLink, { method: 'DELETE' })
                .then(res => this.loadCustomers())
                .then(res => this.setState({ open: true, message: 'Customer deleted' }))
                .catch(err => console.error(err))

        }
    };

    saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer)
            })
            .then(res => this.loadCustomers())
            .then(res => this.setState({ open: true, message: 'New Customer added' }))
            .catch(err => console.error(err))
    }

    //Update a customer list
    updatedCustomer = (link, updatedCustomer) => {
        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCustomer)
            })
            .then(res => this.loadCustomers())
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
                accessor: 'links[0].href',
                show: false
            },

            {
                Header: 'First name',
                accessor: 'firstname',
            },
            {
                Header: 'Last name',
                accessor: 'lastname',
            },
            {
                Header: 'Street address',
                accessor: 'streetaddress',
            },
            {
                Header: 'Postcode',
                accessor: 'postcode',
            },
            {
                Header: 'City',
                accessor: 'city',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Phone',
                accessor: 'phone',
            },

            {
                Header: '',
                sortable: false,
                filterable: false,
                width: 100,
                accessor: 'links[0].href',
                Cell: ({ row, value }) => {
                    console.log(row);
                    return (<EditCustomer updatedCustomer={this.updatedCustomer} link={value} customer={row} />)
                }
            },

            {
                Header: '',
                sortable: false,
                filterable: false,
                width: 100,
                accessor: 'links[0].href',
                Cell: ({ value }) => <Button size="small" variant="contained" color="secondary" onClick={() => this.deleteCustomer(value)}>Delete<DeleteIcon /></Button>
            },

        ];
        return (

            <div>
                <AddCustomer saveCustomer={this.saveCustomer} />
                <ReactTable filterable={true} data={this.state.customers} columns={columns} />
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

export default CustomerList;