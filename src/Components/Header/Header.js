import React, { PureComponent } from 'react'
import {NavLink} from "react-router-dom"
import { Query } from '@apollo/client/react/components/Query';
import "./Header.css"
import { getCategories } from '../../graphql'

import ShopContext from '../../Context.js'

import logo from "../../SVG/logo.svg"
import checkoutImg from "../../SVG/empty_cart.svg"
import arrowUp from "../../SVG/arrow_up.svg"
import arrowDown from "../../SVG/arrow_down.svg"
import MiniCheckout from '../CheckoutOverlay/MiniCheckout/MiniCheckout'

export default class Header extends PureComponent {
    static contextType = ShopContext

    constructor(props){
        super(props)
        this.state={
            currenciesOpen: false,
            checkoutOpen: false,
        }
    }

    componentDidMount(){
        this.context.checkout.subscribe(()=>{this.forceUpdate()})
    }

    render() {
        const currencies = this.context.currencies
        const currency = this.context.currency
        const checkoutLength = this.context.checkout.contents.length

        return (
        <div className='header'>
            <Query query={getCategories} fetchPolicy='no-cache'>
                {({ loading, error, data }) => {
                    if (error) return <span className='router-links-box'></span>;
                    if (loading || !data) return <span className='router-links-box'></span>;

                    return <span className='router-links-box'>
                        {data.categories.map( (category, i) => {
                            return <NavLink key={i}
                                to={`/category/${category.name}`}
                                className={({ isActive }) =>
                                    (isActive ? "active" : "inactive") + " router-link" 
                                }
                            >
                                <span className='router-link-text'>{category.name.toUpperCase()}</span>
                            </NavLink>
                        } )}
                    </span>;
                }}
            </Query>
            <img src={logo} alt="logo" className='logo' onClick={()=>{this.props.history.goBack()}}></img>
            <span className='header-options'>
                <span className='header-currency' onClick={()=>{this.setState({currenciesOpen:!this.state.currenciesOpen, checkoutOpen:false})}}>
                    <span>{currencies[currency]?currencies[currency].symbol:"$"}</span>
                    <img src={this.state.currenciesOpen?arrowUp:arrowDown} alt="arrow"/>
                </span>
                <span className='header-checkout' onClick={()=>{this.setState({checkoutOpen:!this.state.checkoutOpen, currenciesOpen:false})}}>
                    <img src={checkoutImg} alt="checkout"></img>
                    {checkoutLength>0?<div className='checkout-length-indicator'>{checkoutLength>9?"9+":checkoutLength}</div>:false}
                </span>
            </span>
            <div className={`currenciesSelect ${this.state.currenciesOpen?"opened":""}`} style={this.state.currenciesOpen?{"height":`${currencies.length*45}px`}:{"height":0}}>
                {currencies.map((currency, i)=>{
                    return <div key={i} className="currencyOption" onClick={()=>{this.context.setCurrency(i);this.setState({currenciesOpen:false})}}>{currency.symbol + " " + currency.label}</div>
                })}
            </div>
            <MiniCheckout opened={this.state.checkoutOpen} currencySymbol={currencies[currency]?currencies[currency].symbol:"$"} currency={currency} toCheckout={()=>{this.props.history.push("/checkout")}}/>
            <div 
                className={`header-options-page-overlay ${this.state.currenciesOpen?"currency-overlay":this.state.checkoutOpen?"checkout-overlay":""}`}
                onClick={()=>{this.setState({currenciesOpen:false, checkoutOpen:false})}}
            ></div>
        </div>
        )
    }
}
