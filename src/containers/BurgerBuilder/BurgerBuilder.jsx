import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    bacon: 0.7,
    cheese: 0.4,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purshasing: false,
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
        this.setState({ purshasing: false })
    }

    purchaseContinueHandler = () => {
        alert('You are going to continue!!!')
    }

    render() {
        const { ingredients, totalPrice, purchasable, purshasing } = this.state;

        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
           disabledInfo[key] = disabledInfo[key] <= 0; 
        }
        
        return (
            <Aux>
                <Modal show={purshasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={ingredients}
                        totalPrice={totalPrice.toFixed(2)}
                        purchaseCancel={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                    />
                </Modal>
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
        );
    }
}
 
export default BurgerBuilder;

