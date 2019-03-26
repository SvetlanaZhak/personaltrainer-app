import React, { Component } from 'react';
import '../App.css';
import pic_one from './pic_one.jpeg';
import pic_two from './pic_two.jpeg';
import pic_three from './pic_three.jpeg';


class HomePage extends Component {
    render() {
        return (
            <div>

                <h2>Welcome to Home Page!</h2>
                <p>In this app you can find information about customers and their trainings.</p>
                <img src={pic_one} className="img-thumbnail" width="300" alt="Girl" />
                <img src={pic_two} className="img-thumbnail" width="300" alt="Girls" />
                <br></br>
                <img src={pic_three} className="img-thumbnail" width="600" alt="Swimming" />


            </div>

        )
    }
}

export default HomePage;