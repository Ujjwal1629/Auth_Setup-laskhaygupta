import "./Dashboard.css";
import React from "react";

export default function Dashboard() {
  // Example data
  const data = [
    { id: 1, name: "Rakesh", dateCreated: "2/04/2023", status: "Active" },
    { id: 1, name: "Manish", dateCreated: "2/04/2023", status: "Inactive" },
    { id: 1, name: "Rohit", dateCreated: "2/04/2023", status: "Active" },
    { id: 1, name: "Saurav", dateCreated: "2/04/2023", status: "Inactive" },
    { id: 1, name: "Prince", dateCreated: "2/04/2023", status: "Inactive" },
    // Add more data as needed
  ];
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Date created</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.dateCreated}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
