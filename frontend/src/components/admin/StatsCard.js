const StatsCard = ({ title, value, icon }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{icon}</span>
          <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default StatsCard;