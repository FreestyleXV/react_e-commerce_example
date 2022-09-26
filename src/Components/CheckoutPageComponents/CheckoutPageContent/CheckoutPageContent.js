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

        return (
            <div className='checkout-page-part'>
                <div className="checkout-page-content">
                    <div className='checkout-page-product-description'>
                        <div className='checkout-page-content-brand'>{this.props.product.data.brand}</div>
                        <div className='checkout-page-content-name'>{this.props.product.data.name.length>17?this.props.product.data.name.slice(0,14)+"...":this.props.product.data.name}</div>
                        <div className='checkout-page-content-price'>{this.props.product.data.prices[currency].currency.symbol}{this.props.product.data.prices[currency].amount}</div>
                        <div className='checkout-page-content-attributes'>
                            {this.props.product.data.allAttributes.map((attr, j)=>{
                                return <CheckoutPageContentAttribute key={j} attr={attr} attribute={this.props.product.data.attributes[j]}/>
                            })}
                        </div>
                    </div>
                    <div className='checkout-page-product-right'>
                        <div className='checkout-page-product-count'>
                            <img src={plus} onClick={()=>{this.addOne(this.props.product.data)}} style={{"cursor":"pointer"}} alt="add"></img>
                            <div>{this.props.product.count}</div>
                            <img src={minus} onClick={()=>{this.removeOne(this.props.product.data)}} style={{"cursor":"pointer"}} alt="remove"></img>
                        </div>
                        <CheckoutPhoto gallery={this.props.product.data.gallery}/>
                    </div>
                </div>
                <div className='checkout-page-divider'></div>
            </div>
        )
    }
}
