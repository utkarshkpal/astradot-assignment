import * as React from "react";
import { useEffect, useState } from "react";
import getData from "./DataService";

function genQuery(timeRange: string, componentName: string) {
  return `SELECT ${timeRange} WHERE c = ${componentName} AND x = ${Math.random()}`;
}
function Loading() {
  return <h2>Loading</h2>;
}
interface IProps {
  timeRange: string;
}

export default function C1(props: IProps) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const refreshInterval_Secs = 60;
  const query = genQuery(props.timeRange, "c1");

  const fetchData = async () => {
    const data = await getData(query);
    setData(data);
    if (isLoading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intId = setInterval(fetchData, refreshInterval_Secs);
    return () => {
      clearInterval(intId);
    };
  }, []);

  return <>{isLoading ? <Loading /> : data}</>;
}

// function C2(props: IProps) {
// const refreshInterval_Secs = 10;
// const query = genQuery(props.timeRange, "c2");
// const data = //TODO fetch data;

// return <>{data}</>;
// }

// function C3(props: IProps) {
// const refreshInterval_Secs = 15;
// const query = genQuery(props.timeRange, "c3");
// const data = //TODO fetch data;
// return <>{data}</>;
// }
// function C4(props: IProps) {
// const refreshInterval_Secs = 42;
// const query = genQuery(props.timeRange, "c4");
// const data = //TODO fetch data;
// return <>{data}</>;
// }
// function C5(props: IProps) {

// const refreshInterval_Secs = 30;
// const query = genQuery(props.timeRange, "c5");
// const data = //TODO fetch data;
// return <>{data}</>;
// }
