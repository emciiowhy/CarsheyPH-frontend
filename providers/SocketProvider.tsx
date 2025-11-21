"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinVehicle: (vehicleId: string) => void;
  leaveVehicle: (vehicleId: string) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  joinVehicle: () => {},
  leaveVehicle: () => {},
});

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const { userId } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (socketRef.current) return; // <-- Prevent duplicate connections

    const socketUrl =
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

    const socketConnection = io(socketUrl, {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socketConnection;

    // CONNECTION STATUS
    socketConnection.on("connect", () => {
      console.log("Socket connected:", socketConnection.id);
      setIsConnected(true);

      if (userId) {
        socketConnection.emit("join-user", userId);
      }
    });

    socketConnection.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    // INVENTORY UPDATES
    socketConnection.on("inventory-update", (data) => {
      console.log("Inventory update:", data);

      if (data.type === "NEW_VEHICLE") {
        toast("New Vehicle Available!", {
          description: `${data.vehicle.brand} ${data.vehicle.model} is now available.`,
        });
      } else if (data.type === "VEHICLE_UPDATED") {
        window.dispatchEvent(
          new CustomEvent("vehicle-updated", { detail: data })
        );
      } else if (data.type === "LOW_STOCK") {
        toast("Low Stock Alert", {
          description: `Only ${data.stockCount} units left!`,
        });
      }
    });

    // USER NOTIFICATIONS
    socketConnection.on("notification", (notification) => {
      console.log("Notification received:", notification);

      toast(notification.title, {
        description: notification.message,
      });

      window.dispatchEvent(
        new CustomEvent("new-notification", { detail: notification })
      );
    });

    return () => {
      socketConnection.disconnect();
      socketRef.current = null;
    };
  }, []); // <-- Runs only ONCE

  // Emit user join ONLY when userId changes
  useEffect(() => {
    if (socketRef.current && userId) {
      socketRef.current.emit("join-user", userId);
    }
  }, [userId]);

  // ROOM JOIN/LEAVE
  const joinVehicle = (vehicleId: string) => {
    socketRef.current?.emit("join-vehicle", vehicleId);
  };

  const leaveVehicle = (vehicleId: string) => {
    socketRef.current?.emit("leave-vehicle", vehicleId);
  };

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
        joinVehicle,
        leaveVehicle,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
