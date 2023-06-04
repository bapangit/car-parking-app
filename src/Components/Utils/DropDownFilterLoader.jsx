import { useState, useEffect } from "react";

const DropDownFilterLoader = ({ delay, minCharsToSearch, call, disableDelay }) => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [changedText, setChangedText] = useState("");

  const useDebounce = (delay, value, setValue, call, minCharsToCall, setDataList, setIsLoading) => {
    useEffect(() => {
      if (delay === 0) {
        setChangedText(value);
      } else {
        const handler = setTimeout(() => {
          setChangedText(value);
        }, delay);
        return () => {
          clearTimeout(handler);
        };
      }
    }, [value]);

    const setData = (data) => {
      if (data.length > 0) {
        setDataList(data);
        if (value.includes("#")) setValue("");
      }
    };

    useEffect(() => {
      if (changedText.length >= minCharsToCall) {
        call(changedText, setData, setIsLoading);
      }
    }, [changedText]);
  };

  useDebounce(delay || 400, searchText, setSearchText, call, minCharsToSearch || 3, setDataList, setIsLoading);
  if (disableDelay) return [isLoading, dataList, (searchTerm) => call(searchTerm || "#ALL", setDataList, setIsLoading)];
  return [searchText, setSearchText, isLoading, dataList, setDataList];
};

export default DropDownFilterLoader;
