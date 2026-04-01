import { useState } from 'react';
import { Globe, Clock, Eye, Zap, Check } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { getTranslation } from '@/lib/translations';
import { getTimezones, getTimezoneOffset } from '@/lib/timezoneUtils';

export default function Settings() {
  const settings = useSettings();
  const [showSaved, setShowSaved] = useState(false);
  const [tempSettings, setTempSettings] = useState({
    language: settings.language,
    timezone: settings.timezone,
    fontSize: settings.fontSize,
    highContrast: settings.highContrast,
    apiEndpoint: settings.apiEndpoint,
  });

  const t = (key: string) => getTranslation(tempSettings.language, key);

  const handleSave = () => {
    settings.setLanguage(tempSettings.language as 'en' | 'sw' | 'es');
    settings.setTimezone(tempSettings.timezone);
    settings.setFontSize(tempSettings.fontSize as 'small' | 'normal' | 'large');
    settings.setHighContrast(tempSettings.highContrast);
    settings.setApiEndpoint(tempSettings.apiEndpoint as 'production' | 'test');
    
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-poppins font-bold text-foreground mb-1">{t('settingsTitle')}</h2>
        <p className="text-sm text-muted-foreground">{t('settingsDesc')}</p>
      </div>

      {/* Save Feedback */}
      {showSaved && (
        <div className="bg-metric-up/10 border border-metric-up/30 rounded-xl p-4 flex items-center gap-3 animate-slide-in">
          <Check className="w-5 h-5 text-metric-up" />
          <span className="text-sm font-semibold text-metric-up">{t('saved')}</span>
        </div>
      )}

      {/* Language Settings */}
      <section className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-md hover:shadow-lg transition-all">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-poppins font-bold text-foreground">{t('languageSection')}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t('languageDesc')}</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { value: 'en' as const, label: t('english') },
            { value: 'sw' as const, label: t('swahili') },
            { value: 'es' as const, label: t('spanish') },
          ].map((lang) => (
            <label key={lang.value} className="flex items-center gap-3 p-4 rounded-lg border border-border/50 cursor-pointer hover:bg-muted/30 transition-colors group">
              <input
                type="radio"
                name="language"
                value={lang.value}
                checked={tempSettings.language === lang.value}
                onChange={(e) => setTempSettings({ ...tempSettings, language: e.target.value as any })}
                className="w-4 h-4 accent-primary"
              />
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">{lang.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Timezone Settings */}
      <section className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-md hover:shadow-lg transition-all">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-chart-diesel/20 to-chart-diesel/10 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-chart-diesel" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-poppins font-bold text-foreground">{t('timezoneSection')}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t('timezoneDesc')}</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-semibold text-foreground mb-2 block">{t('currentTimezone')}</span>
            <select
              value={tempSettings.timezone}
              onChange={(e) => setTempSettings({ ...tempSettings, timezone: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {getTimezones().map((tz) => (
                <option key={tz} value={tz}>
                  {tz} ({getTimezoneOffset(tz)})
                </option>
              ))}
            </select>
          </label>
          <div className="p-3 bg-muted/50 rounded-lg border border-border/30">
            <p className="text-xs text-muted-foreground">
              <strong>Current:</strong> {tempSettings.timezone}
            </p>
          </div>
        </div>
      </section>

      {/* Accessibility Settings */}
      <section className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-md hover:shadow-lg transition-all">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-chart-warning/20 to-chart-warning/10 flex items-center justify-center flex-shrink-0">
            <Eye className="w-5 h-5 text-chart-warning" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-poppins font-bold text-foreground">{t('accessibilitySection')}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t('accessibilityDesc')}</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Font Size */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">{t('fontSize')}</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'small' as const, label: t('fontSizeSmall'), size: 'text-sm' },
                { value: 'normal' as const, label: t('fontSizeNormal'), size: 'text-base' },
                { value: 'large' as const, label: t('fontSizeLarge'), size: 'text-lg' },
              ].map((size) => (
                <button
                  key={size.value}
                  onClick={() => setTempSettings({ ...tempSettings, fontSize: size.value })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    tempSettings.fontSize === size.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className={`font-semibold text-foreground ${size.size}`}>{size.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div>
              <div className="font-semibold text-foreground">{t('highContrast')}</div>
              <p className="text-xs text-muted-foreground mt-1">{t('highContrastDesc')}</p>
            </div>
            <button
              onClick={() => setTempSettings({ ...tempSettings, highContrast: !tempSettings.highContrast })}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                tempSettings.highContrast ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  tempSettings.highContrast ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* API Settings */}
      <section className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-md hover:shadow-lg transition-all">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-poppins font-bold text-foreground">{t('apiSection')}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t('apiDesc')}</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { value: 'production' as const, label: t('production'), desc: t('productionDesc') },
            { value: 'test' as const, label: t('test'), desc: t('testDesc') },
          ].map((endpoint) => (
            <label key={endpoint.value} className="flex items-start gap-3 p-4 rounded-lg border border-border/50 cursor-pointer hover:bg-muted/30 transition-colors">
              <input
                type="radio"
                name="api"
                value={endpoint.value}
                checked={tempSettings.apiEndpoint === endpoint.value}
                onChange={(e) => setTempSettings({ ...tempSettings, apiEndpoint: e.target.value as any })}
                className="w-4 h-4 accent-primary mt-1 flex-shrink-0"
              />
              <div className="flex-1">
                <div className="font-medium text-foreground">{endpoint.label}</div>
                <p className="text-xs text-muted-foreground mt-0.5">{endpoint.desc}</p>
              </div>
              {tempSettings.apiEndpoint === endpoint.value && (
                <div className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">Active</div>
              )}
            </label>
          ))}
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end pt-4 border-t border-border/50">
        <button
          onClick={() => setTempSettings({ language: settings.language, timezone: settings.timezone, fontSize: settings.fontSize, highContrast: settings.highContrast, apiEndpoint: settings.apiEndpoint })}
          className="px-6 py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-muted/50 transition-colors"
        >
          {t('cancel')}
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-medium hover:shadow-lg transition-all"
        >
          {t('save')}
        </button>
      </div>

      {/* Footer spacer */}
      <div className="h-4" />
    </div>
  );
}
