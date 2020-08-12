import axios from "axios";

const DEV_SVR = "https://dev.dummy-url.com";
const PROD_SVR = "https://prod.dummy-url.com";

const API_ENDPOINT = process.env.APP_API_HOST;

const METRIC_ENDPOINT = "/metrics";

export default async function getData(query = {}) {
  const url: string = `${API_ENDPOINT}/${METRIC_ENDPOINT}`;

  try {
    const { data } = await axios.post(url, { query });
    return data;
  } catch (error) {
    console.log(error);
  }
}
