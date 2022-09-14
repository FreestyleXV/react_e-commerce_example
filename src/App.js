import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { ShopProvider } from './Context';

import CategoryPage from './pages/CategoryPage/CategoryPage';
import ProductPage from './pages/ProductPage/ProductPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import Error from './pages/Error/Error';

function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/category/:categoryId" render={(props)=>{return <CategoryPage {...props}/>}}/>
          <Route path="/product/:productId" render={(props)=>{return <ProductPage {...props}/>}}/>
          <Route path="/checkout" render={(props)=>{return <CheckoutPage {...props}/>}}/>
          <Route path="/error" render={(props)=>{return <Error {...props}/>}}/>
          <Route path="/">
            <Redirect to="/category/all" />
          </Route>
        </Switch>
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;

