export default function TransactionTagFields({
  styles,
  layer1Key,
  layer2Key,
  layer3Key,
  layer1Options,
  layer2Options,
  layer3Options,
  onLayer1Change,
  onLayer2Change,
  onLayer3Change,
}) {
  return (
    <div className={styles.tagFields}>
      <select
        className={styles.tagSelect}
        value={layer1Key}
        onChange={(e) => onLayer1Change(e.target.value)}
        required
      >
        <option value="">-</option>
        {layer1Options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className={styles.tagSelect}
        value={layer2Key}
        onChange={(e) => onLayer2Change(e.target.value)}
        disabled={!layer1Key}
      >
        <option value="">-</option>
        {layer2Options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className={styles.tagSelect}
        value={layer3Key}
        onChange={(e) => onLayer3Change(e.target.value)}
        disabled={!layer2Key}
      >
        <option value="">-</option>
        {layer3Options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}