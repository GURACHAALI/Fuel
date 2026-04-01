export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    counties: 'Counties',
    insights: 'Consumer Insights',
    trends: 'Trends',
    reports: 'Reports',
    settings: 'Settings',

    // Settings Page
    settingsTitle: 'Settings',
    settingsDesc: 'Customize your Fuel Market Data experience',

    // Language Settings
    languageSection: 'Language',
    languageDesc: 'Choose your preferred language',
    english: 'English',
    swahili: 'Swahili',
    spanish: 'Spanish',

    // Timezone Settings
    timezoneSection: 'Time Zone',
    timezoneDesc: 'Select your local timezone for accurate timestamps',
    currentTimezone: 'Current Timezone',

    // Accessibility Settings
    accessibilitySection: 'Accessibility',
    accessibilityDesc: 'Customize the appearance for better readability',
    fontSize: 'Font Size',
    fontSizeSmall: 'Small',
    fontSizeNormal: 'Normal',
    fontSizeLarge: 'Large',
    highContrast: 'High Contrast Mode',
    highContrastDesc: 'Enable enhanced contrast for better visibility',

    // API Settings
    apiSection: 'API Configuration',
    apiDesc: 'Select which data source to use',
    apiEndpoint: 'API Endpoint',
    production: 'Production',
    test: 'Test (Demo Data)',
    productionDesc: 'Live market data from EPRA',
    testDesc: 'Demo data for testing',

    // Common
    save: 'Save Settings',
    saved: 'Settings saved successfully!',
    cancel: 'Cancel',
  },

  sw: {
    // Navigation
    dashboard: 'Dashibodi',
    counties: 'Kaunti',
    insights: 'Maarifa ya Watumiaji',
    trends: 'Mwelekeo',
    reports: 'Ripoti',
    settings: 'Mipango',

    // Settings Page
    settingsTitle: 'Mipango',
    settingsDesc: 'Kamusanisha uzoefu wako wa Fuel Market Data',

    // Language Settings
    languageSection: 'Lugha',
    languageDesc: 'Chagua lugha yako inayopendekelwa',
    english: 'Kiingereza',
    swahili: 'Kiswahili',
    spanish: 'Kihispania',

    // Timezone Settings
    timezoneSection: 'Sehemu ya Wakati',
    timezoneDesc: 'Chagua sehemu yako ya wakati ya ndani',
    currentTimezone: 'Sehemu ya Wakati Sasa',

    // Accessibility Settings
    accessibilitySection: 'Upatikanaji',
    accessibilityDesc: 'Kamusanisha muonekano kwa usomaji bora',
    fontSize: 'Ukubwa wa Herufi',
    fontSizeSmall: 'Ndogo',
    fontSizeNormal: 'Kawaida',
    fontSizeLarge: 'Kubwa',
    highContrast: 'Hali ya Tofauti Inayotaka',
    highContrastDesc: 'Ruhusu tofauti iliyoboreshwa kwa macho bora',

    // API Settings
    apiSection: 'Usanidi wa API',
    apiDesc: 'Chagua chanzo cha data kutumia',
    apiEndpoint: 'Ncha ya API',
    production: 'Uzalishaji',
    test: 'Jaribio (Data ya Kufikiria)',
    productionDesc: 'Data ya soko inayoishi kutoka EPRA',
    testDesc: 'Data ya kufikiria kwa kujaribu',

    // Common
    save: 'Hifadhi Mipango',
    saved: 'Mipango ilihifadhiwa kwa mafanikio!',
    cancel: 'Ghairi',
  },

  es: {
    // Navigation
    dashboard: 'Panel de Control',
    counties: 'Condados',
    insights: 'Análisis del Consumidor',
    trends: 'Tendencias',
    reports: 'Informes',
    settings: 'Configuración',

    // Settings Page
    settingsTitle: 'Configuración',
    settingsDesc: 'Personaliza tu experiencia de Fuel Market Data',

    // Language Settings
    languageSection: 'Idioma',
    languageDesc: 'Elige tu idioma preferido',
    english: 'Inglés',
    swahili: 'Suajili',
    spanish: 'Español',

    // Timezone Settings
    timezoneSection: 'Zona Horaria',
    timezoneDesc: 'Selecciona tu zona horaria local',
    currentTimezone: 'Zona Horaria Actual',

    // Accessibility Settings
    accessibilitySection: 'Accesibilidad',
    accessibilityDesc: 'Personaliza la apariencia para una mejor legibilidad',
    fontSize: 'Tamaño de Fuente',
    fontSizeSmall: 'Pequeño',
    fontSizeNormal: 'Normal',
    fontSizeLarge: 'Grande',
    highContrast: 'Modo de Alto Contraste',
    highContrastDesc: 'Habilita contraste mejorado para una mejor visibilidad',

    // API Settings
    apiSection: 'Configuración de API',
    apiDesc: 'Selecciona qué fuente de datos usar',
    apiEndpoint: 'Punto Final de API',
    production: 'Producción',
    test: 'Prueba (Datos de Demostración)',
    productionDesc: 'Datos de mercado en vivo de EPRA',
    testDesc: 'Datos de demostración para pruebas',

    // Common
    save: 'Guardar Configuración',
    saved: '¡Configuración guardada exitosamente!',
    cancel: 'Cancelar',
  },
};

export const getTranslation = (language: 'en' | 'sw' | 'es', key: string): string => {
  return translations[language][key as keyof typeof translations['en']] || key;
};
