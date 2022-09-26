import React, { PureComponent } from 'react'
import "./CheckoutPhoto.css"

import arrow from "../../../SVG/arrow_horizontal.svg"

export default class CheckoutPhoto extends PureComponent {
    constructor(props){
        super(props)
        this.state={
            currentImage: 0
        }
    }

    changeImage(turn){
        const gallery = this.props.gallery
        let currentImage = this.state.currentImage
        if(turn){
            currentImage += 1
            if(currentImage >= gallery.length){currentImage = 0}
        }
        else{
            currentImage -= 1
            if(currentImage < 0){currentImage = gallery.length-1}
        }
        this.setState({currentImage})
    }

    render() {
        const gallery = this.props.gallery

        return (
            <div className='checkout-page-product-image' style={{"backgroundImage":`url(${gallery[this.state.currentImage]})`}}>
                {gallery.length>1
                    ?<div className='checkout-page-photo-button previous-button' onClick={()=>{this.changeImage(false)}}><div style={{"background":`url(${arrow})`}}></div></div>
                :false}
                {gallery.length>1
                    ?<div className='checkout-page-photo-button next-button' onClick={()=>{this.changeImage(true)}}><div style={{"background":`url(${arrow})`}}></div></div>
                :false}
                </div>
        )
    }
}
