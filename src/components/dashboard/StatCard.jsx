const StatCard = ({ title, value, color = "primary" }) => (
  <div className="stat bg-base-100 shadow rounded-box">
    <div className="stat-title text-xs uppercase">{title}</div>
    <div className={`stat-value text-${color} text-2xl`}>{value}</div>
  </div>
);
export default StatCard;
