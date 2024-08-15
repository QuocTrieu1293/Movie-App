/* eslint-disable react-hooks/exhaustive-deps */
import { GETRequestOption } from "@utils";
import { useEffect, useState } from "react";

export default function useFetch({ url, options = {}, errorMsg = ">>> Error" }) {
  const [data, setData] = useState();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setIsFetching(true);
    fetch(url, { ...GETRequestOption, ...options }).then((res) => {
      if (!res.ok)
        throw new Error(`${errorMsg} with status code ${res.status}`);
      return res.json();
    }).then(res => setData(res)).catch(e => console.error(e)).finally(() => setIsFetching(false));
  }, [url, JSON.stringify(options), errorMsg]);

  return { data, isFetching };
}