import React, { PureComponent } from 'react'
import "./CheckoutOverlayContent.css"

import ShopContext from '../../Context'

import plus from "../../SVG/plus-square.svg"
import minus from "../../SVG/minus-square.svg"
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
        return <div className='checkout-product-description'>
            <div className='checkout-content-brand'>{this.props.product.data.brand}</div>
            <div className='checkout-content-name'>{this.props.product.data.name.length>17?this.props.product.data.name.slice(0,14)+"...":this.props.product.data.name}</div>
            <div className='checkout-content-price'>{this.props.product.data.prices[this.props.currency].currency.symbol}{this.props.product.data.prices[this.props.currency].amount}</div>
            {this.props.product.data.allAttributes.map((attr, j)=>{
                return <ChceckoutOverlayContentAttribute key={j} attr={attr} attribute={this.props.product.data.attributes[j]}/>
            })}
        </div>
    }

    render() {
        return (
            <div className="checkout-content">

                {this.renderProductDescription()}

                <div className='checkout-product-count'>
                    <img src={plus} onClick={()=>{this.addOne(this.props.product.data)}} style={{"cursor":"pointer"}} alt="add"></img>
                    <div>{this.props.product.count}</div>
                    <img src={minus} onClick={()=>{this.removeOne(this.props.product.data)}} style={{"cursor":"pointer"}} alt="remove"></img>
                </div>

                <div className='checkout-product-image'>
                    <img src={this.props.product.data.gallery[0]} alt="product"></img>
                </div>
                
            </div>
        )
    }
}
