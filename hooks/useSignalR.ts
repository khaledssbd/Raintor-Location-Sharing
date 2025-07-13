'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  type HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import type { LocationData } from '@/types/location';

export function useSignalR() {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const connectionRef = useRef<HubConnection | null>(null);

  useEffect(() => {
    // Create SignalR connection
    const newConnection = new HubConnectionBuilder()
      .withUrl(process.env.NEXT_PUBLIC_SIGNALR_URL!)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    connectionRef.current = newConnection;
    setConnection(newConnection);

    // Start connection
    const startConnection = async () => {
      try {
        await newConnection.start();
        setIsConnected(true);
        console.log('SignalR Connected');

        // Listen for location updates
        newConnection.on(
          'ReceiveLatLon',
          (lat: number, lon: number, userName: string) => {
            const locationData: LocationData = {
              lat,
              lon,
              userName,
              timestamp: new Date().toISOString(),
            };

            setLocations(prev => {
              // Update existing user location or add new one
              const existingIndex = prev.findIndex(
                loc => loc.userName === userName
              );
              if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex] = locationData;
                return updated;
              }
              return [...prev, locationData];
            });
          }
        );
      } catch (error) {
        console.error('SignalR Connection Error:', error);
        setIsConnected(false);
      }
    };

    startConnection();

    // Handle connection state changes
    newConnection.onreconnecting(() => {
      setIsConnected(false);
      console.log('SignalR Reconnecting...');
    });

    newConnection.onreconnected(() => {
      setIsConnected(true);
      console.log('SignalR Reconnected');
    });

    newConnection.onclose(() => {
      setIsConnected(false);
      console.log('SignalR Disconnected');
    });

    // Cleanup
    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, []);

  const sendLocation = useCallback(
    async (lat: number, lon: number, userName: string) => {
      if (connection && isConnected) {
        try {
          await connection.invoke('SendLatLon', lat, lon, userName);
          console.log('Location sent:', { lat, lon, userName });
        } catch (error) {
          console.error('Error sending location:', error);
        }
      } else {
        console.warn('SignalR not connected');
      }
    },
    [connection, isConnected]
  );

  return {
    connection,
    isConnected,
    locations,
    sendLocation,
  };
}
