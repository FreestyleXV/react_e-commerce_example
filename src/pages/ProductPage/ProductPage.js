import React, { PureComponent } from 'react'
import { sanitize } from "dompurify"
import Header from '../../Components/Header/Header'
import { getProduct } from '../../graphql'
import { Query } from '@apollo/client/react/components/Query';
import "./ProductPage.css"

import ShopContext from '../../Context';

    export default class ProductPage extends PureComponent {
        static contextType = ShopContext

        constructor(props){
            super(props)
            this.state = {
                attributes:[],
                currentImage:0,
                product:{}
            }
            this.getBasicAttributes = this.getBasicAttributes.bind(this)
            this.changePicture = this.changePicture.bind(this)
            this.addToCart = this.addToCart.bind(this)
        }

        getBasicAttributes(data){
            let attributes = []
            data.product.attributes.forEach(attr=>{
                attributes.push(0)
            })
            this.setState({attributes})
        }

        changePicture(id){
            this.setState({currentImage:id})
        }

        changeAttribute(id, attribute){
            let attributes = [...this.state.attributes]
            attributes[id] = attribute
            this.setState({
                attributes
            })
        }

        addToCart(){
            this.context.addToCheckout(
                {
                    id:this.state.product.id,
                    attributes:this.state.attributes,
                    prices:this.state.product.prices,
                    gallery:this.state.product.gallery,
                    allAttributes:this.state.product.attributes,
                    name:this.state.product.name,
                    brand:this.state.product.brand
                }
            )
        }

        render() {
            const currency = this.context.currency

            return (
                <div className='page'>
                    <Header history={this.props.history}/>
                    <Query
                        query={getProduct(this.props.match.params.productId)}
                        onCompleted={(data)=>{setTimeout(()=>{this.getBasicAttributes(data); this.setState({product:data.product})})}}
                        fetchPolicy='no-cache'
                    >
                    {({ loading, error, data }) => {
                        if (error) return <span></span>;
                        if (loading || !data) return <span></span>;
                        return <div className='product-page'>
                            <div className='product-images-list'>
                                {data.product.gallery.map((image,i)=>{
                                    return <div key={i} style={{"backgroundImage":`url(${image})`}} onClick={()=>{this.changePicture(i)}}></div>
                                })}
                            </div>
                            <div className='product-current-image'>
                                {data.product.gallery.length>0?<img src={data.product.gallery[this.state.currentImage]} alt="product"></img>:<div>NO IMAGE</div>}
                            </div>
                            <div className='page-product-description'>
                                <div className='page-product-brand'>{data.product.brand}</div>
                                <div className='page-product-name'>{data.product.name}</div>
                                <div className='page-product-attributes'>
                                    {data.product.attributes.map((attr, i)=>{
                                        return <div key={i}>
                                            <div className='page-product-attribute-label'>{attr.name.toUpperCase()}:</div>
                                            <div className={"page-product-attribute-"+attr.type}>
                                                {attr.items.map((item, j)=>{
                                                    if(attr.type==="swatch"){
                                                        if(j===this.state.attributes[i]){
                                                            return <span key={j}
                                                                style={{"height":"38px", "width":"38px", "border":"2px solid #5ECE7B", "boxSizing":"border-box"}}
                                                                onClick={()=>{this.changeAttribute(i,j)}}
                                                            >
                                                                <span
                                                                    style={{"backgroundColor":item.value, "marginTop":"1px", "marginLeft":"1px"}}
                                                                    className="page-product-attribute-swatch"
                                                                ></span>
                                                            </span>
                                                        }
                                                        return <span key={j}
                                                            style={{"backgroundColor":item.value}}
                                                            className="page-product-attribute-swatch"
                                                            onClick={()=>{this.changeAttribute(i,j)}}
                                                        >
                                                        </span>
                                                    }
                                                    else{
                                                        return <span key={j}
                                                            style={j===this.state.attributes[i]?{"backgroundColor": "black", "color": "white"}:{"color":"black"}}
                                                            onClick={()=>{this.changeAttribute(i,j)}}
                                                        >
                                                            {item.value}
                                                        </span>
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    })}
                                </div>
                                <div className='page-product-price-label'>PRICE:</div>
                                <div className='page-product-price'>{data.product.prices[currency].currency.symbol}{data.product.prices[currency].amount}</div>
                                {data.product.inStock
                                    ?<div className='page-product-checkout-button' onClick={this.addToCart}>ADD TO CART</div>
                                    :<div className='page-product-not-available'>NOT AVAILABLE</div>
                                }
                                <div dangerouslySetInnerHTML={{__html: sanitize(data.product.description)}} className="product-page-description">
                                </div>
                            </div>
                        </div>;
                    }}
                    </Query>
                </div>
            )
        }
    }
