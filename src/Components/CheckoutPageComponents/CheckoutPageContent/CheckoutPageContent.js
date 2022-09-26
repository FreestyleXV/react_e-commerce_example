import React, { PureComponent } from 'react'
import "./CheckoutPageContent.css"

import ShopContext from '../../../Context'
import CheckoutPhoto from '../CheckoutPhoto/CheckoutPhoto'

import plus from "../../../SVG/plus-square.svg"
import minus from "../../../SVG/minus-square.svg"
import CheckoutPageContentAttribute from '../CheckoutPageContentAttribute/CheckoutPageContentAttribute'

export default class CheckoutPageContent extends PureComponent {
    static contextType = ShopContext

    constructor(props){
        super(props)
        this.addOne = this.addOne.bind(this)
        this.removeOne = this.removeOne.bind(this)
    }

    addOne(product){
        this.context.addToCheckout(product)
    }

    removeOne(product){
        this.context.removeFromCheckout(product)
    }

    render() {
        const currency = this.context.currency
        const product = this.props.product

        return (
            <div className='checkout-page-part'>
                <div className="checkout-page-content">
                    <div className='checkout-page-product-description'>
                        <div className='checkout-page-content-brand'>{product.data.brand}</div>
                        <div className='checkout-page-content-name'>{product.data.name.length>17?product.data.name.slice(0,14)+"...":product.data.name}</div>
                        <div className='checkout-page-content-price'>{product.data.prices[currency].currency.symbol}{product.data.prices[currency].amount}</div>
                        <div className='checkout-page-content-attributes'>
                            {product.data.allAttributes.map((attr, j)=>{
                                return <CheckoutPageContentAttribute key={j} attr={attr} attribute={product.data.attributes[j]}/>
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
            </div>
        )
    }
}
