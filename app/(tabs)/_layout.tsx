import React from "react";
import { Drawer } from "expo-router/drawer";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

const CustomDrawerContent = (props: any) => {
  const userName = "John Doe";
  const userLocation = "New York, USA";
  const userEmail = "john.doe@example.com";
  const userAvatar = "https://randomuser.me/api/portraits/men/32.jpg";
  const memberSince = "Member since 2024";

  const handleLogout = () => console.log("Logout pressed");
  const handleProfilePress = () => props.navigation.navigate("profile");

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <DrawerContentScrollView {...props} className="pt-0" showsVerticalScrollIndicator={false}>

        {/* HEADER WITHOUT GRADIENT */}
        <View className="bg-red-600 rounded-b-3xl shadow-xl overflow-hidden">

          {/* Floating decorative circles for premium look */}
          <View className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <View className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

          <TouchableOpacity
            className="p-6 pb-8"
            onPress={handleProfilePress}
            activeOpacity={0.9}
          >
            {/* Avatar */}
            <View className="items-center mb-4">
              <View className="relative">
                <Image
                  source={{ uri: userAvatar }}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                {/* camera icon */}
                <View className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white justify-center items-center shadow-md">
                  <Ionicons name="camera" size={16} color="#dc2626" />
                </View>

                {/* online active dot */}
                <View className="absolute top-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
              </View>
            </View>

            {/* USER INFO */}
            <View className="items-center">
              <View className="flex-row items-center mb-2">
                <Text className="text-2xl font-bold text-white">{userName}</Text>
                <View className="ml-2 bg-white/20 px-2 py-0.5 rounded-full">
                  <Text className="text-white text-xs font-semibold">PRO</Text>
                </View>
              </View>

              <View className="flex-row items-center mb-1">
                <Ionicons name="mail-outline" size={12} color="#fff" />
                <Text className="text-white/90 text-xs ml-1">{userEmail}</Text>
              </View>

              <View className="flex-row items-center mb-3">
                <Ionicons name="location-outline" size={12} color="#fff" />
                <Text className="text-white/90 text-xs ml-1">{userLocation}</Text>
              </View>

              {/* View Profile */}
              <View className="bg-white/20 px-4 py-2 rounded-full flex-row items-center">
                <Text className="text-white font-semibold text-sm mr-1">View Full Profile</Text>
                <Ionicons name="arrow-forward" size={14} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* STATS */}
        <View className="flex-row justify-around py-4 px-4 bg-white mx-4 rounded-2xl -mt-4 shadow-lg border border-gray-100">
          <View className="items-center">
            <Text className="text-red-600 font-bold text-lg">12</Text>
            <Text className="text-gray-500 text-xs">Donations</Text>
          </View>

          <View className="w-px bg-gray-200" />

          <View className="items-center">
            <Text className="text-red-600 font-bold text-lg">450</Text>
            <Text className="text-gray-500 text-xs">Impact Score</Text>
          </View>

          <View className="w-px bg-gray-200" />

          <View className="items-center">
            <Text className="text-red-600 font-bold text-lg">8</Text>
            <Text className="text-gray-500 text-xs">Lives Saved</Text>
          </View>
        </View>

        {/* Section Label */}
        <View className="px-6 pt-6 pb-2">
          <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">
            Main Menu
          </Text>
        </View>

        <View className="px-2">
          <DrawerItemList {...props} />
        </View>

        {/* QUICK ACTIONS */}
        <View className="px-6 pt-4 pb-2">
          <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">
            Quick Actions
          </Text>

          <TouchableOpacity className="flex-row items-center bg-white p-3 rounded-xl mb-2 shadow-sm border border-gray-100">
            <View className="w-10 h-10 bg-red-50 rounded-full items-center justify-center">
              <Ionicons name="notifications-outline" size={20} color="#dc2626" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-gray-800 font-semibold">Notifications</Text>
              <Text className="text-gray-500 text-xs">3 new alerts</Text>
            </View>

            <View className="bg-red-600 w-6 h-6 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">3</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center bg-white p-3 rounded-xl shadow-sm border border-gray-100">
            <View className="w-10 h-10 bg-red-50 rounded-full items-center justify-center">
              <Ionicons name="settings-outline" size={20} color="#dc2626" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-gray-800 font-semibold">Settings</Text>
              <Text className="text-gray-500 text-xs">App preferences</Text>
            </View>

            <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* HELP */}
        <View className="px-6 pt-4 pb-4">
          <TouchableOpacity className="flex-row items-center bg-red-50 p-4 rounded-xl border border-red-100">
            <View className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
              <Ionicons name="help-circle-outline" size={22} color="#dc2626" />
            </View>

            <View className="ml-3 flex-1">
              <Text className="text-gray-800 font-bold">Need Help?</Text>
              <Text className="text-gray-600 text-xs">Contact support team</Text>
            </View>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      {/* LOGOUT */}
      <View className="border-t border-gray-200 bg-white">
        <TouchableOpacity
          className="flex-row items-center justify-center p-4 active:bg-gray-100"
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <View className="w-10 h-10 bg-red-50 rounded-full items-center justify-center mr-3">
            <Ionicons name="log-out-outline" size={20} color="#dc2626" />
          </View>
          <Text className="text-red-600 font-bold text-base">Sign Out</Text>
        </TouchableOpacity>

        <View className="items-center pb-2">
          <Text className="text-gray-400 text-xs">{memberSince}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default function RootLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitle: "Community Seva",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#dc2626",
          elevation: 4,
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
        },
        drawerActiveTintColor: "#dc2626",
        drawerActiveBackgroundColor: "#fee2e2",
        drawerInactiveTintColor: "#4b5563",
        drawerLabelStyle: {
          marginLeft: -10,
          fontSize: 15,
          fontWeight: "600",
        },
        drawerItemStyle: {
          borderRadius: 12,
          marginHorizontal: 8,
          marginVertical: 2,
          paddingHorizontal: 8,
        },
      }}
    >
      <Drawer.Screen
        name="blood"
        options={{
          drawerLabel: "Blood Donation",
          title: "Blood Donation",
          drawerIcon: ({ color }) => (
            <View className="w-9 h-9 items-center justify-center">
              <MaterialCommunityIcons name="blood-bag" size={22} color={color} />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="organ"
        options={{
          drawerLabel: "Organ Donation",
          title: "Organ Donation",
          drawerIcon: ({ color }) => (
            <View className="w-9 h-9 items-center justify-center">
              <FontAwesome5 name="heartbeat" size={20} color={color} />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="medicine"
        options={{
          drawerLabel: "Medicine Help",
          title: "Medicine Help",
          drawerIcon: ({ color }) => (
            <View className="w-9 h-9 items-center justify-center">
              <MaterialCommunityIcons name="pill" size={22} color={color} />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "My Profile",
          drawerIcon: ({ color }) => (
            <View className="w-9 h-9 items-center justify-center">
              <Ionicons name="person-outline" size={22} color={color} />
            </View>
          ),
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
}
