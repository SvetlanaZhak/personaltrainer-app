import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class EditTraining extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false, date: '', duration: '', activity: '', customer: '' };
    }

    handleClickOpen = () => {

        this.setState({
            open: true,
            date: this.props.training.date,
            duration: this.props.training.duration,
            activity: this.props.training.activity,
            customer: this.props.training.customer,
        });
        console.log(this.props.link);
        console.log(this.props.training);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    addTraining = () => {
        const newTraining = {
            date: this.state.date,
            duration: this.state.duration,
            activity: this.state.activity,
            customer: this.state.customer,

        }
        this.props.updatedTraining(this.props.link, newTraining);
        this.handleClose();
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit training</DialogTitle>
                    <DialogContent>
                        <DialogContentText>

                        </DialogContentText>
                        <TextField onChange={this.handleChange}
                            autoFocus margin="dense" value={this.state.date} name="date" label="Date"
                            fullWidth />

                        <TextField onChange={this.handleChange}
                            margin="dense" value={this.state.duration} name="duration" label="Duration"
                            fullWidth />
                        <TextField onChange={this.handleChange}
                            margin="dense" value={this.state.activity} name="activity" label="Activity"
                            fullWidth />
                        <TextField onChange={this.handleChange}
                            margin="dense" value={this.state.customer} name="customer" label="Customer id"
                            fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" size="small">
                            Cancel
                         </Button>
                        <Button onClick={this.addTraining} color="primary" size="small">
                            Edit
                         </Button>
                    </DialogActions>
                </Dialog>
                <Button size="small" color="secondary" variant="contained" onClick={this.handleClickOpen}>EDIT</Button>

            </div>
        );
    }
}

export default EditTraining;