import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SettingsContextType {
  language: 'en' | 'sw' | 'es';
  timezone: string;
  fontSize: 'small' | 'normal' | 'large';
  highContrast: boolean;
  apiEndpoint: 'production' | 'test';
  setLanguage: (lang: 'en' | 'sw' | 'es') => void;
  setTimezone: (tz: string) => void;
  setFontSize: (size: 'small' | 'normal' | 'large') => void;
  setHighContrast: (enabled: boolean) => void;
  setApiEndpoint: (endpoint: 'production' | 'test') => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<'en' | 'sw' | 'es'>(() => {
    const saved = localStorage.getItem('fuel_language');
    return (saved as 'en' | 'sw' | 'es') || 'en';
  });

  const [timezone, setTimezoneState] = useState<string>(() => {
    const saved = localStorage.getItem('fuel_timezone');
    return saved || Intl.DateTimeFormat().resolvedOptions().timeZone;
  });

  const [fontSize, setFontSizeState] = useState<'small' | 'normal' | 'large'>(() => {
    const saved = localStorage.getItem('fuel_fontSize');
    return (saved as 'small' | 'normal' | 'large') || 'normal';
  });

  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    const saved = localStorage.getItem('fuel_highContrast');
    return saved ? JSON.parse(saved) : false;
  });

  const [apiEndpoint, setApiEndpointState] = useState<'production' | 'test'>(() => {
    const saved = localStorage.getItem('fuel_apiEndpoint');
    return (saved as 'production' | 'test') || 'production';
  });

  // Apply settings to DOM
  useEffect(() => {
    // Apply font size
    const sizeMap = { small: '14px', normal: '16px', large: '18px' };
    document.documentElement.style.fontSize = sizeMap[fontSize];

    // Apply high contrast mode
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [fontSize, highContrast]);

  const setLanguage = (lang: 'en' | 'sw' | 'es') => {
    setLanguageState(lang);
    localStorage.setItem('fuel_language', lang);
  };

  const setTimezone = (tz: string) => {
    setTimezoneState(tz);
    localStorage.setItem('fuel_timezone', tz);
  };

  const setFontSize = (size: 'small' | 'normal' | 'large') => {
    setFontSizeState(size);
    localStorage.setItem('fuel_fontSize', size);
  };

  const setHighContrast = (enabled: boolean) => {
    setHighContrastState(enabled);
    localStorage.setItem('fuel_highContrast', JSON.stringify(enabled));
  };

  const setApiEndpoint = (endpoint: 'production' | 'test') => {
    setApiEndpointState(endpoint);
    localStorage.setItem('fuel_apiEndpoint', endpoint);
  };

  return (
    <SettingsContext.Provider
      value={{
        language,
        timezone,
        fontSize,
        highContrast,
        apiEndpoint,
        setLanguage,
        setTimezone,
        setFontSize,
        setHighContrast,
        setApiEndpoint,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};
