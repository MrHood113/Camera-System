const mockKpi = { title: "Total number of shelves tracked", value: "10" };

const TotalShelfCard: React.FC = () => {
  return (
    <div className="border-1 border-gray-200 rounded-xl p-4 shadow-sm">
      <span className="text-xs font-bold text-zinc-500">{mockKpi.title}</span>
      <p className="text-3xl font-bold pt-3">{mockKpi.value}</p>
    </div>
  );
};

export default TotalShelfCard;
