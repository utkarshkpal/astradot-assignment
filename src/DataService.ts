import axios from "axios";

const DEV_SVR = "https://dev.dummy-url.com";
const PROD_SVR = "https://prod.dummy-url.com";
const METRIC_ENDPOINT = "/metrics";

const API_ENDPOINT: string =
  process.env.NODE_ENV === "development" ? DEV_SVR : PROD_SVR;

export default async function getData(query: string = "") {
  const url: string = `${API_ENDPOINT}/${METRIC_ENDPOINT}`;
  try {
    const { data } = await axios.post(url, { query });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
