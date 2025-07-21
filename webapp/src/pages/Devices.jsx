import "./Devices.css";
const Devices = ({devices }) => {

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📦 Danh sách thiết bị</h1>
      <div className="product-grid">
        {devices.map((p) => (
          <div className="product-card" key={p.deviceId}>
            <div className="product-info">
              <h3 className="product-name">Tên thiết bị: {p.deviceName}</h3>
              <h3 className="product-name">Mã thiết bị: {p.deviceCode}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Devices;


