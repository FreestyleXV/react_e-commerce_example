import React, { PureComponent } from 'react'
import "./CheckoutPage.css"

import ShopContext from '../../Context'
import { sortCheckout } from '../../Utils'
import Header from '../../Components/Header/Header'

import CheckoutPageContent from '../../Components/CheckoutPageContent/CheckoutPageContent'

export default class CheckoutPage extends PureComponent {
    static contextType = ShopContext

    constructor(props){
        super(props)
        this.getWholePrice = this.getWholePrice.bind(this)
    }

    componentDidMount(){
        this.context.checkout.subscribe(()=>{this.forceUpdate()})
    }

    getWholePrice(){
        let price = 0
        this.context.checkout.contents.forEach(product => {
            price += parseFloat(product.prices[this.context.currency].amount)
        });
        return price.toFixed(2)
    }

    getTax(tax){
        let price = 0
        this.context.checkout.contents.forEach(product => {
            price += parseFloat(product.prices[this.context.currency].amount)
        });
        return ((price*tax)/100).toFixed(2)
    }

    render() {
        const currencies = this.context.currencies
        const currency = this.context.currency
        const checkout = this.context.checkout.contents
        let sortedCheckout = sortCheckout(checkout)

        return (
            <div className='page'>
                <Header history={this.props.history}/>
                <div className='checkout-page-title'>CART</div>
                <div className='checkout-page-divider'></div>
                {sortedCheckout.map( (product, i) => {
                        return <CheckoutPageContent key={i} product={product}/>
                    })}
                    <div className='checkout-page-summary'>
                        <div className='checkout-page-summary-title'>
                            <div>Tax 21%:</div>
                            <div>Quantity:</div>
                            <div>Total:</div>
                        </div>
                        <div className='checkout-page-summary-value'>
                            <div>{currencies.length===0?"$":currencies[currency].symbol}{this.getTax(21)}</div>
                            <div>{checkout.length}</div>
                            <div>{currencies.length===0?"$":currencies[currency].symbol}{this.getWholePrice()}</div>
                        </div>
                    </div>
                    <div className='checkout-page-checkout-button' onClick={()=>{this.props.history.goBack()}}>ORDER</div>
            </div>
        )
    }
}
