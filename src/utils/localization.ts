export const getLocalizedValue = (value: any, preferredLang: string = 'en'): string => {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return '';

  if (typeof value === 'object') {
    if (value[preferredLang]) return String(value[preferredLang]);

    const commonLangs = ['en', 'in', 'ph'];
    for (const lang of commonLangs) {
      if (value[lang]) return String(value[lang]);
    }

    const keys = Object.keys(value);
    if (keys.length > 0) return String(value[keys[0]]);
  }

  return String(value);
};
