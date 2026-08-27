import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18n immediately with empty resources so React can mount,
// then load translations dynamically to keep them off the critical path.
i18n
    .use(initReactI18next)
    .init({
        resources: {},
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

// Lazy-load translations after initial paint (removes 33KB from critical bundle)
import('./locales/en.json').then((enTranslation) => {
    i18n.addResourceBundle('en', 'translation', enTranslation.default?.translation || enTranslation.default || enTranslation, true, true);
});

export default i18n;

