
import React, { useEffect, useRef } from 'react';
import Navigation from './navigatios/Navigation';
import { LogBox } from 'react-native'
import { startNotifications } from './utils/actions';


LogBox.ignoreAllLogs()
//LogBox.ignoreLogs(['Setting a timer'])

export default function App() {
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    startNotifications(notificationListener, responseListener)
  }, [])
 
  return (
    <Navigation />
  );
}

