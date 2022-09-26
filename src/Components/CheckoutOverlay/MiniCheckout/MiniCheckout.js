import React, { PureComponent } from 'react'
import "./MiniCheckout.css"

import ShopContext from '../../../Context';
import { sortCheckout } from '../../../Utils';

import CheckoutOverlayContent from '../CheckoutOverlayContent/CheckoutOverlayContent';

export default class MiniCheckout extends PureComponent {
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

    render() {
        const checkout = this.context.checkout.contents
        const sortedCheckout = sortCheckout(checkout)
        const { opened, currencySymbol, currency, toCheckout } = this.props

        return (
            <div className={`checkout ${opened?"opened":""}`} style={{"height":`${opened?(sortedCheckout.length>2?466:sortedCheckout.length*233)+191:0}px`}}>
                <div className='checkout-description'>
                    <span className='checkout-description-title'>My bag</span>
                    , {checkout.length} items
                </div>
                <div className='checkout-contents-box' style={{"height":`${(sortedCheckout.length>2?466:sortedCheckout.length*233)+30}px`}}>
                    {sortedCheckout.map( (product, i) => {
                        return <CheckoutOverlayContent key={i} product={product} currency={currency}></CheckoutOverlayContent>
                    })}
                </div>
                <div className='checkout-summary'>
                    <span>Total</span>
                    <span className='checkout-price'>{currencySymbol}{this.getWholePrice()}</span>
                </div>
                <div className='checkout-buttons-box'>
                    <span className='checkout-view-button' onClick={()=>{toCheckout()}}>VIEW BAG</span>
                    <span className='checkout-checkout-button'>CHECK OUT</span>
                </div>
            </div>
        )
    }
}
