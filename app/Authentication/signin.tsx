import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  StatusBar
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const Signin = () => {
  const [mobileNumber, setMobileNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOtp = () => {
    if (mobileNumber.length === 10) {
      setOtpSent(true)
      console.log('OTP sent to:', mobileNumber)
    }
  }
  const HandleSignup = () => {
    router.push('../Authentication/signup');
  }
  const handleSubmit = () => {
    if (otp.length === 6) {
      console.log('Verifying OTP:', otp)
    }
    router.push('../(tabs)/blood/donate');
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
       <StatusBar barStyle="dark-content" backgroundColor="white" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 px-6 justify-center">

          {/* Card Wrapper */}
          <View className="bg-white p-6 rounded-3xl shadow-lg border border-red-200">
            
            {/* Header */}
            <View className="mb-10 ">
              <Text className="text-4xl font-extrabold text-red-600 mb-1 text-center">Welcome Back</Text>
              <Text className="text-gray-600 text-base text-center">Login to continue</Text>
            </View>

            {/* Mobile Number Input */}
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">Mobile Number</Text>

              <View className="flex-row items-center border border-red-400 rounded-2xl px-4 py-3 bg-white shadow-sm">
                <Text className="text-gray-700 mr-2 font-semibold">+91</Text>

                <TextInput
                  className="flex-1 text-base text-gray-900"
                  placeholder="Enter mobile number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  maxLength={10}
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                  editable={!otpSent}
                />
              </View>

              {!otpSent && mobileNumber.length === 10 && (
                <TouchableOpacity onPress={handleSendOtp} className="mt-2">
                  <Text className="text-red-600 font-semibold text-right underline">
                    Send OTP
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* OTP Input */}
            {otpSent && (
              <View className="mb-8">
                <Text className="text-gray-700 font-semibold mb-2">Enter OTP</Text>

                <TextInput
                  className="border border-red-400 rounded-2xl px-4 py-3 text-base text-gray-900 bg-white shadow-sm"
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
              </View>
            )}

            {/* Submit Button */}
            <TouchableOpacity 
              onPress={handleSubmit}
              disabled={!otpSent || otp.length !== 6}
              className={`py-4 rounded-2xl shadow-lg ${
                otpSent && otp.length === 6 
                  ? 'bg-red-600' 
                  : 'bg-red-300'
              }`}
              
            >
              <Text className="text-white text-center font-bold text-lg">
                Verify & Sign In
              </Text>
            </TouchableOpacity>

          </View>

          {/* Sign Up Option */}
          <View className="mt-6">
            <Text className="text-center text-gray-700 text-sm">
              Don't have an account?{" "}
              <Text className="text-red-600 font-bold underline" onPress={HandleSignup}>
                Sign up
              </Text>
            </Text>
          </View>

          {/* Footer Note */}
          <View className="mt-4">
            <Text className="text-gray-400 text-center text-xs">
              By signing in, you agree to our{" "}
              <Text className="text-red-600 font-semibold">Terms & Conditions</Text>
            </Text>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Signin

const styles = StyleSheet.create({})
