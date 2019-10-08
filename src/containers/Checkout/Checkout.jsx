import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from '../Checkout/ContactForm/ContactForm';

class Checkout extends Component {
    constructor(props) {
        super(props);

        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price = 0;
        for (let params of query.entries()) {
            //console.log(params);
            if (params[0] === "price") {
                price = +params[1];
            } else {
                ingredients[params[0]] = +params[1];
            }
        }

        this.state = {
            ingredients: ingredients,
            totalPrice: price,
        }
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-form");
    }

    render() {
        const { ingredients, totalPrice } = this.state;
        return (
            <div>
                <CheckoutSummary 
                    ingredients={ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route 
                    path={`${this.props.match.url}/contact-form`} 
                    render={(props) => <ContactForm ingredients={ingredients} totalPrice={totalPrice} {...this.props} />}
                />
            </div>
        );
    }
}
 
export default Checkout;