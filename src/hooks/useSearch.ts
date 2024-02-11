import { useEffect, useState } from "react";

const useSearch = <T>(
  defaultItems: T[] | undefined,
  funcFilter: (data: T[], searchParam: string) => T[]
) => {
  const [filteredItems, setFilteredItems] = useState(defaultItems);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (!defaultItems) return;
    const filtered = funcFilter(defaultItems, searchTerm);
    setFilteredItems(filtered);
  }, [defaultItems, funcFilter, searchTerm]);

  return { filteredItems, setSearchTerm };
};

export default useSearch;
