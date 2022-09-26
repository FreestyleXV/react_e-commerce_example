import React, { PureComponent } from 'react'
import "./CheckoutOverlayContent.css"

import ShopContext from '../../../Context'

import plus from "../../../SVG/plus-square.svg"
import minus from "../../../SVG/minus-square.svg"
import ChceckoutOverlayContentAttribute from '../CheckoutOverlayContentAttribute/CheckoutOverlayContentAttribute'

export default class CheckoutOverlayContent extends PureComponent {
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

    renderProductDescription(){
        const product = this.props.product
        return <div className='checkout-product-description'>
            <div className='checkout-content-brand'>{product.data.brand}</div>
            <div className='checkout-content-name'>{product.data.name.length>17?product.data.name.slice(0,14)+"...":product.data.name}</div>
            <div className='checkout-content-price'>{product.data.prices[this.props.currency].currency.symbol}{product.data.prices[this.props.currency].amount}</div>
            {product.data.allAttributes.map((attr, j)=>{
                return <ChceckoutOverlayContentAttribute key={j} attr={attr} attribute={product.data.attributes[j]}/>
            })}
        </div>
    }

    render() {
        const product = this.props.product

        return (
            <div className="checkout-content">

                {this.renderProductDescription()}

                <div className='checkout-product-count'>
                    <img src={plus} onClick={()=>{this.addOne(product.data)}} style={{"cursor":"pointer"}} alt="add"></img>
                    <div>{product.count}</div>
                    <img src={minus} onClick={()=>{this.removeOne(product.data)}} style={{"cursor":"pointer"}} alt="remove"></img>
                </div>

                <div className='checkout-product-image'>
                    <img src={product.data.gallery[0]} alt="product"></img>
                </div>
                
            </div>
        )
    }
}
