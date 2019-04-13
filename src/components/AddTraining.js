import React, { Component } from 'react';
import { Drawer, Button, Row, Input, Select, Slider, DatePicker } from 'antd';

import 'antd/dist/antd.css';

class AddTraining extends Component {

    constructor(props) {
        super(props);
        this.state = { visible: false, customers: [], activity: '', duration: '', date: '', customer: '' };
    }

    componentDidMount() {
        this.importCustomers();
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSelectChange = (value) => {
        this.setState({ customer: value });
    }

    handleSliderChange = (value) => {
        this.setState({ duration: value });
    }

    handleDateChange = (value) => {
        this.setState({ date: value });
    }

    saveTraining = () => {
        const newTraining = {
            activity: this.state.activity,
            duration: this.state.duration,
            date: this.state.date,
            customer: this.state.customer
        };
        this.props.saveTraining(newTraining);
        this.setState({ visible: false })
    }

    importCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(responseData => {
                for (let i = 0; i < responseData.content.length; i++) {
                    let customerToAdd = {

                        customer: `${responseData.content[i].lastname} ${responseData.content[i].firstname}`,
                        link: responseData.content[i].links[0].href
                    }
                    this.setState({
                        customers: [...this.state.customers, customerToAdd]
                    })
                }
                // setting some default values, so the user does not add training to null customer

                this.setState({
                    customer: this.state.customers[0].link,
                    duration: 30,
                    date: new Date()
                })
            })
    }

    showDrawer = () => {
        this.setState({
            visible: true
        });
    };

    onClose = () => {
        this.setState({
            visible: false
        });
    };

    render() {

        return (
            <div>
                <Button size="small" type="primary" onClick={this.showDrawer}>
                    Add New Training
        </Button>
                <Drawer
                    title="New Training"
                    width={300}
                    placement="right"
                    onClose={this.onClose}
                    maskClosable={false}
                    visible={this.state.visible}
                    style={{
                        height: 'calc(100% - 40px)',
                        overflow: 'auto',
                        paddingBottom: 30
                    }}
                >
                    <Row>
                        <h3>Customer:</h3>
                        <Select
                            onChange={this.handleSelectChange}
                            style={{ width: '100%' }}
                            defaultValue={this.state.customer}
                        >
                            {this.state.customers.map((item, key) => (
                                <Select.Option value={item.link} key={key}>{item.customer}</Select.Option>
                            ))}
                        </Select>
                    </Row>
                    <br />
                    <Row>
                        <h4>Activity Name</h4>
                        <Input placeholder="Activity" name="activity" onChange={this.handleChange} value={this.state.activity} />
                    </Row>
                    <br />
                    <Row>
                        <h4>Duration (minutes)</h4>
                        <Slider
                            min={15}
                            max={90}
                            defaultValue={30}
                            onChange={this.handleSliderChange}
                        />
                    </Row>
                    <br />
                    <Row>
                        <h4>Select Date and Time</h4>
                        <DatePicker
                            showTime
                            placeholder=""
                            onChange={this.handleDateChange}
                            onOk={this.handleDateChange}
                            style={{ width: '100%' }}
                        />
                    </Row>
                    <br />
                    <Row style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e8e8e8',
                        padding: '10px 16px',
                        textAlign: 'right',
                        left: 0,
                        background: '#fff',
                        borderRadius: '0 0 4px 4px',
                    }}>
                        <Button style={{ marginRight: 8 }} onClick={this.closeDrawer}>Cancel</Button>
                        <Button type="primary" onClick={this.saveTraining}>Save</Button>
                    </Row>
                </Drawer>
            </div>

        );
    }
}

export default AddTraining;