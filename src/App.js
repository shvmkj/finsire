import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Table from "./Components/TableComponent/table";
import { fetchData } from "./services";

const initialDataPoints = {
  mean: 10,
  median: 0,
  mode: 0,
  stdDev: 0,
};
function sqrtSearch(low, high, N) {
  if (low <= high) {
    let mid = (low + high) / 2;
    if (mid * mid <= N && (mid + 1) * (mid + 1) > N) {
      return mid;
    } else if (mid * mid < N) {
      return sqrtSearch(mid + 1, high, N);
    } else {
      return sqrtSearch(low, mid - 1, N);
    }
  }
  return low;
}
function App() {
  const [state, setState] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [dataPoints, setDataPoints] = useState(initialDataPoints);
  const fetchDataFunc = useCallback(() => {
    fetchData()
      .then(
        (resolved) => {
          const { data } = resolved;
          setState(data);
          findAndSetDataPoins(data);
        },
        (reject) => {
          console.error(JSON.stringify(reject));
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const findAndSetDataPoins = (data) => {
    let maxVal = 0,
      lowVal = 1e19;
    const sum = data.reduce((acc, current) => {
      if (current > maxVal) maxVal = current;
      if (lowVal > current) lowVal = current;
      return acc + current;
    }, 0);
    const sortedData = data.sort();
    let median = null;
    const mean = sum / 2;
    const stdDev = data.reduce((acc, current) => {
      const currentDiff = current - mean;
      return acc + currentDiff * currentDiff;
    }, 0);
    median = sortedData[sortedData.length >> 1];
    if (sortedData.length % 2 === 0) {
      median += sortedData[(sortedData.length >> 1) - 1];
      median = median / 2;
    }
    const L = lowVal,
      h = maxVal,
      fm = sortedData.length,
      f1 = 0,
      f2 = 0;
    const intermediateStdDev = stdDev / data.length;
    console.log({ L, h }, "sol");
    setDataPoints({
      ...dataPoints,
      mean,
      median,
      stdDev: sqrtSearch(0, intermediateStdDev, intermediateStdDev),
      mode: L + h / 2,
    });
  };
  useEffect(() => {
    fetchDataFunc();
  }, [fetchDataFunc]);
  return (
    <div className="App">
      <div className="input__container">
        <label htmlFor="input">Input Data </label>
        <input
          id="input"
          className="input"
          type="number"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          value={inputValue}
        ></input>
        <div className="btn-container">
          <button onClick={fetchDataFunc}> Reload</button>
          <button
            onClick={() => {
              const newData = [...state, parseInt(inputValue)];
              setState(newData);
              findAndSetDataPoins(newData);
              setInputValue("");
            }}
            disabled={!inputValue}
          >
            {" "}
            Add
          </button>
        </div>
      </div>
      data : {JSON.stringify(state)}
      <Table {...dataPoints} />
    </div>
  );
}

export default App;
