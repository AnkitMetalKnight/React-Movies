import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

function OnlineUsers() {
  const [count, setCount] = useState(0);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:4000", {
      transports: ["websocket"],
    });

    socketRef.current.on("onlineUsers", (num) => setCount(num));

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "rgba(0, 0, 0, 0.65)",
        padding: "8px 14px",
        borderRadius: "10px",
        fontFamily: "Poppins, sans-serif",
        color: "white",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        border: "1px solid rgba(255, 0, 90, 0.35)",
        boxShadow: "0 0 10px rgba(255, 0, 90, 0.25)",
        zIndex: 9999,
      }}
    >
      👥 <b>{count}</b>
      <span
        style={{
          height: "8px",
          width: "8px",
          background: "#00ff88",
          borderRadius: "50%",
          boxShadow: "0 0 6px #00ff88",
          animation: "pulse 1.4s infinite ease-in-out",
        }}
      ></span>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default OnlineUsers;
