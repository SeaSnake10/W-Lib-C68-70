import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner, BarcodeScanner} from 'expo-barcode-scanner';

export default class BT extends React.Component{
    constructor(){
        super();
        this.state={
            hcp:null,
            scanned:false,
            scannedData:"",
            buttonState:"normal",
            scannedBookId:"",
            scannedStudentId:""
        }
    }

    getCameraPermissions= async (id)=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hcp:status === "granted", buttonState:id, scanned:false});
    }

    handleBarCodeScanned= async ({type, data})=>{
        const {buttonState}=this.state
        if(buttonState === "BookID"){
            this.setState({ scanned:true, scannedData:data, buttonState:"normal"})
        }else if (buttonState === "StudentID"){
            this.setState({ scanned:true, scannedData:data, buttonState:"normal"})
        }

    }

    render(){
        const hcp = this.state.hcp
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState

        if(buttonState !== "normal"&& hcp){
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
                    <Image source ={require("../assets/booklogo.jpg")} style={{ width:60, height:60}}/>
                    <Text>Returning or Borrowing</Text>
                    <TextInput placeholder="Book ID" style={styles.sbid} value={this.state.scannedBookId}/>
                    <TouchableOpacity style={styles.scb} onPress={this.getCameraPermissions("BookID")}>
                        <Text style={styles.scbText}>
                            Code Scanner
                        </Text>
                    </TouchableOpacity>
                    <TextInput placeholder="Student ID" style={styles.sbid} value={this.state.scannedStudentId}/>
                    <TouchableOpacity style={styles.scb} onPress={this.getCameraPermissions("StudentID")}>
                        <Text style={styles.scbText}>
                            Student ID Scanner
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
        width:150,
        height:50,
        borderRadius:50,
        marginTop:10
    },
    scbText:{
        marginTop:10,
        fontSize:20,
        color:'white',
        textAlign:'center'
    },
    sbid:{
        width:200,
        height:50,
        borderWidth:2,
        marginTop:10
    }
})