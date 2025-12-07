import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Signup = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setOtpSent(true);
      console.log("OTP sent to:", mobile);
    } else {
      Alert.alert("Error", "Mobile number must be 10 digits");
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      setOtpVerified(true);
      console.log("OTP Verified!");
    } else {
      Alert.alert("Error", "OTP must be 6 digits");
    }
  };

  const handleSubmit = () => {
    const ageNum = parseInt(age);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !mobile || !otpVerified || !email || !gender || !age) {
      Alert.alert("Error", "Please fill all fields and verify OTP");
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (isNaN(ageNum) || ageNum < 1 || ageNum > 200) {
      Alert.alert("Error", "Enter a valid age between 1 and 200");
      return;
    }

    console.log("Final signup submitted");
    Alert.alert("Success", "Account Created Successfully!");
    router.push("../(tabs)/blood/donate");
  };

  // Enable submit only if all fields are valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ageNum = parseInt(age);
  const isSubmitDisabled = !(
    name &&
    mobile &&
    otpVerified &&
    email &&
    emailRegex.test(email) &&
    gender &&
    age &&
    !isNaN(ageNum) &&
    ageNum >= 1 &&
    ageNum <= 200
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center"
      >
        <View className="bg-white p-6 rounded-3xl shadow-lg border border-red-200">

          {/* Header */}
          <Text className="text-3xl font-extrabold text-red-600 text-center mb-6">
            Create Account
          </Text>

          {/* NAME FIELD */}
          <View className="mb-6">
            <Text className="text-gray-700 font-semibold mb-2">Full Name</Text>
            <TextInput
              className="border border-gray-300 rounded-2xl px-4 py-3 bg-white"
              placeholder="Enter your name"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* MOBILE NUMBER FIELD */}
          <View className="mb-6">
            <Text className="text-gray-700 font-semibold mb-2">Mobile Number</Text>
            <View className="flex-row items-center border border-red-400 rounded-2xl px-4 py-3 bg-white shadow-sm">
              <Text className="mr-2 text-gray-700 font-semibold">+91</Text>
              <TextInput
                className="flex-1 text-base text-gray-900"
                placeholder="Enter mobile number"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                maxLength={10}
                value={mobile}
                editable={!otpVerified}
                onChangeText={setMobile}
              />
            </View>

            {!otpSent && mobile.length === 10 && (
              <TouchableOpacity onPress={handleSendOtp} className="mt-2">
                <Text className="text-red-600 font-semibold text-right underline">
                  Send OTP
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* OTP INPUT */}
          {otpSent && !otpVerified && (
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">Enter OTP</Text>
              <TextInput
                className="border border-red-400 rounded-2xl px-4 py-3 bg-white shadow-sm"
                placeholder="Enter 6-digit OTP"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
              />

              <TouchableOpacity onPress={handleSendOtp} className="mt-2">
                <Text className="text-red-600 font-semibold text-right underline">
                  Resend OTP
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleVerifyOtp}
                className={`mt-4 py-3 rounded-2xl ${otp.length === 6 ? "bg-red-600" : "bg-red-300"}`}
                disabled={otp.length !== 6}
              >
                <Text className="text-center text-white font-bold">
                  Verify OTP
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* OTP VERIFIED STATUS */}
          {otpVerified && (
            <Text className="text-green-600 font-semibold mb-4 text-center">
              ✅ OTP Verified Successfully
            </Text>
          )}

          {/* REMAINING FIELDS AFTER OTP VERIFIED */}
          {otpVerified && (
            <>
              {/* EMAIL */}
              <View className="mb-4">
                <Text className="text-gray-700 font-semibold mb-2">Email</Text>
                <TextInput
                  className="border border-gray-300 rounded-2xl px-4 py-3 bg-white"
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* GENDER */}
              <View className="mb-4">
                <Text className="text-gray-700 font-semibold mb-2">Gender</Text>
                <View className="flex-row justify-between">
                  {["Male", "Female", "Other"].map((g) => (
                    <TouchableOpacity
                      key={g}
                      onPress={() => setGender(g)}
                      className={`px-6 py-3 rounded-2xl border ${gender === g ? "bg-red-600 border-red-600" : "border-gray-300"}`}
                    >
                      <Text className={`font-semibold ${gender === g ? "text-white" : "text-gray-700"}`}>
                        {g}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* AGE */}
              <View className="mb-6">
                <Text className="text-gray-700 font-semibold mb-2">Age</Text>
                <TextInput
                  className="border border-gray-300 rounded-2xl px-4 py-3 bg-white"
                  placeholder="Enter your age"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  maxLength={3}
                  value={age}
                  onChangeText={setAge}
                />
              </View>
            </>
          )}

          {/* SUBMIT BUTTON */}
          <TouchableOpacity
            onPress={handleSubmit}
            className={`py-4 rounded-2xl shadow-lg ${isSubmitDisabled ? "bg-red-300" : "bg-red-600"}`}
            disabled={isSubmitDisabled}
          >
            <Text className="text-center text-white font-bold text-lg">
              Create Account
            </Text>
          </TouchableOpacity>

          {/* SIGN IN LINK */}
          

        </View>
        <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-700">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("../Authentication/signin")}>
              <Text className="text-red-600 font-semibold underline">Sign In</Text>
            </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({});
