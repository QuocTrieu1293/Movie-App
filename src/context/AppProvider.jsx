import useFetch from "@hooks/useFetch";
import { createContext, useContext } from "react";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const { data: languages = [] } = useFetch({
    url: "https://api.themoviedb.org/3/configuration/languages",
    errorMsg: ">>> Error fetching languages in AppProvider failed",
  });

  // console.log("from AppProvider", { languages });

  return (
    <AppContext.Provider value={{ languages }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
