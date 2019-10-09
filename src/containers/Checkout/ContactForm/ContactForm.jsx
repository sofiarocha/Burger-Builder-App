import React, { Component } from 'react';

import classes from './ContactForm.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactForm extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your name",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                changedByUser: false,
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your email",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                changedByUser: false,
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                changedByUser: false,
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP Code",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 7,
                },
                valid: false,
                changedByUser: false,
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                changedByUser: false,
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "express"},
                        {value: "normal"},
                    ]
                },
                value: "normal",
                valid: true,
            }
        },
        loading: false,
        formIsValid: false,
    }

    orderSubmit = (event) => {
        const { ingredients, totalPrice } = this.props;
        const { orderForm } = this.state;
        event.preventDefault();
        this.setState({ loading: true });
        const orderData = {};
        for (let formInputName in orderForm) {
            orderData[formInputName] = orderForm[formInputName].value
        }

        const order = {
            ingredients: ingredients,
            price: totalPrice,
            orderData: orderData,
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
    
    inputChangedHandler = (event, inputIndentifier) => {
        const updatedForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedForm[inputIndentifier]};
        updatedFormElement.value = event.target.value;
        if (updatedFormElement.validation) {
            updatedFormElement.valid = this.checkValidationHandler(updatedFormElement.value, updatedFormElement.validation);
        }
        updatedFormElement.changedByUser = true;
        updatedForm[inputIndentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputNames in updatedForm) {
            formIsValid = updatedForm[inputNames].valid && formIsValid;
        }
        this.setState({
            orderForm: updatedForm,
            formIsValid: formIsValid,
        });
    }

    checkValidationHandler = (value, rules) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    render() {
        const { loading, orderForm, formIsValid } = this.state;
        let formElementsArray = [];
        for (let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            })
        }
        return (
            <div className={classes.ContactForm}>
                <h4>Enter your Contact data:</h4>
                {
                    loading
                        ? <Spinner />
                        : <form onSubmit={this.orderSubmit}>
                            {formElementsArray.map(formInput => (
                                <Input
                                    key={formInput.id}
                                    inputName={formInput.id}
                                    elementType={formInput.config.elementType}
                                    elementConfig={formInput.config.elementConfig}
                                    value={formInput.config.value}
                                    invalid={!formInput.config.valid}
                                    shouldBeValidated={formInput.config.validation}
                                    changedByUser={formInput.config.changedByUser}
                                    changed={(event) => this.inputChangedHandler(event, formInput.id)}
                                />
                            ))}
                            <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
                        </form>
                }
            </div>
        );
    }
}
 
export default ContactForm;