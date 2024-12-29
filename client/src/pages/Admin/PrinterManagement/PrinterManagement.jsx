import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PrinterManagement.module.css";

const PrinterManagement = () => {
  const [printers, setPrinters] = useState([]);
  const [state, setState] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newPrinter, setNewPrinter] = useState({
    brand: "",
    model: "",
    description: "",
    campus_name: "",
    building_name: "",
    room_number: "",
    status: "enabled",
  });
  const [editingPrinter, setEditingPrinter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchPrinters = async () => {
    try {
      const response = await axios.get("http://localhost:5000/printers");
      setPrinters(response.data);
    } catch (error) {
      console.error("Error fetching printers:", error);
    }
  };
  // Fetch all printers
  useEffect(() => {
   

    fetchPrinters();
  }, []);

  // Add a new printer
  const handleAdd = async () => {
    if (
      newPrinter.brand &&
      newPrinter.model &&
      newPrinter.description &&
      newPrinter.campus_name &&
      newPrinter.building_name &&
      newPrinter.room_number &&
      newPrinter.status
    ) {
      try {
        const response = await axios.post("http://localhost:5000/printers", newPrinter);
        setPrinters([...printers, response.data]);
        fetchPrinters(); 
        setNewPrinter({
          brand: "",
          model: "",
          description: "",
          campus_name: "",
          building_name: "",
          room_number: "",
          status: "enabled",
        });
        setIsAdding(false);
      } catch (error) {
        console.error("Error adding printer:", error);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  // Edit a printer
  const handleSave = async () => {
    try {
      console.log(editingPrinter)
      const response = await axios.put(
        `http://localhost:5000/printers/${editingPrinter.printer_id}`,
        editingPrinter
      );
      setPrinters((prevPrinters) =>
        prevPrinters.map((printer) =>
          printer.printer_id === editingPrinter.printer_id ? response.data : printer
        )
      );
      fetchPrinters(); 
      setEditingPrinter(null);
    } catch (error) {
      console.error("Error editing printer:", error);
    }
  };

  // Delete a printer
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/printers/${id}`);
      setPrinters((prevPrinters) => prevPrinters.filter((printer) => printer.printer_id !== id));
    } catch (error) {
      console.error("Error deleting printer:", error);
    }
  };

  // Handle input changes for add/edit
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isAdding) {
      setNewPrinter((prevPrinter) => ({ ...prevPrinter, [name]: value }));
    } else {
      setEditingPrinter((prevPrinter) => ({ ...prevPrinter, [name]: value }));
    }
  };

  // Filter printers by search term and status
  const filteredPrinters = printers.filter(
    (printer) =>
      printer && // Đảm bảo printer không phải null hoặc undefined
      (printer.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        printer.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        printer.campus_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        printer.building_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        printer.room_number?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (state === "" || printer.status === state)
  );
  


  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.history}>
          <div className={styles.bar}>
            <div>
              <input
                type="text"
                placeholder="Search by brand, model, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <ul>
                <li onClick={() => setState("")}>Tất cả</li>
                <li onClick={() => setState("enabled")}>Hoạt động</li>
                <li onClick={() => setState("disabled")}>Không hoạt động</li>
              </ul>
            </div>
            <button onClick={() => setIsAdding(true)} style={{ color: "#000" }}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className={styles.content}>
            <table className={styles.orderTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Description</th>
                  <th>Campus</th>
                  <th>Building</th>
                  <th>Room</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isAdding && (
                  <tr>
                    <td colSpan={9}>
                      <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={newPrinter.brand}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="model"
                        placeholder="Model"
                        value={newPrinter.model}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={newPrinter.description}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="campus_name"
                        placeholder="Campus"
                        value={newPrinter.campus_name}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="building_name"
                        placeholder="Building"
                        value={newPrinter.building_name}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="room_number"
                        placeholder="Room"
                        value={newPrinter.room_number}
                        onChange={handleChange}
                      />
                      <select name="status" value={newPrinter.status} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                      </select>
                      <button onClick={handleAdd} className={styles.save}>
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsAdding(false);
                          setNewPrinter({
                            brand: "",
                            model: "",
                            description: "",
                            campus_name: "",
                            building_name: "",
                            room_number: "",
                            status: "enabled",
                          });
                        }}
                        className={styles.remove}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                )}
                {filteredPrinters.length > 0 ? (filteredPrinters.map((printer) => (
                  <tr key={printer.printer_id}>
                    {editingPrinter?.printer_id === printer.printer_id ? (
                      <>
                        <td>{printer.printer_id}</td>
                        <td>
                          <input type="text" name="brand" value={editingPrinter.brand} onChange={handleChange} />
                        </td>
                        <td>
                          <input type="text" name="model" value={editingPrinter.model} onChange={handleChange} />
                        </td>
                        <td>
                          <input type="text" name="description" value={editingPrinter.description} onChange={handleChange} />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="campus_name"
                            value={editingPrinter.campus_name}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="building_name"
                            value={editingPrinter.building_name}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="room_number"
                            value={editingPrinter.room_number}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <select
                            name="status"
                            value={editingPrinter.status}
                            onChange={handleChange}
                          >
                            <option value="enabled">Enabled</option>
                            <option value="disabled">Disabled</option>
                          </select>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{printer.printer_id}</td>
                        <td>{printer.brand}</td>
                        <td>{printer.model}</td>
                        <td>{printer.description}</td>
                        <td>{printer.campus_name}</td>
                        <td>{printer.building_name}</td>
                        <td>{printer.room_number}</td>
                        <td>{printer.status}</td>
                      </>
                    )}
                    <td>
                      {editingPrinter?.printer_id === printer.printer_id ? (
                        <button className={styles.save} onClick={handleSave}>
                          Save
                        </button>
                      ) : (
                        <button
                          className={styles.edit}
                          onClick={() => setEditingPrinter(printer)}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className={styles.remove}
                        onClick={() => handleRemove(printer.printer_id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center" }}>
                      No printers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrinterManagement;
