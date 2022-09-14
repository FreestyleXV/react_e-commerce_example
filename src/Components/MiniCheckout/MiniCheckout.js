import React, { Component } from 'react'
import "./MiniCheckout.css"

import ShopContext from '../../Context';
import { sortCheckout } from '../../Utils';

import plus from "../../SVG/plus-square.svg"
import minus from "../../SVG/minus-square.svg"

export default class MiniCheckout extends Component {
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
        this.props.checkout.forEach(product => {
            price += parseFloat(product.prices[this.props.currency].amount)
        });
        return price.toFixed(2)
    }

    render() {
        let sortedCheckout = sortCheckout(this.props.checkout)

        return (
            <div className={`checkout ${this.props.opened?"opened":""}`} style={{"height":`${this.props.opened?(sortedCheckout.length>2?466:sortedCheckout.length*233)+191:0}px`}}>
                <div className='checkout-description'>
                    <span className='checkout-description-title'>My bag</span>
                    , {this.props.checkout.length} items
                </div>
                <div className='checkout-contents-box' style={{"height":`${(sortedCheckout.length>2?466:sortedCheckout.length*233)+30}px`}}>
                    {sortedCheckout.map( (product, i) => {
                        return <div key={i} className="checkout-content">
                            <div className='checkout-product-description'>
                                <div className='checkout-content-brand'>{product.data.brand}</div>
                                <div className='checkout-content-name'>{product.data.name.length>17?product.data.name.slice(0,14)+"...":product.data.name}</div>
                                <div className='checkout-content-price'>{this.props.currencySymbol}{product.data.prices[this.props.currency].amount}</div>
                                {product.data.allAttributes.map((attr, j)=>{
                                    return <div key={j} className="checkout-content-attribute">
                                        <div className='attribute-label'>{attr.name.length>17?attr.name.slice(0,14)+"...":attr.name}</div>
                                        <div className='attribute-contents'>
                                            {attr.items.map((item, k)=>{
                                                if(attr.type==="swatch"){
                                                    if(k===product.data.attributes[j]){
                                                        return <span key={k} style={{"height":"24px", "width":"24px", "border":"1px solid #5ECE7B", "boxSizing":"border-box"}}>
                                                            <span style={{"backgroundColor":item.value, "marginTop":"1px"}} className="attribute-swatch"></span>
                                                        </span>
                                                    }
                                                    return <span key={k} style={{"backgroundColor":item.value}} className="attribute-swatch"></span>
                                                }
                                                else{
                                                    return <span key={k}
                                                        style={k===product.data.attributes[j]?{"backgroundColor": "black", "color": "white"}:{"color":"black"}}
                                                        className="checkout-text-attribute"
                                                    >
                                                        {item.value}
                                                    </span>
                                                }
                                            })}
                                        </div>
                                    </div>
                                })}
                            </div>
                            <div className='checkout-product-count'>
                                <img src={plus} onClick={()=>{this.addOne(product.data)}} style={{"cursor":"pointer"}} alt="add"></img>
                                <div>{product.count}</div>
                                <img src={minus} onClick={()=>{this.removeOne(product.data)}} style={{"cursor":"pointer"}} alt="remove"></img>
                            </div>
                            <div className='checkout-product-image'>
                                <img src={product.data.gallery[0]} alt="product"></img>
                            </div>
                        </div>
                    })}
                </div>
                <div className='checkout-summary'>
                    <span>Total</span>
                    <span className='checkout-price'>{this.props.currencySymbol}{this.getWholePrice()}</span>
                </div>
                <div className='checkout-buttons-box'>
                    <span className='checkout-view-button' onClick={()=>{this.props.toCheckout()}}>VIEW BAG</span>
                    <span className='checkout-checkout-button'>CHECK OUT</span>
                </div>
            </div>
        )
    }
}
