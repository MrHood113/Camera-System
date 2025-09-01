import { Table } from "antd";

interface ShelfData {
  key: string;
  shelf: string;
  osa: number;
  shortage: number;
  recovery: number;
  recoveryq: number;
  recoverya: number;
  recoveryz: number; 
}

const data: ShelfData[] = [
  { key: "1", shelf: "Shelf A", osa: 75, shortage: 20, recovery: 60, recoveryq: 90, recoverya: 90, recoveryz: 90 },
  { key: "2", shelf: "Shelf B", osa: 60, shortage: 10, recovery: 80, recoveryq: 90, recoverya: 90, recoveryz: 90 },
  { key: "3", shelf: "Shelf C", osa: 55, shortage: 30, recovery: 70, recoveryq: 90, recoverya: 90, recoveryz: 90 },
  { key: "4", shelf: "Shelf D", osa: 80, shortage: 40, recovery: 90, recoveryq: 90, recoverya: 90, recoveryz: 90 },
  { key: "5", shelf: "Shelf C", osa: 55, shortage: 30, recovery: 70, recoveryq: 90, recoverya: 90, recoveryz: 90 },
  { key: "6", shelf: "Shelf D", osa: 80, shortage: 40, recovery: 90, recoveryq: 90, recoverya: 90, recoveryz: 90 },
];

const ShelfTable: React.FC = () => {
  const columns = [
    { title: "Shelf", dataIndex: "shelf", key: "shelf" },
    { title: "OSA (%)", dataIndex: "osa", key: "osa" },
    { title: "Shortage (%)", dataIndex: "shortage", key: "shortage" },
    { title: "Recovery (%)", dataIndex: "recovery", key: "recovery" },
  ];

  return (
    <div 
    className="border-2 border-gray-300 rounded-xl"
    >
      <Table 
      columns={columns} 
      dataSource={data} 
      pagination={false} 
      scroll={{ x: 1800, y: 200 }}
      />
    </div>
  );
};

export default ShelfTable;
