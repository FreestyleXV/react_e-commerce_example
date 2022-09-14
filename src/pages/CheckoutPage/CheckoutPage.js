import React, { Component } from 'react'
import "./CheckoutPage.css"

import ShopContext from '../../Context'
import { sortCheckout } from '../../Utils'
import Header from '../../Components/Header/Header'
import CheckoutPhoto from '../../Components/CheckoutPhoto/CheckoutPhoto'

import plus from "../../SVG/plus-square.svg"
import minus from "../../SVG/minus-square.svg"

export default class CheckoutPage extends Component {
    static contextType = ShopContext

    constructor(props){
        super(props)
        this.getWholePrice = this.getWholePrice.bind(this)
        this.addOne = this.addOne.bind(this)
        this.removeOne = this.removeOne.bind(this)
    }


    addOne(product){
        this.context.addToCheckout(product)
    }

    removeOne(product){
        this.context.removeFromCheckout(product)
    }

    getWholePrice(){
        let price = 0
        this.context.checkout.forEach(product => {
            price += parseFloat(product.prices[this.context.currency].amount)
        });
        return price.toFixed(2)
    }

    getTax(tax){
        let price = 0
        this.context.checkout.forEach(product => {
            price += parseFloat(product.prices[this.context.currency].amount)
        });
        return ((price*tax)/100).toFixed(2)
    }

    render() {
        const currencies = this.context.currencies
        console.log(currencies)
        const currency = this.context.currency
        const checkout = this.context.checkout
        let sortedCheckout = sortCheckout(checkout)

        return (
            <div>
                <Header toCheckout={()=>{this.props.history.push("/checkout")}}/>
                <div className='checkout-page-title'>CART</div>
                <div className='checkout-page-divider'></div>
                {sortedCheckout.map( (product, i) => {
                        return (<div key={i} className='checkout-page-part'>
                            <div className="checkout-page-content">
                                <div className='checkout-page-product-description'>
                                    <div className='checkout-page-content-brand'>{product.data.brand}</div>
                                    <div className='checkout-page-content-name'>{product.data.name.length>17?product.data.name.slice(0,14)+"...":product.data.name}</div>
                                    <div className='checkout-page-content-price'>{product.data.prices[currency].currency.symbol}{product.data.prices[currency].amount}</div>
                                    <div className='checkout-page-content-attributes'>
                                        {product.data.allAttributes.map((attr, j)=>{
                                            return <div key={j} className="checkout-page-content-attribute">
                                                <div className='checkout-page-attribute-label'>{attr.name.toUpperCase()}:</div>
                                                <div className='checkout-page-attribute-contents'>
                                                    {attr.items.map((item, k)=>{
                                                        if(attr.type==="swatch"){
                                                            if(k===product.data.attributes[j]){
                                                                return <span key={k} style={{"height":"36px", "width":"36px", "border":"1px solid #5ECE7B", "boxSizing":"border-box"}}>
                                                                    <span style={{"backgroundColor":item.value, "marginTop":"1px"}} className="checkout-page-attribute-swatch"></span>
                                                                </span>
                                                            }
                                                            else{
                                                                return <span key={k} style={{"backgroundColor":item.value}} className="checkout-page-attribute-swatch"></span>
                                                            }
                                                        }
                                                        else{
                                                            return <span key={k}
                                                                style={k===product.data.attributes[j]?{"backgroundColor": "black", "color": "white"}:{"color":"black"}}
                                                                className="checkout-page-text-attribute"
                                                            >
                                                                {item.value}
                                                            </span>
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                                <div className='checkout-page-product-right'>
                                    <div className='checkout-page-product-count'>
                                        <img src={plus} onClick={()=>{this.addOne(product.data)}} style={{"cursor":"pointer"}} alt="add"></img>
                                        <div>{product.count}</div>
                                        <img src={minus} onClick={()=>{this.removeOne(product.data)}} style={{"cursor":"pointer"}} alt="remove"></img>
                                    </div>
                                    <CheckoutPhoto gallery={product.data.gallery}/>
                                </div>
                                
                            </div>
                            <div className='checkout-page-divider'></div>
                        </div>)
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
                    <div className='checkout-page-checkout-button' onClick={()=>{console.log("order!")}}>ORDER</div>
            </div>
        )
    }
}
