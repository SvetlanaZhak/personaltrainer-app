import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { ToastContainer } from 'react-toastify';

import 'react-confirm-alert/src/react-confirm-alert.css'



class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = { customers: [], search: '' };

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


    render() {
        const { customers, search } = this.state;
        const filterCustomers = customers.filter(customer => {
            return customer.lastname.toLowerCase().includes(search.toLowerCase())
        })

        if (customers.length === 0) {
            return <h1>Loading...</h1>
        }
        else {

            return (
                <div className="App-body">
                    <div className="container">
                        <div className="row">


                        </div>

                        <ReactTable data={filterCustomers}
                            columns={[
                                {
                                    columns: [
                                        {
                                            Header: "Id",
                                            accessor: "links[0].href",
                                            show: false
                                        },
                                        {
                                            Header: "First name",
                                            accessor: "firstname",
                                        },
                                        {
                                            Header: "Last name",
                                            accessor: "lastname",
                                        },
                                        {
                                            Header: "Street address",
                                            accessor: "streetaddress",
                                        },
                                        {
                                            Header: "Postcode",
                                            accessor: "postcode",
                                        },
                                        {
                                            Header: "City",
                                            accessor: "city",
                                        },
                                        {
                                            Header: "Email",
                                            accessor: "email",
                                        },
                                        {
                                            Header: "Phone",
                                            accessor: "phone",
                                        },

                                        {
                                            id: 'button',
                                            sortable: false,
                                            filterable: false,
                                            width: 100,
                                            accessor: 'links[0].href',

                                        },

                                        {
                                            id: 'button',
                                            sortable: false,
                                            filterable: false,
                                            width: 100,
                                            accessor: "links[0].href",
                                            Cell: ({ value }) => (<button className="btn btn-danger"
                                                onClick={() => { this.onDelClick(value) }}>Delete</button>)
                                        }

                                    ]
                                }
                            ]}
                            filtertable
                            defaultPageSize={15}
                            className="-striped -highlight"
                        />

                        <ToastContainer autoClose={1000} />
                    </div>
                </div>

            );
        }
    }
}

export default CustomerList;