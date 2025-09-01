const mockKpi = { title: "On-time Shelf recovery rate", value: "63%" };

const RecoveryCard: React.FC = () => {
  return (
    <div className="border-1 border-gray-200 rounded-xl p-4 shadow-sm">
      <span className="text-sm font-bold text-zinc-500">{mockKpi.title}</span>
      <p className="text-3xl font-bold pt-3">{mockKpi.value}</p>
    </div>
  );
};

export default RecoveryCard;
