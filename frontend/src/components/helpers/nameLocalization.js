export const LANGUAGE_MODES = {
  ENG: 'eng',
  BUR: 'bur',
};

const UI_TRANSLATIONS = {
  accounting_summary: {
    eng: 'Accounting Summary',
    bur: 'စာရင်းချုပ်',
  },
  total_sales: {
    eng: 'Total Sales',
    bur: 'စုစုပေါင်း ရောင်းရငွေ',
  },
  total_purchases: {
    eng: 'Total Purchases',
    bur: 'စုစုပေါင်း ဝယ်ယူငွေ',
  },
  total_expenses: {
    eng: 'Total Expenses',
    bur: 'စုစုပေါင်း အသုံးစရိတ်',
  },
  total: {
    eng: 'Total',
    bur: 'စုစုပေါင်း',
  },
  flow_in: {
    eng: 'In',
    bur: 'အဝင်',
  },
  flow_out: {
    eng: 'Out',
    bur: 'အထွက်',
  },
  flow: {
    eng: 'Flow',
    bur: 'အဝင်/အထွက်',
  },
};

const NAME_PARTITION_CHARS = ['|', '｜'];

export function getLocalizedUiText(key, languageMode = LANGUAGE_MODES.ENG) {
  const entry = UI_TRANSLATIONS[key];
  if (!entry) return String(key || '');
  return languageMode === LANGUAGE_MODES.BUR ? entry.bur : entry.eng;
}

export function splitBilingualName(rawName = '') {
  const normalized = String(rawName || '').trim();

  if (!normalized) {
    return {
      englishName: '',
      burmeseName: '',
    };
  }

  let partitionIndex = -1;

  for (const separator of NAME_PARTITION_CHARS) {
    const index = normalized.indexOf(separator);
    if (index >= 0 && (partitionIndex < 0 || index < partitionIndex)) {
      partitionIndex = index;
    }
  }

  if (partitionIndex < 0) {
    return {
      englishName: normalized,
      burmeseName: '',
    };
  }

  return {
    englishName: normalized.slice(0, partitionIndex).trim(),
    burmeseName: normalized.slice(partitionIndex + 1).trim(),
  };
}

export function getLocalizedName(row = {}, languageMode = LANGUAGE_MODES.ENG) {
  const { englishName, burmeseName: parsedBurmese } = splitBilingualName(row?.name || '');
  const explicitBurmese = String(row?.burmese_name || '').trim();
  const burmeseName = explicitBurmese || parsedBurmese;

  if (languageMode === LANGUAGE_MODES.BUR) {
    return burmeseName || englishName;
  }

  return englishName || burmeseName;
}
