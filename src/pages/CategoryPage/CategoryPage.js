import React, { PureComponent } from 'react'
import { Query } from '@apollo/client/react/components/Query';
import { getProducts } from '../../graphql';
import "./CategoryPage.css"

import ShopContext from '../../Context';

import Header from '../../Components/Header/Header';
import ProductBox from '../../Components/ProductBox/ProductBox';

export default class CategoryPage extends PureComponent {
    static contextType = ShopContext

    // constructor(props){
    //     super(props)
    // }

    render() {
        const currency = this.context.currency


        return (
            <div className='page'>
                <Header history={this.props.history}/>
                <div className='category-title'>{this.props.match.params.categoryId}</div>
                <Query query={getProducts(this.props.match.params.categoryId)} fetchPolicy='no-cache'>
                    {({ loading, error, data }) => {
                        if (error) return <h1>Error...</h1>;
                        if (loading || !data) return <h1>Loading...</h1>;

                        if(data.category === null){
                            this.props.history.push("../error")
                        }
                        return <div className='products-box-container'>
                            {data.category.products.map((product, i)=>{
                                return <ProductBox key={i} {...product} currency={currency} click={()=>{this.props.history.push(`/product/${product.id}`)}}/>
                            })}
                        </div>
                    }}
                </Query>
            </div>
        )
    }
}
