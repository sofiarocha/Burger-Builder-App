import React, { Component } from 'react';

import classes from './ContactForm.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactForm extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            zipCode: "",
        },
        loading: false,
    }

    orderSubmit = (event) => {
        const { ingredients, totalPrice } = this.props;
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: ingredients,
            price: totalPrice,
            costumer: {
                name: "Sofs Rock",
                adress: {
                    street: "Depois do sol posto, 9",
                    zipCode: "6969",
                    country: "Portugal"
                },
                email: "somos@lindas.com",
                deliveryMethod: "express",
            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => this.setState({
                loading: false,
            }));
    }

    render() {
        const { loading } = this.state;
        return (
            <div className={classes.ContactForm}>
                <h4>Enter your Contact data:</h4>
                {
                    loading
                        ? <Spinner />
                        : <form>
                            <input type="text" name="name" placeholder="Enter your name"/>
                            <input type="email" name="email" placeholder="Enter your email"/>
                            <input type="text" name="street" placeholder="Enter your address"/>
                            <input type="text" name="zipCode" placeholder="Zip code"/>
                            <Button btnType="Success" clicked={this.orderSubmit}>ORDER</Button>
                        </form>
                }
            </div>
        );
    }
}
 
export default ContactForm;