import { useState } from "react";
import { Cascader, DatePicker } from "antd";
import type { CascaderProps } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const DashboardFilters: React.FC<{
  onFilterChange: (filters: {
    dateRange: [string, string];
    store: string | null;
    shelf: string | null;
  }) => void;
}> = ({ onFilterChange }) => {
  const [dateRange, setDateRange] = useState<[string, string]>([
    dayjs().startOf("month").format("YYYY/MM/DD"),
    dayjs().endOf("month").format("YYYY/MM/DD"),
  ]);
  const [store, setStore] = useState<string | null>(null);
  const [shelf, setShelf] = useState<string | null>(null);

  const storeOptions: CascaderProps["options"] = [
    {
      value: "store1",
      label: "Store 1",
    },
    {
      value: "store2",
      label: "Store 2",
    },
  ];

  const shelfOptions: CascaderProps["options"] = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "beverages",
      label: "Beverages",
    },
    {
      value: "freshfood",
      label: "Fresh food",
    },
    {
      value: "household",
      label: "Household goods",
    },
    {
      value: "packaged",
      label: "Packaged Food",
    },
    {
      value: "personal",
      label: "Personal care",
    },
  ];

  return (
    <div className="flex gap-6 items-center pb-5">
      {/* Date filter */}
      <div className="flex flex-col">
        <span className="text-sm font-medium mb-1">Date range</span>
        <RangePicker
            defaultValue={[dayjs(dateRange[0]), dayjs(dateRange[1])]}
            format="YYYY/MM/DD"
            onChange={(val) => {
            if (val && val[0] && val[1]) {
                const newRange: [string, string] = [
                val[0].format("YYYY/MM/DD")!,
                val[1].format("YYYY/MM/DD")!,
                ];
                setDateRange(newRange);
                onFilterChange({ dateRange: newRange, store, shelf });
            }
            }}
        />
      </div>

      {/* Store filter */}
      <div className="flex flex-col">
        <span className="text-sm font-medium mb-1">Store</span>
        <Cascader
            options={storeOptions}
            placeholder="Select store"
            onChange={(val) => {
            const newStore =  val.length ? String(val[0]) : null;
            setStore(newStore);
            onFilterChange({ dateRange, store: newStore, shelf });
            }}
        />
      </div>

      {/* Shelf filter */}
      <div className="flex flex-col">
        <span className="text-sm font-medium mb-1">Shelf area</span>
        <Cascader
        options={shelfOptions}
        placeholder="Select shelf area"
        onChange={(val) => {
          const newShelf = val.length ? String(val[0]) : null;
          setShelf(newShelf);
          onFilterChange({ dateRange, store, shelf: newShelf });
        }}
      />
      </div>
    </div>
  );
};

export default DashboardFilters;
