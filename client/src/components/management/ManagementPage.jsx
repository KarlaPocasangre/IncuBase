const filteredData = useMemo(() => {
  const searchableKeys =
    config.searchKeys ||
    config.columns
      ?.filter((column) => column.key !== "acciones")
      .map((column) => column.key) ||
    [];

  const search = normalizeText(searchValue.trim());

  const filtered = data.filter((item) => {
    const matchesSearch =
      !search ||
      searchableKeys.some((key) => normalizeText(item[key]).includes(search));

    const matchesFilters = Object.entries(filterValues).every(
      ([key, value]) => {
        if (!value) return true;

        if (typeof value === "object") {
          const hasFrom = Boolean(value.from);
          const hasTo = Boolean(value.to);

          if (!hasFrom && !hasTo) return true;

          const itemDate = new Date(item[key]);
          if (Number.isNaN(itemDate.getTime())) return false;

          const fromDate = hasFrom ? new Date(`${value.from}T00:00:00`) : null;
          const toDate = hasTo ? new Date(`${value.to}T23:59:59`) : null;

          if (fromDate && itemDate < fromDate) return false;
          if (toDate && itemDate > toDate) return false;

          return true;
        }

        return normalizeText(item[key]).includes(normalizeText(value));
      },
    );

    return matchesSearch && matchesFilters;
  });

  if (!sortConfig?.key) return filtered;

  return [...filtered].sort((a, b) => {
    const aValue = getComparableValue(a[sortConfig.key], sortConfig.type);
    const bValue = getComparableValue(b[sortConfig.key], sortConfig.type);

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }

    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }

    return 0;
  });
}, [
  data,
  searchValue,
  filterValues,
  sortConfig,
  config.searchKeys,
  config.columns,
]);
