import zh from './zh'

const languages = {
   zh
}

const GetLanguage = (key = null) => {
   const language = (navigator.languages && navigator.languages[0]) ||  navigator.language || navigator.userLanguage;
   const i18nKey = language.toLowerCase().split(/[_-]+/)[0];
   return key ? languages[key] : languages[i18nKey];
}

const i18n = {
   language: GetLanguage(),
   $t: function(key, arg = null) {
      let keys = key.toString().split(".");
      let language = this.language;

      for(let i = 0; i < keys.length; i++) {
         language = language[keys[i]];
      }

      if(arg) {
         for(let argKey in arg) {
            const reg = new RegExp(`{${argKey}}`,"g")
            language = language.replace(reg, arg[argKey]);
         }
      }

      return language;
   }
}

export default i18n