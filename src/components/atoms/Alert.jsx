// src/components/atoms/Alert.jsx
import React from "react";

export default function Alert({ type = "info", message }) {
  if (!message) return null;

  const colors = {
    info: "#e3f2fd",
    success: "#e8f5e9",
    warning: "#fff8e1",
    error: "#ffebee",
  };

  const borderColors = {
    info: "#64b5f6",
    success: "#66bb6a",
    warning: "#ffb300",
    error: "#e57373",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        backgroundColor: colors[type],
        border: `1px solid ${borderColors[type]}`,
        borderRadius: "8px",
        padding: "10px 20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        animation: "fadeInOut 2s ease forwards",
      }}
    >
      <strong style={{ color: borderColors[type] }}>{message}</strong>
      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -20px); }
            10% { opacity: 1; transform: translate(-50%, 0); }
            90% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, -20px); }
          }
        `}
      </style>
    </div>
  );
}
