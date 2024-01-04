// @flow
import React from 'react';
import { Video } from 'expo-av';
import QrScanner from 'qr-scanner';

export default class ExpoBarCodeScannerView extends React.Component<object> {

    qrScanner;

    constructor(props, context) {
        super(props, context);

        this.state = {};

        this.qrScanner = null;
    }

    componentDidMount() {
        this.onStartScanner().then(()=>{});
    }

    componentWillUnmount() {
        this.onStopScanner();
    }

    shouldComponentUpdate(nextProps: Readonly<object>, nextState: Readonly<{}>, nextContext: any): boolean {
        if (!nextProps?.["onBarCodeScanned"]) {
            this.onStopScanner();
        } else {
            setTimeout(()=>{
                this.onStartScanner().then(()=>{});
            }, 200)
        }
        return true;
    }


    // 启动扫描器
    onStartScanner = async () => {
        // @ts-ignore
        const { onBarCodeScanned, barCodeTypes, type} = this.props;

        if (!onBarCodeScanned) {
            return;
        }

        const hasCamera = await QrScanner.hasCamera();
        if (!hasCamera) {
            console.log("===>没有发现摄像机")
            return;
        }

        const preferredCamera = type === "front" ? "user" : "environment";

        this.qrScanner = new QrScanner(
            document.querySelector('video'),
            (result) => {
                if (result["data"] && result["data"].length > 0 && onBarCodeScanned) {
                    result["type"] = "";
                    result["bounds"] = {};
                    // console.log('===>decoded qr code:', result);
                    onBarCodeScanned(result);
                }
            },
            {
                returnDetailedScanResult: true,
                preferredCamera: preferredCamera,
                // highlightScanRegion: true,
                // highlightCodeOutline: true,
                calculateScanRegion:(video)=>{
                    return {
                        x: 0,
                        y: 0,
                        width: video.offsetWidth,
                        height: video.offsetHeight,
                        downScaledWidth: video.offsetWidth,
                        downScaledHeight: video.offsetHeight,
                    };
                },
            }
        );
        this.qrScanner.start();
    }

    // 停止扫描器
    onStopScanner = async () => {
        if (this.qrScanner) {
            this.qrScanner.stop();
            this.qrScanner.destroy();
            this.qrScanner = null;
        }
    }


  render() {
    return (
        <Video
            {...this.props}
        />
    );
  }
}
