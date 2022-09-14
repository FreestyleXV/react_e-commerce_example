export const sortCheckout = (checkout) => {
    let sortedCheckout = []
    checkout.forEach(product => {
        let duplicateIndex = sortedCheckout.findIndex(duplicate=>{
            if(duplicate.data.id === product.id){
                for(let i=0; i<duplicate.data.attributes.length; i++){
                    if(duplicate.data.attributes[i] !== product.attributes[i]){
                        return false
                    }
                }
                return true
            }
            return false
        })
        if(duplicateIndex!==-1){
            sortedCheckout[duplicateIndex].count += 1
        }
        else{
            sortedCheckout.push({data:product, count:1})
        }
    })
    return sortedCheckout
}