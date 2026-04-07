export const LANGUAGE_MODES = {
  ENG: 'eng',
  BUR: 'bur',
};

export const NAME_PARTITION_CHAR = '|';

export function splitBilingualName(rawName = '') {
  const normalized = String(rawName || '').trim();

  if (!normalized) {
    return {
      englishName: '',
      burmeseName: '',
    };
  }

  const partitionIndex = normalized.indexOf(NAME_PARTITION_CHAR);

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
