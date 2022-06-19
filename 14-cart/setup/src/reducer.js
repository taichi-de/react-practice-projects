const reducer = (state, action) => {
    if(action.type === 'CLEAR_CART') {
        return {...state, cart: []}
    }
    if(action.type === 'REMOVE') {
        return {
            ...state,
            cart:state.cat.filter((cartItem)=> cartItem.id !== action.payload
        )}
    }
    if(action.type === 'INCREASE') {
        let tempCart = state.cart.map((cartItem)=>{
            if(cartItem.id === payload) {
                return {...cartItem, amount: cartItem.amount + 1}
            }
        })
        return {...state,cart:tempCart}
    }
    if(action.type === 'DECREASE') {
        let tempCart = state.cart.map((cartItem)=>{
            if(cartItem.id === payload) {
                return {...cartItem, amount: cartItem.amount - 1}
            }
        }).filter((cartItem) => cartItem.amount !== 0)
        return {...state,cart:tempCart}
    }
    if(action.type === 'GET_TOTALS') {
        const {total,amount} = state.cart.reduce((cartTotal, cartItem)=>{
            const {price, amount} = cartItem;
            const itemTotal = price * amount

            cartTotal.total += itemTotal
            cartTotal.amount += amount
            return cartTotal
        },{
            total:0,
            amount:0
        })
        total = parseFloat(total.toFixed(2))
        return {...state,total,amount}
    }
    return state;
}

export default reducer;