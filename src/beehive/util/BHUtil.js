export default class BHUtil {
   /**
   * Combine classnames.
   */
   static combineClassnames() {
      let classnames = []

      for(let key in arguments) {
         if(typeof arguments[key] === 'string') {
            classnames.push(arguments[key]);
         }
         else if(arguments[key] instanceof Array) {
            classnames = classnames.concat(arguments[key]);
         }
         else if(arguments[key] instanceof Object) {
            for (let itemKey in arguments[key]) {
               if(arguments[key][itemKey]) {
                  classnames.push(itemKey);
               }
            }
         }
      }

      return classnames.join(" ");
   }

}