import { Table } from "antd";

interface ShelfData {
  key: string;
  name: string;
  operatingHour?: number;
  shortageHour?: number;
  children?: ShelfData[];
}

const data: ShelfData[] = [
  {
    key: "store",
    name: "Store",
    children: [
      {
        key: "2025",
        name: "2025",
        children: [
          {
            key: "q2",
            name: "Qtr 2",
            children: [
              {
                key: "april",
                name: "April",
                children: [
                  {
                    key: "bev1",
                    name: "Beverage shelf 1",
                    operatingHour: 8,
                    shortageHour: 0.2,
                  },
                  {
                    key: "canned",
                    name: "Canned goods rack",
                    operatingHour: 8,
                  },
                  {
                    key: "coffee",
                    name: "Coffee shelf",
                    operatingHour: 8,
                    shortageHour: 0.1,
                  },
                  {
                    key: "cosmetic",
                    name: "Cosmetics shelf",
                    operatingHour: 8,
                  },
                  {
                    key: "dairy",
                    name: "Dairy shelf",
                    operatingHour: 8,
                    shortageHour: 0.1,
                  },
                  {
                    key: "detergent",
                    name: "Detergent rack",
                    operatingHour: 8,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const columns = [
  {
    title: "Year",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Shelf operating hour",
    dataIndex: "operatingHour",
    key: "operatingHour",
  },
  {
    title: "Shelf shortage hour",
    dataIndex: "shortageHour",
    key: "shortageHour",
  },
];

const PotentialLossTable: React.FC = () => {
  return (
    <div className="border-2 border-gray-300 rounded-xl">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        scroll={{ x: 600, y: 500 }}
      />
    </div>
  );
};

export default PotentialLossTable;
