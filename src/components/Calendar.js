import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Flexbox from 'flexbox-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'antd/dist/antd.css';

const localizer = BigCalendar.momentLocalizer(moment)
localizer.eventTimeRangeFormat = (_range) => "";

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = { trainings: [], events: [] };
    }

    componentDidMount() {
        this.loadTrainings();
    }

    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(responseData => {
                this.setState({ trainings: responseData });
                this.createEventList();
            })

    }

    createEventList = () => {
        let eventArray = [];
        for (let i = 0; i < this.state.trainings.length; i++) {

            eventArray[i] = {
                title: `${this.state.trainings[i].activity}`,
                start: new Date(this.state.trainings[i].date),
                end: new Date(this.state.trainings[i].date + (this.state.trainings[i].duration * 60000)),
                allDay: false,
            }
        }

        this.setState({ events: [...eventArray] });
    }

    render() {
        return (
            <Flexbox flexDirection="column" height="100vh" >
                <Flexbox element="header" height="40px" display="center">
                    <p style={{ fontWeight: 'bold', fontSize: 24 }}> Trainings Calendar</p>

                </Flexbox>

                <BigCalendar
                    localizer={localizer}
                    events={this.state.events}
                    defaultDate={new Date()}
                    views={['month', 'day', 'week']}
                    startAccessor="start"
                    endAccessor="end"

                />
            </Flexbox>
        );
    }
}

export default Calendar;