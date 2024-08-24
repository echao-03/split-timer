import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [seconds, setSeconds] = useState(0); // Seconds within timer
  const [splitSeconds, setSplitSeconds] = useState(0); // Seconds within splitTimer
  const [isActive, setIsActive] = useState(false); // If timer is active
  const [number, setNumber] = useState(""); // String input for timer
  const [splitTimer, setTimer] = useState(false); // Option whether splitTimer is active
  const [split, setSplit] = useState(""); // String input for split
  const [isSplit, setIsSplit] = useState(false);

  useEffect(() => {
    let interval = null;

    if (splitTimer) {
      if (isActive) {
        console.log("in here");
        interval = setInterval(() => {
          setSeconds((seconds) => seconds - 1);
        }, 1000);

        if (seconds == 0) {
          if (isSplit) {
            clearInterval(interval);
            setIsSplit(false);
            setSeconds(number);
          }

          else {
            clearInterval(interval);
            setIsSplit(true);
            setSeconds(splitSeconds);
          }
        }
      }
    }
    else {
      if (isActive) {
        interval = setInterval(() => {
          setSeconds((seconds) => seconds - 1);
        }, 1000);


        if (seconds == 0) {
          clearInterval(interval);
          setIsActive(false);
        }
      }

      else if (!isActive && seconds != 0) {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }
  }, [isActive, seconds]);

  const startTimer = () => {
    if (seconds == 0 && number == "") {
      setSeconds(30);
    }
    else {
      setSeconds(number);
    }

    if (splitTimer) {
      setSplitSeconds(split);

    }
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
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

  const switchTimer = () => {
    if (splitTimer) {
      setTimer(false);
    }

  };

  const switchSplit = () => {
    if (!splitTimer) {
      setTimer(true);
    }
  }

  if (splitTimer) {
    console.log(splitTimer);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Timer</Text>
        <TextInput
          style={styles.input}
          value={number}
          onChangeText={handleTimerChange}
          keyboardType="numeric"
          placeholder="Enter Timer (Seconds)"
        />
        <TextInput
          style={styles.input}
          value={split}
          onChangeText={handleSplitChange}
          keyboardType="numeric"
          fontSize={17}
          placeholder="Enter Split Timer (Seconds)"
        />
        <Text style={styles.timerText}>{seconds}s</Text>
        <Button title="Start" onPress={startTimer} />
        <Button title="Stop" onPress={stopTimer} />
        <Button title="Reset" onPress={resetTimer} />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button title="Timer" onPress={switchTimer} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="Split Timer" onPress={switchSplit} />
          </View>
        </View>
      </View>
    );
  }

  else {
    console.log(splitTimer);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Timer</Text>
        <TextInput
          style={styles.input}
          value={number}
          onChangeText={handleTimerChange}
          keyboardType="numeric"
          placeholder="Enter Timer (Seconds)"

        />
        <Text style={styles.timerText}>{seconds}s</Text>
        <Button title="Start" onPress={startTimer} />
        <Button title="Stop" onPress={stopTimer} />
        <Button title="Reset" onPress={resetTimer} />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button title="Timer" onPress={switchTimer} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="Split Timer" onPress={switchSplit} />
          </View>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 50, // Adjust the position from the bottom
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Adjust width to control button spacing
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5, // Adjust to create spacing between buttons
  },

  timerText: {
    fontSize: 40,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "green",
  },

  input: {
    width: 250,
    height: 50,
    borderWidth: 2,
    borderColor: "#3498db",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    color: "#333",
    backgroundColor: "#fff",
  },
});

export default App;

