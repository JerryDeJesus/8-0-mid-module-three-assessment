import "./App.css"
import { Component } from 'react'
import productData from "./data/productData"
import formatPrice from "./helpers/formatPrice"

class App extends Component {
  constructor(){
    super()
    this.state = {
      products: productData,
      cart:{subtotal: 0, tax: 0, total: 0},
      checkout:{firstName:"", lastName:"", email:"", creditCard:"", zipCode:""},
      cartItems:[]
    }
  }

  handleFirstName=(event)=>{
    this.setState({
        checkout:{firstName: event.target.value}
    })
  }

  handleLastName=(event)=>{
    this.setState({
        checkout:{lastName: event.target.value}
    })
  }

  handleEmail=(event)=>{
    this.setState({
        checkout:{email: event.target.value}
    })
  }

  handleCard=(event)=>{
    this.setState({
        checkout:{creditCard: event.target.value}
    })
  }

  handleZipCode=(event)=>{
    this.setState({
        checkout:{zipCode: event.target.value}
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    let cardStr = String(this.state.checkout.creditCard);
    let zipStr = String(this.state.checkout.zipCode);
    console.log(card.length, zip.length);
    if(cardLength !== 16){
      alert('Credit card number is not valid.')
    }
    if(zipLength !== 5){
      alert('Zip code is not valid')
    }
    if(this.state.checkout.firstName !== "" &&
      this.state.checkout.lastName !== "" &&
      this.state.checkout.email !== "" &&
      cardLength && zipLength){
          alert(`Purchase complete. Total is ${formatPrice(this.state.cart.total)}`);
      }
  }
  

  handleAddtoCart=(event)=>{
    this.setState({ 
      cartItems:[...this.state.cartItems, <li>{event.target.name}: {formatPrice(Number(event.target.value))}</li>],
      cart:{subtotal: this.state.cart.subtotal + Number(event.target.value),
            tax: (this.state.cart.subtotal + Number(event.target.value))* 0.05,
            total: (this.state.cart.subtotal + Number(event.target.value))* 1.05
          }
    })
  }

  render(){

    let productListingArr = this.state.products.map((product) => {
      return (<span className="product">
                <h3>{product.name}</h3>  Price: {formatPrice(product.price)} <br/>
                <button className="addToCart" type="submit" name={product.name} value={product.price} 
                onClick={this.handleAddtoCart}  >Add To Cart</    button> <br/> 
                <img src={product.img} alt="product"/> <br/>
                {product.description}
              </span>)
    });


    return (<><h2>My Garage Sale</h2>
      <div id="main">
        <div className="products">
          {productListingArr}
        </div>
        <div id="cart">
          <h3><b>Cart</b></h3>
        <ul id="cart-items">
          {this.state.cartItems}
        </ul>
          <h4>Subtotal: {formatPrice(this.state.cart.subtotal)}</h4>
          <h4>Tax: {formatPrice(this.state.cart.tax)}</h4>
          <h4>Total: {formatPrice(this.state.cart.total)}</h4>

          <form id="checkout" onSubmit={this.handleFormSubmit}>

            <h3>Checkout</h3>

            <label>First Name<br/><input
            type="text" value={this.state.checkout.firstName}
            onInput={this.handleFirstName} placeholder="Jerry"
            /></label><br/>
               
            <label>Last Name<br/><input
            type="text" value={this.state.checkout.lastName}
            onInput={this.handleLastName} placeholder="DeJesus"
            /></label><br/>
            
            <label>Email<br/><input
            type="email" value={this.state.checkout.email}
            onInput={this.handleEmail} placeholder="example@gmail.com"
            /></label><br/>
            
            <label>Credit Card<br/><input
            type="text" value={this.state.checkout.creditCard}
            onInput={this.handleCard} 
            /></label><br/>
          
            <label>Zip Code<br/><input
            type="text" value={this.state.checkout.zipCode}
            onInput={this.handleZipCode} 
            /></label><br/>
            
            <button type="submit" >Buy Now</button>
          </form>
        </div>
      </div>
      </>
    )}
  }

export default App
