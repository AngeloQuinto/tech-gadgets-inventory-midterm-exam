import { useState } from "react";
import "./App.css";

function App() {
  const [deviceName, setDeviceName] = useState("");
  const [deviceCateg, setDeviceCateg] = useState("");
  const [manuf, setManuf] = useState("");
  const [health, setHealth] = useState("");

  return (
    <>
      <h1>Tech Gadget & Inventory Hub</h1>

      <form>
        <div>
          <label htmlFor="deviceName">Gadget Name</label>
          <input
            type="text"
            id="deviceName"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="deviceCateg">Category</label>
          <select
            id="deviceCateg"
            value={deviceCateg}
            onChange={(e) => setDeviceCateg(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Smartphone">Select a category</option>
            <option value="Laptop">Laptop</option>
            <option value="Wearable">Wearable</option>
            <option value="Audio">Audio</option>
          </select>

          <div>
            <label htmlFor="manuf">Manufacture</label>
            <input
              id="manuf"
              type="text"
              value={manuf}
              onChange={(e) => setManuf(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="health">Health Rating</label>
            <input
              id="health"
              type="number"
              value={health}
              onChange={(e) => setHealth(e.target.value)}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default App;
