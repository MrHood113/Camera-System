const mockKpi = { title: "Average shelf shortage rate", value: "25%" };

const ShortageCard: React.FC = () => {
  return (
    <div className="border-1 border-gray-200 rounded-xl p-4 shadow-sm">
      <span className="text-sm font-bold text-zinc-500">{mockKpi.title}</span>
      <p className="text-3xl font-bold pt-3">{mockKpi.value}</p>
    </div>
  );
};

export default ShortageCard;
