import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementJaLocale from 'element-ui/lib/locale/lang/ja'
import elementKoLocale from 'element-ui/lib/locale/lang/ko'
// import elementEsLocale from 'element-ui/lib/locale/lang/es'
import enLocale from './en'
import zhLocale from './zh'
import jaLocale from './ja'
import koLocale from './ko'
// import esLocale from './es'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
  ,
  ja: {
    ...jaLocale,
    ...elementJaLocale
  },
  ko: {
    ...koLocale,
    ...elementKoLocale
  }
}
export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}
const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(),
  // set locale messages
  messages
})

export default i18n
