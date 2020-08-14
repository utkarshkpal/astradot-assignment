import * as React from "react";
import { useEffect, useState } from "react";
import getData from "./DataService";

function genQuery(timeRange: string, componentName: string): string {
  return `SELECT ${timeRange} WHERE c = ${componentName} AND x = ${Math.random()}`;
}
function Loading() {
  return <h2>Loading...</h2>;
}
interface IProps {
  timeRange: string;
}

function useCustomFetch(refreshInterval_Secs: number, query: string) {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const data = await getData(query);
    setData(data);
  };

  useEffect(() => {
    fetchData();
    const intId = setInterval(fetchData, refreshInterval_Secs * 1000);
    return () => {
      clearInterval(intId);
    };
  }, []);

  return data;
}

function C1(props: IProps) {
  const refreshInterval_Secs = 60;
  const query = genQuery(props.timeRange, "c1");

  const data = useCustomFetch(refreshInterval_Secs, query);

  return <>{data === null ? <Loading /> : data}</>;
}

function C2(props: IProps) {
  const refreshInterval_Secs = 10;
  const query = genQuery(props.timeRange, "c2");
  const data = useCustomFetch(refreshInterval_Secs, query);

  return <>{data === null ? <Loading /> : data}</>;
}

export default function Home() {
  return (
    <>
      <C1 timeRange="time_range" />
      <C2 timeRange="time_range" />
    </>
  );
}

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
