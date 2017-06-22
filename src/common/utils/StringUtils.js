/**
 * Remove string blanks
 * @string: source string
 * @isGlobal: Do you want to remove all the blanks?
 *            The value is true or false.
 */
export const removeStringBlanks = function(string, isGlobal) {
   let _global = isGlobal !== undefined ? isGlobal : false;
   let res = string.replace(/(^\s+)|(\s+$)/g,"");

   if(_global === true) {
      res = string.replace(/\s+/g,"");
   }

   return res;
}
