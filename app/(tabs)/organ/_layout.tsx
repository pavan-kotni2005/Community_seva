import { StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const RED = "#E53935"; // Main red color
const LIGHT_RED = "#f5aab1ff"; // Optional lighter red for inactive icons

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: RED,
        tabBarInactiveTintColor: LIGHT_RED,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0,
          elevation: 10,
        },
      }}
    >
      {/* ACCEPT BLOOD */}
      <Tabs.Screen
        name="accept"
        options={{
          tabBarLabel: "Accept",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />

      {/* DONATE BLOOD */}
      <Tabs.Screen
        name="donate"
        options={{
          tabBarLabel: "Donate",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "medkit" : "medkit-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />

      {/* DONORS LIST */}
      <Tabs.Screen
        name="donorsList"
        options={{
          tabBarLabel: "Donors",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
