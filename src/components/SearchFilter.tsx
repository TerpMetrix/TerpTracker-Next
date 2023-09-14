import { useState } from "react";

type StrainFilterProps = {
  onFilterChange: (filter: {
    terptags: string | null;
    productType: string | null;
    sortBy: string | null;
    order: string;
  }) => void;
};

export default function StrainFilter({ onFilterChange }: StrainFilterProps) {
  const [selectedTerptags, setTerptags] = useState<string | null>(null);
  const [selectedProductType, setProductType] = useState<string | null>(null);
  const [selectedSortBy, setSortBy] = useState<string | null>(null);
  const [selectedOrder, setOrder] = useState<string>("asc");

  const handleFilterChange = () => {
    onFilterChange({
      terptags: selectedTerptags,
      productType: selectedProductType,
      sortBy: selectedSortBy,
      order: selectedOrder,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <select onChange={(e) => setTerptags(e.target.value)}>
        {/* Add your terptags options here */}
      </select>
      <select onChange={(e) => setProductType(e.target.value)}>
        <option value="flower">Flower</option>
        <option value="hash">Hash</option>
      </select>
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="upvotes">Upvotes</option>
        <option value="comments">Comments</option>
        <option value="age">Age</option>
      </select>
      <select onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
}
