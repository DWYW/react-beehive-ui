/**
 * @target: target Object
 * @source: source Object
 */
export const assignOwnProperty = function(target, source){
   for(let key in source) {

      if(target.hasOwnProperty(key)) {
         target[key] = source[key];
      }
   }

   return target;
}