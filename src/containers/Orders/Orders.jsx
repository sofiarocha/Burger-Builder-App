import React, { Component } from 'react';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders: [],
        loading: true,
    }

    componentDidMount () {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                this.setState({
                    loading: false,
                    orders: fetchedOrders,
                });
            })
            .catch(err => this.setState({ loading: false }))
    }

    render() {
        const { loading, orders } = this.state;
        return (
            <div>
                {loading ? <Spinner /> : orders.map(order => <Order order={order} key={order.id} />)}
            </div>
        );
    }
}
 
export default withErrorHandler(Orders, axios);