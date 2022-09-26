import React, { PureComponent } from 'react'
import { Query } from '@apollo/client/react/components/Query';
import { getCurrencies } from './graphql'

class Checkout{
  constructor(contents){
    this.contents = contents
    this.subscriptions = []
  }

  update(contents){
    this.contents = contents
    this.subscriptions.forEach(f=>f())
  }

  subscribe(f) {
    this.subscriptions.push(f)
  }
}

const ShopContext = React.createContext()

class ShopProvider extends PureComponent {
  
  constructor(props){
    super(props)
    this.checkout = new Checkout(JSON.parse(localStorage.getItem("checkout") || "[]"))
  }
  // Context state
  state = {
    currency: parseInt(localStorage.getItem("currency") || 0),
  }

  // Method to update state
  setCurrency = (currencyId) => {
    localStorage.setItem("currency", currencyId)
    this.setState(() => ({ currency: currencyId }))
  }

  addToCheckout = (product) => {
    let oldCheckout = this.checkout.contents
    oldCheckout.push(product)
    localStorage.setItem("checkout", JSON.stringify(oldCheckout))
    this.checkout.update(oldCheckout)
  }

  removeFromCheckout = (productToRemove) => {
    let oldCheckout = this.checkout.contents
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
    this.checkout.update(oldCheckout)

  }

  render() {
    const { children } = this.props
    const { currency } = this.state
    const { checkout, setCurrency, addToCheckout, removeFromCheckout } = this

    return (
      <Query query={getCurrencies}>
        {({ loading, error, data }) => {
          let currencies = []
          if (error) {
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