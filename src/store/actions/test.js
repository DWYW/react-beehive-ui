import {INCREASE, DECREASE} from '../actionTypes'

export const increase = function() {
   return {
      type: INCREASE,
      num: 1
   }
}

export const decrease = function() {
   return {
      type: DECREASE,
      num: 2
   }
}

export const increaseAsync = function() {
   return dispatch => {
      setTimeout(()=>{
         dispatch(increase())
      }, 1000)
   }
}