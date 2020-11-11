import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal'
    }
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState: 'clicked',
      scanned: false
    });
  }

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal'
    });
  }

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === "clicked" && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    else if (buttonState === "normal") {
      return (
        <View style={styles.container}>
          <Text
            style={{
              marginTop: 0,
              textAlign: 'center',
              backgroundColor: 'rgb(201, 213, 229)',
              fontSize: 25,
              height: 40,
              fontWeight: 'bold',
            }}>
            BAR CODE SCANNER
        </Text>

        <Image
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',
          marginTop: 50,
        }}
        source={{
          uri:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg',
        }}
      />

          <Text style={styles.displayText}>{
            hasCameraPermissions === true ? this.state.scannedData : "Request Camera Permission"
          }</Text>

          <TouchableOpacity
            onPress={this.getCameraPermissions}
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayText: {
    fontSize: 20,
    textDecorationLine:'underline',
    textDecorationColor:'rgb(201, 213, 229)',
    marginTop:20
  },
  scanButton: {
    backgroundColor: 'rgb(201, 213, 229)',
    padding: 10,
    margin: 40,
    width: 200,
    alignSelf: 'center'
  },
  buttonText: {
    marginTop: 10,
    textAlign: 'center',
    backgroundColor: 'rgb(201, 213, 229)',
    fontSize: 20,
    height: 40,
    fontWeight: 'bold',
  }
});
