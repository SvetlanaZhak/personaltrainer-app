import Timeline from 'react-calendar-timeline';
import 'react-calender-timeline/lib/Timeline.css';
import moment from 'moment';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = { trainings: [], customer: [] }
    }
    componentDidMount() {
        this.loadTrainings();
    }

    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(jsondata =>
                this.setState({ trainings: jsondata, })
            )
            .catch(err => console.error(err));
    }

    render() {


        return (

           



        )
    }
}
export default Calendar;