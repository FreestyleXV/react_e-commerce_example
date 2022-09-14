import React, { Component } from 'react'
import { Query } from '@apollo/client/react/components/Query';
import { getCurrencies } from './graphql'

const ShopContext = React.createContext()

class ShopProvider extends Component {
  // Context state
  state = {
    currency: parseInt(localStorage.getItem("currency") || 0),
    checkout: JSON.parse(localStorage.getItem("checkout") || "[]")
  }

  // Method to update state
  setCurrency = (currencyId) => {
    localStorage.setItem("currency", currencyId)
    this.setState(() => ({ currency: currencyId }))
  }

  addToCheckout = (product) => {
    let oldCheckout = this.state.checkout
    oldCheckout.push(product)
    localStorage.setItem("checkout", JSON.stringify(oldCheckout))
    this.setState(() => ({ checkout: oldCheckout }))
  }

  removeFromCheckout = (productToRemove) => {
    let oldCheckout = this.state.checkout
    let removedIndex = oldCheckout.findLastIndex( product => {
        if (product.id === productToRemove.id){
          for(let i=0; i<product.attributes.length; i++){
            if(product.attributes[i] !== productToRemove.attributes[i]){
                return false
            }
          }
          return true
        }
        return false
    })
    if(removedIndex !== -1){
        oldCheckout.splice(removedIndex, 1)
    }
    localStorage.setItem("checkout", JSON.stringify(oldCheckout))
    this.setState(() => ({ checkout:oldCheckout }))

  }

  render() {
    const { children } = this.props
    const { currency, checkout } = this.state
    const { setCurrency, addToCheckout, removeFromCheckout } = this

    return (
      <Query query={getCurrencies}>
        {({ loading, error, data }) => {
          let currencies = []
          if (error) {
            console.log(error)
            return <ShopContext.Provider
              value={{
                currencies,
                currency,
                checkout,
                setCurrency,
                addToCheckout,
                removeFromCheckout
              }}
            >
              {children}
            </ShopContext.Provider>
          }
          if (loading || !data) {
            console.log("error")
            return <ShopContext.Provider
              value={{
                currencies,
                currency,
                checkout,
                setCurrency,
                addToCheckout,
                removeFromCheckout
              }}
            >
            {children}
          </ShopContext.Provider>
          };

          currencies = data.currencies
          // this.setState({currencies: data.currencies})
          
          return <ShopContext.Provider
          value={{
            currencies,
            currency,
            checkout,
            setCurrency,
            addToCheckout,
            removeFromCheckout
          }}
          >
            {children}
          </ShopContext.Provider>
        }}
      </Query>
    )
  }
}

export default ShopContext

export { ShopProvider }