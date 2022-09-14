import React, { Component } from 'react'
import "./ProductBox.css"

import ShopContext from '../../Context'

import cartImg from "../../SVG/empty_cart.svg"

export default class ProductBox extends Component {
    static contextType = ShopContext

    constructor(props){
        super(props)
        this.state={
            hovered:false,
            buttonHovered:false
        }
        this.getBasicAttributes = this.getBasicAttributes.bind(this)
    }

    getBasicAttributes(){
        let attributes = []
        this.props.attributes.forEach(attr => {
            attributes.push(0)
        });
        return attributes
    }

    render() {
        const addToCheckout = this.context.addToCheckout

        return (
            <div className="product-box"
                onMouseEnter={()=>{this.setState({hovered:true})}}
                onMouseLeave={()=>{this.setState({hovered:false})}}
                onClick={()=>{
                    if(!this.state.buttonHovered){
                        this.props.click()
                    }
                }}
            >
                <div className='product-image-box'>
                    <img className='product-image' src={this.props.gallery[0]} alt={this.props.name} draggable="false"></img>
                    {!this.props.inStock?<div className='image-overlay'>
                        <div className='image-overlay-filter'></div>
                        <div className='image-overlay-text'><p>OUT OF STOCK</p></div>
                    </div>:false}
                </div>
                {(this.state.hovered&&this.props.inStock)?<div className='buy-button'
                    onMouseEnter={()=>{this.setState({buttonHovered:true})}}
                    onMouseLeave={()=>{this.setState({buttonHovered:false})}}
                    onClick={()=>{addToCheckout({
                        id:this.props.id,
                        attributes:this.getBasicAttributes(),
                        prices:this.props.prices,
                        gallery:this.props.gallery,
                        allAttributes:this.props.attributes,
                        name:this.props.name,
                        brand:this.props.brand
                    })}}
                >
                    <img src={cartImg} alt="cart"></img>
                </div>:false}
                <div className='product-description'>
                    <div className='product-name'>{this.props.brand} - {this.props.name}</div>
                    <div className='product-price'>{this.props.prices[this.props.currency].currency.symbol}{this.props.prices[this.props.currency].amount}</div>
                </div>
            </div>
        )
    }
}
