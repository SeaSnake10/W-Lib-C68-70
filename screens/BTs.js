import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner, BarcodeScanner} from 'expo-barcode-scanner';

export default class BT extends React.Component{
    constructor(){
        super();
        this.state={
            hcp:null,
            scanned:false,
            scannedData:"",
            buttonState:"normal"
        }
    }

    getCameraPermissions= async ()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hcp:status === "granted", buttonState:'clicked' })
    }

    handleBarCodeScanned= async ({type, data})=>{
        this.setState({ scanned:true, scannedData:data, buttonState:"normal"})
    }

    render(){
        const hcp = this.state.hcp
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState

        if(buttonState === "clicked"&& hcp){
            return(
                <BarCodeScanner 
                onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned }
                style={StyleSheet.absoluteFillObject}
                />              
            )
        }
        else if (buttonState === "normal"){
            return(
                <View style={styles.v}>
                    <Text>
                        Returning or Borrowing
                    </Text>
                    <TouchableOpacity style={styles.scb} onPress={this.getCameraPermissions}>
                        <Text style={styles.scbText}>
                            Code Scanner
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    v :{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    scb:{
        backgroundColor:'red',
        width:50,
        height:50
    },
    scbText:{
        fontSize:20,
        color:'white'
    }
})