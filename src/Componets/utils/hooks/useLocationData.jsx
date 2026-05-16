import { useState, useEffect } from "react";

const useLocationData = () => {
  const [locations, setLocations] = useState([]);
  const [regions, setRegions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/data/bddistrictandregion.json")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
        const uniqueRegions = [...new Set(data.map((item) => item.region))];
        setRegions(uniqueRegions);
        setIsLoading(false);
      });
  }, []);

  return { locations, regions, isLoading };
};

export default useLocationData;