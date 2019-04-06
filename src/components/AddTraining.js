import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddTraining extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false, date: '', duration: '', activity: '', customer: '' };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    addTraining = () => {
        const newTraining = {
            date: this.state.date,
            duration: this.state.duration,
            activity: this.state.activity,
            customer: this.state.customer
        };

        this.props.saveTraining(newTraining);
        this.handleClose();
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New training</DialogTitle>
                    <DialogContent>
                        <DialogContentText>

                        </DialogContentText>
                        <TextField onChange={this.handleChange}
                            autoFocus margin="dense" name="date" label="Date"
                            fullWidth />

                        <TextField onChange={this.handleChange}
                            margin="dense" name="duration" label="Duration"
                            fullWidth />
                        <TextField onChange={this.handleChange}
                            margin="dense" name="activity" label="Activity"
                            fullWidth />
                        <TextField onChange={this.handleChange}
                            margin="dense" name="customer" label="Customer id"
                            fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" size="small">
                            Cancel
                         </Button>
                        <Button onClick={this.addTraining} color="primary" size="small">
                            Add
                         </Button>
                    </DialogActions>
                </Dialog>
                <Button size="small" color="secondary" variant="contained" onClick={this.handleClickOpen}>ADD TRAINING</Button>
            </div>
        );

    }
}


export default AddTraining;