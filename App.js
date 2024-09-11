import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

const App = () => {

  const [seconds, setSeconds] = useState(0); // Numerical timer amount
  const [splitSeconds, setSplitSeconds] = useState(0); // Set timer for split
  const [isActive, setIsActive] = useState(false); // State if timer is on
  const [number, setNumber] = useState(""); // Set timer amount
  const [splitTimer, setSplitTimer] = useState(false); // State if timer is on
  const [split, setSplit] = useState(""); // Set split amount
  const [isSplit, setIsSplit] = useState(false); // State if split is being used
  const [switchCount, setSwitchCount] = useState(0); // Track completed switches
  const [maxSwitches, setMaxSwitches] = useState(""); // Max number of switches

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const bgColor = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#2b4f39']
  });


  useEffect(() => {
    let interval = null;

    Animated.timing(fadeAnim, {
      toValue: splitTimer ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start();

    if (isActive && (switchCount < Number(maxSwitches) || maxSwitches === "")) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      if (seconds <= 0) {
        clearInterval(interval);
        if (splitTimer && isSplit) { // If it's split mode and is in split
          setIsSplit(false);
          setSeconds(Number(number));
        } else if (splitTimer && !isSplit) {
          setIsSplit(true);
          setSeconds(Number(splitSeconds));
          setSwitchCount(switchCount + 1);
        } else {
          setIsActive(false);
          setSeconds(0);
        }
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, splitTimer, isSplit, switchCount]);

  const startTimer = () => {
    if (number === "" || isNaN(number)) {
      alert("Please enter a valid number for the original timer.");
      return;
    }

    setSeconds(Number(number));
    setSwitchCount(0); // Reset switch count when the timer starts

    if (splitTimer) {
      if (split === "" || isNaN(split)) {
        alert("Please enter a valid number for the split timer.");
        return;
      }
      setSplitSeconds(Number(split));
    }

    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    setIsSplit(false);
    setSwitchCount(0); // Reset switch count
  };

  const handleTimerChange = (text) => {
    if (!isNaN(text)) {
      setNumber(text);
    }
  };

  const handleSplitChange = (text) => {
    if (!isNaN(text)) {
      setSplit(text);
    }
  };

  const handleMaxSwitchChange = (text) => {
    if (!isNaN(text)) {
      setMaxSwitches(text);
    }
  };

  const switchTimer = () => {
    setSplitTimer(false);
    setIsSplit(false);
    resetTimer();
    setNumber("")
  };

  const switchSplit = () => {
    setSplitTimer(true);
    resetTimer();
    setNumber("")
    setSplit("")
    setMaxSwitches("")
  };


  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.title, { color: splitTimer ? '#fff' : '#2b4f39' }]}>{splitTimer ? 'Split Timer' : 'Timer'}</Text>

      <Text style={[styles.timerText, { color: isSplit ? 'red' : splitTimer ? '#fff' : '#2b4f39' }]}>
        {seconds}s
      </Text>

      <TextInput
        style={[styles.input, { borderColor: splitTimer ? '#000' : '#2b4f39' }]}
        value={number}
        onChangeText={handleTimerChange}
        keyboardType="numeric"
        placeholder="Enter Timer (Seconds)"
      />

      {splitTimer && (<>
        <TextInput
          style={[styles.input, { borderColor: splitTimer ? '#000' : '#2b4f39' }]}
          value={split}
          onChangeText={handleSplitChange}
          keyboardType="numeric"
          placeholder="Enter Split Timer (Seconds)"
        />

        <TextInput
          style={[styles.input, { borderColor: splitTimer ? '#000' : '#2b4f39' }]}
          value={maxSwitches}
          onChangeText={handleMaxSwitchChange}
          keyboardType="numeric"
          placeholder="Enter Number of Splits"
        />
      </>
      )}



      <View style={styles.optionContainer}>
        <View style={styles.optionWrapper}>
          <TouchableOpacity
            onPress={startTimer}
            style={[styles.button, { backgroundColor: splitTimer ? '#fff' : '#2b4f39' },]}
          >
            <Text style={[styles.buttonText, { color: splitTimer ? '#2b4f39' : '#fff' }]}>Start</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionWrapper}>
          <TouchableOpacity
            onPress={stopTimer}
            style={[styles.button, { backgroundColor: splitTimer ? '#fff' : '#2b4f39' }]}
          >
            <Text style={[styles.buttonText, { color: splitTimer ? '#2b4f39' : '#fff' }]}>Stop</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionWrapper}>
          <TouchableOpacity
            onPress={resetTimer}
            style={[styles.button, { backgroundColor: splitTimer ? '#fff' : '#2b4f39' }]}
          >
            <Text style={[styles.buttonText, { color: splitTimer ? '#2b4f39' : '#fff' }]}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            onPress={switchTimer}
            style={[styles.button, { backgroundColor: splitTimer ? '#fff' : '#2b4f39' }]}
          >
            <Text style={[styles.buttonText, { color: splitTimer ? '#2b4f39' : '#fff' }]}>Timer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            onPress={switchSplit}
            style={[styles.button, { backgroundColor: splitTimer ? '#fff' : '#2b4f39' }]}
          >
            <Text style={[styles.buttonText, { color: splitTimer ? '#2b4f39' : '#fff' }]}>Split Timer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionContainer: {
    flexDirection: 'column', // Stack buttons vertically
    alignItems: 'center', // Center buttons horizontally
    justifyContent: 'space-around', // Space out buttons
    width: '40%', // Ensure the container has enough width
    marginTop: 30,
    marginBottom: 30,
  },
  optionWrapper: {
    width: '100%', // Full width of container
    marginBottom: 20, // Space between buttons
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 10,

  },

  timerText: {
    fontSize: 70,
    marginBottom: 20,
  },

  title: {
    fontSize: 40,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  input: {
    width: 250,
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    color: "#333",
    backgroundColor: "#fff",
  },

  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default App;

