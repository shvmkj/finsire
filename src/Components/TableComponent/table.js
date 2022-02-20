import styles from "./table.module.css";
const Table = (props) => {
  const { mean, median, mode, stdDev } = props;
  return (
    <div className={styles.root}>
      <table>
        <tr>
          <th>Mean</th>
          <td>{mean}</td>
        </tr>
        <tr>
          <th>Median</th>
          <td>{median}</td>
        </tr>
        <tr>
          <th>Std Dev</th>
          <td>{stdDev}</td>
        </tr>
        <tr className={styles["last-row"]}>
          <th>Mode</th>
          <td>{mode}</td>
        </tr>
      </table>
    </div>
  );
};
Table.defaultProps = {
  mean: 0,
  median: 0,
  mode: 0,
  stdDev: 0,
};
export default Table;
