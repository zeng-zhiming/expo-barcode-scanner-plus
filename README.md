# expo-barcode-scanner-plus

本库是在expo-barcode-scanner库上进行扩展，为expo项目提供扫描各种支持的条形码。在expo-barcode-scanner的基础上增加了对react-native-web的支持。

## 安装
`$ npx expo install expo-barcode-scanner`

`$ npx expo install expo-av`

`$ npx expo install expo-barcode-scanner-plus`

或

`$ yarn add expo-barcode-scanner`

`$ yarn add install expo-av`

`$ yarn add expo-barcode-scanner-plus`

或

`$ npm install expo-barcode-scanner --save`

`$ npm install expo-av --save`

`$ npm install expo-barcode-scanner-plus --save`

## Usage
```javascript

import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner-plus';


class TestPage extends Component {

    // 构造函数
    constructor(props, context) {
        super(props, context);

        this.state = {
            isScan: false,
        };
    }

    onStartPress = () => {
        this.requestPermissionsAsync().then(()=>{});
    };

    onStopPress = () => {
        this.setState({
            isScan: false,
        });
    };

    requestPermissionsAsync = async () => {
        let permis = await BarCodeScanner.getPermissionsAsync();
        if (permis["status"] !== "granted") permis = await  BarCodeScanner.requestPermissionsAsync();
        this.setState({
            isScan: permis["status"] === "granted",
        });
    }

    onBarCodeScanned = (result) => {
        console.log(result);
        alert("二维码内容: "+result["data"]);
    };

    render() {

        const {isScan} = this.state;

        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={{width:300, height:300, overflow:"hidden",justifyContent: 'center',
                        alignItems: 'center',}}>
                        {
                            <BarCodeScanner
                                onBarCodeScanned={ isScan ? this.onBarCodeScanned : null}
                                style={{width:300, height:300, backgroundColor:"red"}}
                            />
                        }
                    </View>
                    <TouchableOpacity onPress={this.onStartPress}>
                        <Text>点击开始</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onStopPress}>
                        <Text>点击停止</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default TestPage;
```
