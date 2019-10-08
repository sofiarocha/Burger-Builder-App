import React, { Component } from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    bacon: 0.7,
    cheese: 0.4,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {},
        totalPrice: 4,
        purchasable: false,
        purshasing: false,
        loading: true,
        error: false,
        errorMessage: '',
    }

    componentDidMount () {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data, loading: false })
            })
            .catch(error => {
                this.setState({ error: true, errorMessage: error.message, loading: false })
            })
    }

    updatePurchase = (ingredients) => {
        let sum = 0;
        for (let key in ingredients) {
            sum += ingredients[key];
        }

        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        this.setState(state => {
            return {
                ingredients: {...state.ingredients, [type]: state.ingredients[type] + 1},
                totalPrice: state.totalPrice + INGREDIENT_PRICES[type],
            }
        }, () => this.updatePurchase(this.state.ingredients));
    }

    removeIngredientsHanlder = (type) => {
        if(this.state.ingredients[type] <= 0) {
            return;
        }
        this.setState(state => {
            return {
                ingredients: {...state.ingredients, [type]: state.ingredients[type] - 1},
                totalPrice: state.totalPrice - INGREDIENT_PRICES[type],
            }
        }, () => this.updatePurchase(this.state.ingredients));
    }

    purshasingHandler = () => {
        this.setState({ purshasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purshasing: false, error: false })
    }

    purchaseContinueHandler = () => {
        const { ingredients, totalPrice } = this.state;
        // alert('You are going to continue!!!')
        const queryParams = [];
        for (let i in ingredients) {
            queryParams.push(`${i}=${ingredients[i]}`);
        }
        queryParams.push(`price=${totalPrice}`);
        const queryString = queryParams.join("&");

        this.props.history.push({
            pathname: "/checkout",
            search: `?${queryString}`,
        });
    }

    render() {
        const { ingredients, totalPrice, purchasable, purshasing, loading, error, errorMessage } = this.state;

        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
           disabledInfo[key] = disabledInfo[key] <= 0; 
        }

        if (loading) return <Spinner />
        return (
            <Aux>
                <Modal show={purshasing} modalClosed={this.purchaseCancelHandler}>
                    {loading 
                        ? <Spinner />
                        : <OrderSummary 
                            ingredients={ingredients}
                            totalPrice={totalPrice.toFixed(2)}
                            purchaseCancel={this.purchaseCancelHandler}
                            purchaseContinue={this.purchaseContinueHandler}
                        />
                    }
                </Modal>
                <Modal show={error} modalClosed={this.purchaseCancelHandler}>
                    {errorMessage}
                </Modal>
                {Object.keys(ingredients).length === 0
                    ? <p style={{ textAlign: "center" }}>
                        Ingredients are not available! <br/>Try later, please
                    </p>
                    : <Aux>
                        <Burger ingredients={ingredients} />
                        <BuildControls 
                            addIngredient={this.addIngredientHandler}
                            removeIngredient={this.removeIngredientsHanlder}
                            disableInfo={disabledInfo}
                            totalPrice={totalPrice.toFixed(2)}
                            purchasable={purchasable}
                            ordered={this.purshasingHandler}
                        />
                    </Aux>                
                }
            </Aux>
        );
    }
}
 
export default withErrorHandler(BurgerBuilder, axios);

