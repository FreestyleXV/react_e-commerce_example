import React, { PureComponent } from 'react'
import "./CheckoutOverlayContentAttribute.css"

export default class CheckoutOverlayContentAttribute extends PureComponent {

  renderSwatchAttribute(item, index){
    if (index === this.props.attribute) {
      return <span key={index} style={{ "height": "24px", "width": "24px", "border": "1px solid #5ECE7B", "boxSizing": "border-box" }}>
        <span style={{ "backgroundColor": item.value, "marginTop": "1px" }} className="attribute-swatch"></span>
      </span>
    }
    return <span key={index} style={{ "backgroundColor": item.value }} className="attribute-swatch"></span>
  }

  renderTextAttribute(item, index){
    return <span key={index}
      style={index === this.props.attribute ? { "backgroundColor": "black", "color": "white" } : { "color": "black" }}
      className="checkout-text-attribute"
    >
      {item.value}
    </span>
  }

  render() {
    return (
      <div className="checkout-content-attribute">
        <div className='attribute-label'>{this.props.attr.name.length > 17 ? this.props.attr.name.slice(0, 14) + "..." : this.props.attr.name}</div>
        <div className='attribute-contents'>
          {this.props.attr.items.map((item, k) => {
            if (this.props.attr.type === "swatch") {
              return this.renderSwatchAttribute(item, k)
            }
            else {
              return this.renderTextAttribute(item, k) 
            }
          })}
        </div>
      </div>
    )
  }
}
