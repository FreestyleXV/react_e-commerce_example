import React, { PureComponent } from 'react'
import "./CheckoutPageContentAttribute.css"

export default class CheckoutPageContentAttribute extends PureComponent {
  renderSwatchAttribute(item, index){
    if(index===this.props.attribute){
      return <span key={index} style={{"height":"36px", "width":"36px", "border":"1px solid #5ECE7B", "boxSizing":"border-box"}}>
        <span style={{"backgroundColor":item.value, "marginTop":"1px"}} className="checkout-page-attribute-swatch"></span>
      </span>
    }
    else{
      return <span key={index} style={{"backgroundColor":item.value}} className="checkout-page-attribute-swatch"></span>
    }
  }

  renderTextAttribute(item, index){
    return <span key={index}
      style={index===this.props.attribute?{"backgroundColor": "black", "color": "white"}:{"color":"black"}}
      className="checkout-page-text-attribute"
    >
      {item.value}
    </span>
  }

  render() {
    return (
      <div className="checkout-page-content-attribute">
        <div className='checkout-page-attribute-label'>{this.props.attr.name.toUpperCase()}:</div>
        <div className='checkout-page-attribute-contents'>
          {this.props.attr.items.map((item, k)=>{
            if(this.props.attr.type==="swatch"){
              return this.renderSwatchAttribute(item, k)
            }
            else{
              return this.renderTextAttribute(item, k)
            }
          })}
        </div>
      </div>
    )
  }
}
