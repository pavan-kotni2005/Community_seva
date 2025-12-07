import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Alert,
  Image,
  Modal,
} from "react-native";
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

// Medicine type icons mapping
const medicineIcons: Record<string, string> = {
  'Tablet': '💊',
  'Capsule': '🔴',
  'Syrup': '🍯',
  'Injection': '💉',
  'Drops': '💧',
  'Cream': '🧴',
  'Inhaler': '🌬️'
};

// TypeScript Types
interface MedicineForm {
  medicineName: string;
  genericName: string;
  dosage: string;
  medicineType: string;
  manufacturer: string;
  frequency: string;
  timeSlots: string[];
  startDate: string;
  endDate: string;
  withFood: string;
  instructions: string;
  sideEffects: string;
  currentStock: string;
  lowStockThreshold: string;
  refillReminder: boolean;
  autoRefill: boolean;
}

type MedicineType = 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Drops' | 'Cream' | 'Inhaler';
type FrequencyType = 'Once Daily' | 'Twice Daily' | 'Thrice Daily' | 'As Needed' | 'Custom';
type FoodRelation = 'Before Food' | 'After Food' | 'With Food' | 'Empty Stomach' | 'Anytime';
type EntryMode = null | 'manual' | 'prescription';

const AddMedicine: React.FC = () => {
  const [entryMode, setEntryMode] = useState<EntryMode>(null);
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);
  const [showMedicineCard, setShowMedicineCard] = useState(false);
  const [showTimePickerModal, setShowTimePickerModal] = useState(false);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [currentTimeSlot, setCurrentTimeSlot] = useState<number>(0);
  const [datePickerType, setDatePickerType] = useState<'start' | 'end'>('start');
  
  const [form, setForm] = useState<MedicineForm>({
    medicineName: "",
    genericName: "",
    dosage: "",
    medicineType: "",
    manufacturer: "",
    frequency: "",
    timeSlots: ["", ""],
    startDate: "",
    endDate: "",
    withFood: "",
    instructions: "",
    sideEffects: "",
    currentStock: "",
    lowStockThreshold: "",
    refillReminder: true,
    autoRefill: false,
  });

  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedFrequency, setSelectedFrequency] = useState<string>("");
  const [selectedFoodRelation, setSelectedFoodRelation] = useState<string>("");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);

  const medicineTypes: MedicineType[] = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Drops', 'Cream', 'Inhaler'];
  const frequencies: FrequencyType[] = ['Once Daily', 'Twice Daily', 'Thrice Daily', 'As Needed', 'Custom'];
  const foodRelations: FoodRelation[] = ['Before Food', 'After Food', 'With Food', 'Empty Stomach', 'Anytime'];

  const updateField = (key: keyof MedicineForm, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const updateTimeSlot = (index: number, value: string) => {
    const newTimeSlots = [...form.timeSlots];
    newTimeSlots[index] = value;
    setForm({ ...form, timeSlots: newTimeSlots });
  };

  const validateForm = (): boolean => {
    if (!form.medicineName.trim()) {
      Alert.alert("Validation Error", "Please enter medicine name");
      return false;
    }
    if (!form.dosage.trim()) {
      Alert.alert("Validation Error", "Please enter dosage");
      return false;
    }
    if (!selectedType) {
      Alert.alert("Validation Error", "Please select medicine type");
      return false;
    }
    if (!selectedFrequency) {
      Alert.alert("Validation Error", "Please select frequency");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log("Medicine saved:", { ...form, medicineType: selectedType, frequency: selectedFrequency, withFood: selectedFoodRelation });
      setShowMedicineCard(true);
    }
  };

  const handleCancel = () => {
    Alert.alert("Cancel", "Are you sure you want to discard changes?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: () => {
        setEntryMode(null);
        setPrescriptionUploaded(false);
        setShowMedicineCard(false);
      }}
    ]);
  };

  const handleUploadPrescription = (type: 'camera' | 'gallery' | 'file') => {
    // Simulate AI processing
    setTimeout(() => {
      setForm({
        ...form,
        medicineName: "Paracetamol",
        genericName: "Acetaminophen",
        dosage: "500mg",
        manufacturer: "XYZ Pharmaceuticals",
        currentStock: "30",
        instructions: "Take with water after meals",
        sideEffects: "Nausea, drowsiness",
      });
      setSelectedType("Tablet");
      setSelectedFrequency("Twice Daily");
      setSelectedFoodRelation("After Food");
      setPrescriptionUploaded(true);
      Alert.alert("Success", "Prescription analyzed successfully!");
    }, 1500);
  };

  const handleEditPrescription = () => {
    setPrescriptionUploaded(false);
    setEntryMode('manual');
  };

  const handleSchedule = () => {
    Alert.alert("Success", "Medicine scheduled successfully!");
    setShowMedicineCard(true);
  };

  const openTimePicker = (slotIndex: number) => {
    setCurrentTimeSlot(slotIndex);
    setShowTimePickerModal(true);
  };

  const openDatePicker = (type: 'start' | 'end') => {
    setDatePickerType(type);
    setShowDatePickerModal(true);
  };

  const selectTime = (time: string) => {
    updateTimeSlot(currentTimeSlot, time);
    setShowTimePickerModal(false);
  };

  const selectDate = (date: string) => {
    if (datePickerType === 'start') {
      updateField('startDate', date);
    } else {
      updateField('endDate', date);
    }
    setShowDatePickerModal(false);
  };

  // Mode Selection Screen
  if (!entryMode) {
    return (
      <View className="flex-1 bg-gradient-to-br from-green-50 to-emerald-50">
        <LinearGradient
          colors={['#ECFDF5', '#D1FAE5', '#A7F3D0']}
          className="flex-1"
        >
          <ScrollView 
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <View className="px-6 pt-16 pb-8">
              {/* Header */}
              <View className="items-center mb-12">
                <View className="w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full items-center justify-center shadow-2xl mb-6">
                  <Text className="text-6xl">💊</Text>
                </View>
                <Text className="text-4xl font-bold text-gray-800 mb-3">Add Medicine</Text>
                <Text className="text-gray-600 text-center text-base px-4">Choose how you'd like to add your medication</Text>
              </View>

              {/* Manual Entry Card */}
              <TouchableOpacity
                onPress={() => setEntryMode('manual')}
                activeOpacity={0.9}
                className="mb-6"
              >
                <View className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-green-100">
                  <LinearGradient
                    colors={['#10B981', '#059669']}
                    className="p-8"
                  >
                    <View className="flex-row items-center mb-4">
                      <View className="w-16 h-16 bg-white/20 rounded-2xl items-center justify-center mr-4">
                        <Ionicons name="create-outline" size={32} color="white" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-white text-2xl font-bold mb-1">Manual Entry</Text>
                        <Text className="text-white/80 text-sm">Fill details manually</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={24} color="white" />
                    </View>
                  </LinearGradient>
                  <View className="p-6 bg-gradient-to-br from-green-50 to-white">
                    <Text className="text-gray-700 text-base leading-6">
                      ✓ Complete control over details{'\n'}
                      ✓ Add custom instructions{'\n'}
                      ✓ Perfect for known medications
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* AI Prescription Card */}
              <TouchableOpacity
                onPress={() => setEntryMode('prescription')}
                activeOpacity={0.9}
              >
                <View className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-emerald-100">
                  <LinearGradient
                    colors={['#059669', '#047857']}
                    className="p-8"
                  >
                    <View className="flex-row items-center mb-4">
                      <View className="w-16 h-16 bg-white/20 rounded-2xl items-center justify-center mr-4">
                        <MaterialCommunityIcons name="brain" size={32} color="white" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-white text-2xl font-bold mb-1">AI Prescription</Text>
                        <Text className="text-white/80 text-sm">Smart auto-fill</Text>
                      </View>
                      <View className="bg-yellow-400 px-3 py-1 rounded-full">
                        <Text className="text-xs font-bold text-gray-800">AI</Text>
                      </View>
                    </View>
                  </LinearGradient>
                  <View className="p-6 bg-gradient-to-br from-emerald-50 to-white">
                    <Text className="text-gray-700 text-base leading-6">
                      ✓ Scan prescription instantly{'\n'}
                      ✓ AI-powered recognition{'\n'}
                      ✓ Save time with automation
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }

  // Prescription Upload Screen
  if (entryMode === 'prescription' && !prescriptionUploaded) {
    return (
      <View className="flex-1 bg-gradient-to-br from-green-50 to-emerald-50">
        <LinearGradient
          colors={['#ECFDF5', '#D1FAE5', '#A7F3D0']}
          className="flex-1"
        >
          <ScrollView className="flex-1">
            <View className="px-6 pt-12 pb-8">
              {/* Back Button */}
              <TouchableOpacity 
                onPress={() => setEntryMode(null)}
                className="mb-6 flex-row items-center"
              >
                <Ionicons name="arrow-back" size={24} color="#059669" />
                <Text className="ml-2 text-green-700 font-semibold text-base">Back</Text>
              </TouchableOpacity>

              {/* Header */}
              <View className="items-center mb-12">
                <View className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full items-center justify-center shadow-xl mb-4">
                  <MaterialCommunityIcons name="file-document-outline" size={48} color="white" />
                </View>
                <Text className="text-3xl font-bold text-gray-800 mb-2">Upload Prescription</Text>
                <Text className="text-gray-600 text-center">Choose your preferred method</Text>
              </View>

              {/* Upload Options */}
              <TouchableOpacity
                onPress={() => handleUploadPrescription('camera')}
                className="mb-5"
                activeOpacity={0.8}
              >
                <View className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
                  <View className="flex-row items-center">
                    <View className="w-14 h-14 bg-green-100 rounded-xl items-center justify-center mr-4">
                      <Ionicons name="camera" size={28} color="#10B981" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-800 text-lg font-bold mb-1">Take Photo</Text>
                      <Text className="text-gray-500 text-sm">Capture prescription with camera</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#10B981" />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleUploadPrescription('gallery')}
                className="mb-5"
                activeOpacity={0.8}
              >
                <View className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
                  <View className="flex-row items-center">
                    <View className="w-14 h-14 bg-emerald-100 rounded-xl items-center justify-center mr-4">
                      <Ionicons name="images" size={28} color="#059669" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-800 text-lg font-bold mb-1">From Gallery</Text>
                      <Text className="text-gray-500 text-sm">Choose from your photos</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#059669" />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleUploadPrescription('file')}
                className="mb-5"
                activeOpacity={0.8}
              >
                <View className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
                  <View className="flex-row items-center">
                    <View className="w-14 h-14 bg-teal-100 rounded-xl items-center justify-center mr-4">
                      <Ionicons name="document-attach" size={28} color="#0D9488" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-800 text-lg font-bold mb-1">Upload File</Text>
                      <Text className="text-gray-500 text-sm">PDF or image file</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#0D9488" />
                  </View>
                </View>
              </TouchableOpacity>

              {/* Info Card */}
              <View className="bg-green-50 rounded-2xl p-5 border border-green-200 mt-4">
                <View className="flex-row items-start">
                  <Ionicons name="information-circle" size={24} color="#10B981" />
                  <View className="flex-1 ml-3">
                    <Text className="text-green-800 font-semibold mb-1">AI-Powered Analysis</Text>
                    <Text className="text-green-700 text-sm leading-5">
                      Our AI will automatically extract medicine details, dosage, and instructions from your prescription.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }

  // Prescription Result Card
  if (entryMode === 'prescription' && prescriptionUploaded && !showMedicineCard) {
    return (
      <View className="flex-1 bg-gradient-to-br from-green-50 to-emerald-50">
        <LinearGradient
          colors={['#ECFDF5', '#D1FAE5', '#A7F3D0']}
          className="flex-1"
        >
          <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
            <View className="px-6 pt-12 pb-8">
              {/* Back Button */}
              <TouchableOpacity 
                onPress={() => {
                  setPrescriptionUploaded(false);
                  setEntryMode(null);
                }}
                className="mb-6 flex-row items-center"
              >
                <Ionicons name="arrow-back" size={24} color="#059669" />
                <Text className="ml-2 text-green-700 font-semibold text-base">Back</Text>
              </TouchableOpacity>

              {/* Success Badge */}
              <View className="items-center mb-6">
                <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center shadow-lg mb-3">
                  <Ionicons name="checkmark-circle" size={48} color="white" />
                </View>
                <Text className="text-2xl font-bold text-gray-800 mb-1">Analysis Complete!</Text>
                <Text className="text-gray-600">Review extracted details below</Text>
              </View>

              {/* Medicine Details Card */}
              <View className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-green-100 mb-6">
                {/* Header */}
                <LinearGradient
                  colors={['#10B981', '#059669']}
                  className="p-6"
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                      <Text className="text-5xl mr-3">{medicineIcons[selectedType]}</Text>
                      <View className="flex-1">
                        <Text className="text-white text-2xl font-bold">{form.medicineName}</Text>
                        <Text className="text-white/80 text-sm mt-1">{form.genericName}</Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>

                {/* Details */}
                <View className="p-6">
                  {/* Dosage & Type */}
                  <View className="flex-row mb-4">
                    <View className="flex-1 bg-green-50 rounded-xl p-4 mr-2">
                      <Text className="text-gray-600 text-xs mb-1">Dosage</Text>
                      <Text className="text-gray-800 font-bold text-lg">{form.dosage}</Text>
                    </View>
                    <View className="flex-1 bg-emerald-50 rounded-xl p-4 ml-2">
                      <Text className="text-gray-600 text-xs mb-1">Type</Text>
                      <Text className="text-gray-800 font-bold text-lg">{selectedType}</Text>
                    </View>
                  </View>

                  {/* Frequency & Food */}
                  <View className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-4">
                    <View className="flex-row items-center mb-3">
                      <Ionicons name="repeat" size={20} color="#10B981" />
                      <Text className="text-gray-700 font-semibold ml-2">Frequency</Text>
                    </View>
                    <Text className="text-gray-800 text-base font-bold">{selectedFrequency}</Text>
                  </View>

                  <View className="bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-4 mb-4">
                    <View className="flex-row items-center mb-3">
                      <Ionicons name="restaurant" size={20} color="#0D9488" />
                      <Text className="text-gray-700 font-semibold ml-2">When to Take</Text>
                    </View>
                    <Text className="text-gray-800 text-base font-bold">{selectedFoodRelation}</Text>
                  </View>

                  {/* Manufacturer */}
                  {form.manufacturer && (
                    <View className="bg-blue-50 rounded-xl p-4 mb-4">
                      <Text className="text-gray-600 text-xs mb-1">Manufacturer</Text>
                      <Text className="text-gray-800 font-semibold">{form.manufacturer}</Text>
                    </View>
                  )}

                  {/* Instructions */}
                  <View className="bg-yellow-50 rounded-xl p-4 mb-4 border border-yellow-200">
                    <View className="flex-row items-center mb-2">
                      <Ionicons name="information-circle" size={20} color="#F59E0B" />
                      <Text className="text-gray-700 font-semibold ml-2">Instructions</Text>
                    </View>
                    <Text className="text-gray-700 leading-5">{form.instructions}</Text>
                  </View>

                  {/* Side Effects */}
                  <View className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <View className="flex-row items-center mb-2">
                      <Ionicons name="alert-circle" size={20} color="#EF4444" />
                      <Text className="text-gray-700 font-semibold ml-2">Possible Side Effects</Text>
                    </View>
                    <Text className="text-gray-700 leading-5">{form.sideEffects}</Text>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-3 mb-6">
                <TouchableOpacity
                  onPress={handleEditPrescription}
                  className="flex-1 bg-white rounded-2xl p-5 shadow-lg border-2 border-green-200"
                  activeOpacity={0.8}
                >
                  <View className="items-center">
                    <Ionicons name="create-outline" size={24} color="#10B981" />
                    <Text className="text-green-700 font-bold text-base mt-2">Edit Details</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSchedule}
                  className="flex-1 rounded-2xl overflow-hidden shadow-xl"
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#10B981', '#059669']}
                    className="p-5"
                  >
                    <View className="items-center">
                      <Ionicons name="calendar" size={24} color="white" />
                      <Text className="text-white font-bold text-base mt-2">Schedule</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }

  // Success Card after Manual Entry
  if (showMedicineCard) {
    return (
      <View className="flex-1 bg-gradient-to-br from-green-50 to-emerald-50">
        <LinearGradient
          colors={['#ECFDF5', '#D1FAE5', '#A7F3D0']}
          className="flex-1"
        >
          <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
            <View className="px-6 pt-12 pb-8">
              {/* Success Animation */}
              <View className="items-center mb-8">
                <View className="w-28 h-28 bg-green-500 rounded-full items-center justify-center shadow-2xl mb-4">
                  <Ionicons name="checkmark-circle" size={64} color="white" />
                </View>
                <Text className="text-3xl font-bold text-gray-800 mb-2">Medicine Added!</Text>
                <Text className="text-gray-600 text-center">Your medication has been successfully saved</Text>
              </View>

              {/* Detailed Medicine Card */}
              <View className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-green-100 mb-6">
                {/* Gradient Header */}
                <LinearGradient
                  colors={['#10B981', '#059669', '#047857']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="p-8"
                >
                  <View className="flex-row items-center mb-4">
                    <Text className="text-6xl mr-4">{medicineIcons[selectedType]}</Text>
                    <View className="flex-1">
                      <Text className="text-white text-3xl font-bold mb-1">{form.medicineName}</Text>
                      {form.genericName && (
                        <Text className="text-white/90 text-base">{form.genericName}</Text>
                      )}
                    </View>
                  </View>
                  <View className="flex-row flex-wrap gap-2">
                    <View className="bg-white/20 px-4 py-2 rounded-full">
                      <Text className="text-white font-semibold">{selectedType}</Text>
                    </View>
                    <View className="bg-white/20 px-4 py-2 rounded-full">
                      <Text className="text-white font-semibold">{form.dosage}</Text>
                    </View>
                  </View>
                </LinearGradient>

                {/* Details Grid */}
                <View className="p-6">
                  {/* Schedule Info */}
                  <View className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 mb-4 border border-green-200">
                    <View className="flex-row items-center mb-3">
                      <View className="w-10 h-10 bg-green-500 rounded-xl items-center justify-center mr-3">
                        <Ionicons name="alarm" size={20} color="white" />
                      </View>
                      <Text className="text-gray-800 font-bold text-lg">Schedule</Text>
                    </View>
                    <View className="ml-13">
                      <Text className="text-gray-700 mb-2">
                        <Text className="font-semibold">Frequency: </Text>{selectedFrequency}
                      </Text>
                      {form.timeSlots.some(t => t) && (
                        <Text className="text-gray-700 mb-2">
                          <Text className="font-semibold">Times: </Text>
                          {form.timeSlots.filter(t => t).join(', ')}
                        </Text>
                      )}
                      {form.startDate && (
                        <Text className="text-gray-700">
                          <Text className="font-semibold">From: </Text>{form.startDate}
                          {form.endDate && ` to ${form.endDate}`}
                        </Text>
                      )}
                    </View>
                  </View>

                  {/* Food & Instructions */}
                  {selectedFoodRelation && (
                    <View className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-5 mb-4 border border-teal-200">
                      <View className="flex-row items-center mb-2">
                        <Ionicons name="restaurant" size={20} color="#0D9488" />
                        <Text className="text-gray-700 font-semibold ml-2">When to Take</Text>
                      </View>
                      <Text className="text-gray-800 text-base font-bold ml-7">{selectedFoodRelation}</Text>
                    </View>
                  )}

                  {form.instructions && (
                    <View className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 mb-4 border border-blue-200">
                      <View className="flex-row items-center mb-2">
                        <Ionicons name="information-circle" size={20} color="#3B82F6" />
                        <Text className="text-gray-700 font-semibold ml-2">Special Instructions</Text>
                      </View>
                      <Text className="text-gray-700 leading-5 ml-7">{form.instructions}</Text>
                    </View>
                  )}

                  {/* Stock Info */}
                  {form.currentStock && (
                    <View className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 mb-4 border border-purple-200">
                      <View className="flex-row items-center mb-3">
                        <View className="w-10 h-10 bg-purple-500 rounded-xl items-center justify-center mr-3">
                          <MaterialCommunityIcons name="package-variant" size={20} color="white" />
                        </View>
                        <Text className="text-gray-800 font-bold text-lg">Stock Information</Text>
                      </View>
                      <View className="ml-13">
                        <Text className="text-gray-700 mb-2">
                          <Text className="font-semibold">Current Stock: </Text>{form.currentStock}
                        </Text>
                        {form.lowStockThreshold && (
                          <Text className="text-gray-700">
                            <Text className="font-semibold">Alert at: </Text>{form.lowStockThreshold}
                          </Text>
                        )}
                      </View>
                    </View>
                  )}

                  {/* Side Effects */}
                  {form.sideEffects && (
                    <View className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-5 border border-red-200">
                      <View className="flex-row items-center mb-2">
                        <Ionicons name="alert-circle" size={20} color="#EF4444" />
                        <Text className="text-gray-700 font-semibold ml-2">Possible Side Effects</Text>
                      </View>
                      <Text className="text-gray-700 leading-5 ml-7">{form.sideEffects}</Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={() => {
                    setShowMedicineCard(false);
                    setEntryMode(null);
                  }}
                  className="flex-1 bg-white rounded-2xl p-5 shadow-lg border-2 border-green-200"
                  activeOpacity={0.8}
                >
                  <View className="items-center">
                    <Ionicons name="add-circle" size={28} color="#10B981" />
                    <Text className="text-green-700 font-bold text-base mt-2">Add Another</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => Alert.alert("Success", "Navigating to medicine list...")}
                  className="flex-1 rounded-2xl overflow-hidden shadow-xl"
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#10B981', '#059669']}
                    className="p-5"
                  >
                    <View className="items-center">
                      <Ionicons name="list" size={28} color="white" />
                      <Text className="text-white font-bold text-base mt-2">View All</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }

  // Manual Entry Form
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
    >
      <LinearGradient
        colors={['#ECFDF5', '#D1FAE5', '#A7F3D0']}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Header */}
          <View className="px-5 pt-12 pb-6">
            <TouchableOpacity 
              onPress={() => setEntryMode(null)}
              className="mb-4 flex-row items-center"
            >
              <Ionicons name="arrow-back" size={24} color="#059669" />
              <Text className="ml-2 text-green-700 font-semibold text-base">Back</Text>
            </TouchableOpacity>

            <View className="items-center mb-6">
              <LinearGradient
                colors={['#10B981', '#059669']}
                className="w-20 h-20 rounded-3xl items-center justify-center shadow-xl mb-4"
              >
                <Ionicons name="create-outline" size={40} color="white" />
              </LinearGradient>
              <Text className="text-4xl font-bold text-gray-800 mb-2">Manual Entry</Text>
              <Text className="text-gray-600 text-center">Fill in the medicine details</Text>
            </View>

            {/* Quick Actions */}
            <View className="flex-row gap-3">
              <TouchableOpacity 
                onPress={() => Alert.alert("AI Feature", "Interaction Checker will analyze potential drug interactions")}
                className="flex-1 rounded-2xl overflow-hidden shadow-lg"
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#10B981', '#059669']}
                  className="p-4 flex-row items-center justify-center"
                >
                  <MaterialCommunityIcons name="alert-circle-check" size={20} color="white" />
                  <Text className="text-white font-semibold ml-2 text-sm">Check Interactions</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View className="px-5">
            {/* SECTION 1: MEDICINE DETAILS */}
            <View className="bg-white rounded-3xl p-6 shadow-xl mb-5 border-2 border-green-100">
              <View className="flex-row items-center mb-5">
                <View className="w-12 h-12 bg-green-500 rounded-2xl items-center justify-center mr-3">
                  <Ionicons name="medical" size={24} color="white" />
                </View>
                <Text className="text-2xl font-bold text-gray-800">Medicine Details</Text>
              </View>

              {/* Medicine Name */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Medicine Name *</Text>
                <View className="flex-row items-center bg-green-50 rounded-xl p-4 border-2 border-green-100">
                  <Ionicons name="medkit-outline" size={20} color="#10B981" />
                  <TextInput
                    placeholder="Enter medicine name"
                    value={form.medicineName}
                    onChangeText={(v) => updateField("medicineName", v)}
                    className="ml-3 flex-1 text-gray-800 text-base"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* Generic Name */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Generic Name</Text>
                <View className="flex-row items-center bg-emerald-50 rounded-xl p-4 border-2 border-emerald-100">
                  <MaterialIcons name="science" size={20} color="#059669" />
                  <TextInput
                    placeholder="Enter generic name"
                    value={form.genericName}
                    onChangeText={(v) => updateField("genericName", v)}
                    className="ml-3 flex-1 text-gray-800 text-base"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* Dosage */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Dosage *</Text>
                <View className="flex-row items-center bg-teal-50 rounded-xl p-4 border-2 border-teal-100">
                  <MaterialCommunityIcons name="pill" size={20} color="#0D9488" />
                  <TextInput
                    placeholder="e.g., 500mg, 10ml"
                    value={form.dosage}
                    onChangeText={(v) => updateField("dosage", v)}
                    className="ml-3 flex-1 text-gray-800 text-base"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* Medicine Type Dropdown with Icons */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Medicine Type *</Text>
                <TouchableOpacity
                  onPress={() => setShowTypeDropdown(!showTypeDropdown)}
                  className="flex-row items-center bg-cyan-50 rounded-xl p-4 border-2 border-cyan-100"
                >
                  <Text className="text-2xl mr-2">{selectedType ? medicineIcons[selectedType] : '💊'}</Text>
                  <Text className={`flex-1 text-base ${selectedType ? 'text-gray-800 font-semibold' : 'text-gray-400'}`}>
                    {selectedType || "Select medicine type"}
                  </Text>
                  <Ionicons name={showTypeDropdown ? "chevron-up" : "chevron-down"} size={20} color="#0891B2" />
                </TouchableOpacity>
                
                {showTypeDropdown && (
                  <View className="bg-white rounded-xl mt-2 border-2 border-cyan-200 shadow-xl overflow-hidden">
                    {medicineTypes.map((type) => (
                      <TouchableOpacity
                        key={type}
                        onPress={() => {
                          setSelectedType(type);
                          setShowTypeDropdown(false);
                        }}
                        className="p-4 border-b border-gray-100 flex-row items-center active:bg-green-50"
                      >
                        <Text className="text-2xl mr-3">{medicineIcons[type]}</Text>
                        <Text className="text-gray-800 text-base font-medium">{type}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Manufacturer */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Manufacturer</Text>
                <View className="flex-row items-center bg-lime-50 rounded-xl p-4 border-2 border-lime-100">
                  <MaterialCommunityIcons name="factory" size={20} color="#84CC16" />
                  <TextInput
                    placeholder="Enter manufacturer name"
                    value={form.manufacturer}
                    onChangeText={(v) => updateField("manufacturer", v)}
                    className="ml-3 flex-1 text-gray-800 text-base"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
            </View>

            {/* SECTION 2: REMINDER & SCHEDULE */}
            <View className="bg-white rounded-3xl p-6 shadow-xl mb-5 border-2 border-emerald-100">
              <View className="flex-row items-center mb-5">
                <View className="w-12 h-12 bg-emerald-500 rounded-2xl items-center justify-center mr-3">
                  <Ionicons name="alarm" size={24} color="white" />
                </View>
                <Text className="text-2xl font-bold text-gray-800">Reminder & Schedule</Text>
              </View>

              {/* Frequency Dropdown */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Frequency *</Text>
                <TouchableOpacity
                  onPress={() => setShowFrequencyDropdown(!showFrequencyDropdown)}
                  className="flex-row items-center bg-green-50 rounded-xl p-4 border-2 border-green-100"
                >
                  <Ionicons name="repeat" size={20} color="#10B981" />
                  <Text className={`ml-3 flex-1 text-base ${selectedFrequency ? 'text-gray-800 font-semibold' : 'text-gray-400'}`}>
                    {selectedFrequency || "Select frequency"}
                  </Text>
                  <Ionicons name={showFrequencyDropdown ? "chevron-up" : "chevron-down"} size={20} color="#10B981" />
                </TouchableOpacity>
                
                {showFrequencyDropdown && (
                  <View className="bg-white rounded-xl mt-2 border-2 border-green-200 shadow-xl overflow-hidden">
                    {frequencies.map((freq) => (
                      <TouchableOpacity
                        key={freq}
                        onPress={() => {
                          setSelectedFrequency(freq);
                          setShowFrequencyDropdown(false);
                        }}
                        className="p-4 border-b border-gray-100 active:bg-green-50"
                      >
                        <Text className="text-gray-800 text-base font-medium">{freq}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Time Slots with Picker */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Time Slots</Text>
                <View className="flex-row gap-2">
                  <TouchableOpacity 
                    onPress={() => openTimePicker(0)}
                    className="flex-1"
                  >
                    <View className="flex-row items-center bg-teal-50 rounded-xl p-4 border-2 border-teal-100">
                      <Ionicons name="time-outline" size={20} color="#0D9488" />
                      <Text className={`ml-3 flex-1 text-base ${form.timeSlots[0] ? 'text-gray-800 font-semibold' : 'text-gray-400'}`}>
                        {form.timeSlots[0] || "8:00 AM"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => openTimePicker(1)}
                    className="flex-1"
                  >
                    <View className="flex-row items-center bg-teal-50 rounded-xl p-4 border-2 border-teal-100">
                      <Ionicons name="time-outline" size={20} color="#0D9488" />
                      <Text className={`ml-3 flex-1 text-base ${form.timeSlots[1] ? 'text-gray-800 font-semibold' : 'text-gray-400'}`}>
                        {form.timeSlots[1] || "8:00 PM"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Start Date with Picker */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Start Date</Text>
                <TouchableOpacity onPress={() => openDatePicker('start')}>
                  <View className="flex-row items-center bg-green-50 rounded-xl p-4 border-2 border-green-100">
                    <Ionicons name="calendar-outline" size={20} color="#10B981" />
                    <Text className={`ml-3 flex-1 text-base ${form.startDate ? 'text-gray-800 font-semibold' : 'text-gray-400'}`}>
                      {form.startDate || "DD/MM/YYYY"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* End Date with Picker */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-2">End Date (Optional)</Text>
                <TouchableOpacity onPress={() => openDatePicker('end')}>
                  <View className="flex-row items-center bg-emerald-50 rounded-xl p-4 border-2 border-emerald-100">
                    <Ionicons name="calendar-outline" size={20} color="#059669" />
                    <Text className={`ml-3 flex-1 text-base ${form.endDate ? 'text-gray-800 font-semibold' : 'text-gray-400'}`}>
                      {form.endDate || "DD/MM/YYYY or Ongoing"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* SECTION 3: INSTRUCTIONS */}
            <View className="bg-white rounded-3xl p-6 shadow-xl mb-5 border-2 border-teal-100">
              <View className="flex-row items-center mb-5">
                <View className="w-12 h-12 bg-teal-500 rounded-2xl items-center justify-center mr-3">
                  <FontAwesome5 name="notes-medical" size={22} color="white" />
                </View>
                <Text className="text-2xl font-bold text-gray-800">Instructions</Text>
              </View>

              {/* Food Relation Radio Buttons */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-3">When to Take</Text>
                {foodRelations.map((relation) => (
                  <TouchableOpacity
                    key={relation}
                    onPress={() => setSelectedFoodRelation(relation)}
                    className="flex-row items-center bg-teal-50 rounded-xl p-4 mb-2 border-2 border-teal-100"
                  >
                    <View className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-3 ${
                      selectedFoodRelation === relation ? 'border-teal-500 bg-teal-500' : 'border-gray-400'
                    }`}>
                      {selectedFoodRelation === relation && (
                        <View className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </View>
                    <Text className="text-gray-800 text-base">{relation}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Special Instructions */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Special Instructions</Text>
                <View className="bg-cyan-50 rounded-xl p-4 border-2 border-cyan-100">
                  <TextInput
                    placeholder="e.g., Take with plenty of water, avoid alcohol..."
                    value={form.instructions}
                    onChangeText={(v) => updateField("instructions", v)}
                    multiline
                    numberOfLines={4}
                    className="text-gray-800 text-base"
                    style={{ minHeight: 80 }}
                    placeholderTextColor="#9CA3AF"
                    textAlignVertical="top"
                  />
                </View>
              </View>

              {/* Side Effects */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Possible Side Effects</Text>
                <View className="bg-orange-50 rounded-xl p-4 border-2 border-orange-100">
                  <TextInput
                    placeholder="e.g., Drowsiness, nausea, headache..."
                    value={form.sideEffects}
                    onChangeText={(v) => updateField("sideEffects", v)}
                    multiline
                    numberOfLines={3}
                    className="text-gray-800 text-base"
                    style={{ minHeight: 60 }}
                    placeholderTextColor="#9CA3AF"
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </View>

            {/* SECTION 4: STOCK & REFILL */}
            <View className="bg-white rounded-3xl p-6 shadow-xl mb-5 border-2 border-lime-100">
              <View className="flex-row items-center mb-5">
                <View className="w-12 h-12 bg-lime-500 rounded-2xl items-center justify-center mr-3">
                  <MaterialCommunityIcons name="package-variant" size={24} color="white" />
                </View>
                <Text className="text-2xl font-bold text-gray-800">Stock & Refill</Text>
              </View>

              {/* Current Stock */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Current Stock</Text>
                <View className="flex-row items-center bg-green-50 rounded-xl p-4 border-2 border-green-100">
                  <MaterialCommunityIcons name="package-variant-closed" size={20} color="#10B981" />
                  <TextInput
                    placeholder="e.g., 30 tablets"
                    value={form.currentStock}
                    onChangeText={(v) => updateField("currentStock", v)}
                    keyboardType="numeric"
                    className="ml-3 flex-1 text-gray-800 text-base"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* Low Stock Threshold */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Low Stock Alert</Text>
                <View className="flex-row items-center bg-red-50 rounded-xl p-4 border-2 border-red-100">
                  <Ionicons name="alert-circle-outline" size={20} color="#EF4444" />
                  <TextInput
                    placeholder="e.g., 5 tablets"
                    value={form.lowStockThreshold}
                    onChangeText={(v) => updateField("lowStockThreshold", v)}
                    keyboardType="numeric"
                    className="ml-3 flex-1 text-gray-800 text-base"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* Refill Reminder Toggle */}
              <View className="flex-row items-center justify-between bg-emerald-50 rounded-xl p-4 mb-3 border-2 border-emerald-100">
                <View className="flex-row items-center flex-1">
                  <MaterialCommunityIcons name="bell-ring" size={20} color="#059669" />
                  <Text className="ml-3 text-gray-800 text-base font-medium">Refill Reminder</Text>
                </View>
                <Switch
                  value={form.refillReminder}
                  onValueChange={(v) => updateField("refillReminder", v)}
                  trackColor={{ false: "#D1D5DB", true: "#6EE7B7" }}
                  thumbColor={form.refillReminder ? "#10B981" : "#F3F4F6"}
                />
              </View>

              {/* Auto Refill Toggle */}
              <View className="flex-row items-center justify-between bg-teal-50 rounded-xl p-4 border-2 border-teal-100">
                <View className="flex-row items-center flex-1">
                  <MaterialCommunityIcons name="autorenew" size={20} color="#0D9488" />
                  <Text className="ml-3 text-gray-800 text-base font-medium">Auto Refill Order</Text>
                </View>
                <Switch
                  value={form.autoRefill}
                  onValueChange={(v) => updateField("autoRefill", v)}
                  trackColor={{ false: "#D1D5DB", true: "#5EEAD4" }}
                  thumbColor={form.autoRefill ? "#0D9488" : "#F3F4F6"}
                />
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3 mb-10">
              <TouchableOpacity 
                onPress={handleCancel}
                className="flex-1 bg-gray-200 rounded-2xl p-5 items-center shadow-md"
                activeOpacity={0.8}
              >
                <Text className="text-gray-700 font-bold text-lg">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleSave}
                className="flex-1 rounded-2xl overflow-hidden shadow-xl"
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#10B981', '#059669']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="p-5 items-center"
                >
                  <Text className="text-white font-bold text-lg">Save Medicine</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Time Picker Modal */}
        <Modal
          visible={showTimePickerModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowTimePickerModal(false)}
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="bg-white rounded-t-3xl p-6">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-xl font-bold text-gray-800">Select Time</Text>
                <TouchableOpacity onPress={() => setShowTimePickerModal(false)}>
                  <Ionicons name="close-circle" size={28} color="#10B981" />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ maxHeight: 300 }}>
                {['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'].map((time) => (
                  <TouchableOpacity
                    key={time}
                    onPress={() => selectTime(time)}
                    className="p-4 border-b border-gray-100 active:bg-green-50"
                  >
                    <Text className="text-gray-800 text-base font-medium text-center">{time}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Date Picker Modal */}
        <Modal
          visible={showDatePickerModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowDatePickerModal(false)}
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="bg-white rounded-t-3xl p-6">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-xl font-bold text-gray-800">Select Date</Text>
                <TouchableOpacity onPress={() => setShowDatePickerModal(false)}>
                  <Ionicons name="close-circle" size={28} color="#10B981" />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ maxHeight: 300 }}>
                {['07/12/2025', '08/12/2025', '09/12/2025', '10/12/2025', '15/12/2025', '20/12/2025', '01/01/2026'].map((date) => (
                  <TouchableOpacity
                    key={date}
                    onPress={() => selectDate(date)}
                    className="p-4 border-b border-gray-100 active:bg-green-50"
                  >
                    <Text className="text-gray-800 text-base font-medium text-center">{date}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AddMedicine;