import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    SafeAreaView,
    FlatList,
    Platform,
    Button
} from "react-native";
import {BleManager, Device, BleError, LogLevel} from "react-native-ble-plx";

type Props = {};

type State = {
    text: Array<string>,
    devicesList: Array<>,
    deviceState: string,
    device: Device
};

function arrayBufferToHex(buffer) {
    if (!buffer) return null;
    const values = new Uint8Array(buffer);
    let string = "";
    for (let i = 0; i < values.length; i += 1) {
        const num = values[i].toString(16);
        string += num.length == 1 ? "0" + num : num;
    }
    return string;
}

export default class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.serviceUUID = "0000FFE00-0000-1000-8000-00805F9B34FB";
        this.charUUID = "0000FFE2-0000-1000-8000-000805F9B34FB";
        this.UUID = "0x2901";
        this.state = {
            text: [],
            devicesList: [],
            deviceState: '',
            device: null
        };
        this.manager = new BleManager();
        this.device = null;
        this.test = ["1","2","3"]
    }

    /*
     * Fonction fournis par RN, quand le component sera monté, faire ce qui est à l'intérieur.
     */
    componentWillMount() {
        const subscription = this.manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                this._scan();
                subscription.remove();
            }
        }, true);
    }

    /*
     * fonction de scan es BLE disponible
     */
    _scan() {
        this._log("Started scanning...");
        this.manager.startDeviceScan(
            null,
            {
                allowDuplicates: true
            },
            (error, device) => {
                if (error) {
                    this._logError("SCAN", error);
                    return;
                }
                if (this.state.devicesList.every((item) => item !== device.name)) {
                    this._log("Device: " + device.name, device);
                    this._addToList(device.name);
                    if (device.name === 'ULtron-27C0') {
                        this._stopDeviceScan();
                        const msg = 'Connecting to ' + device.name;
                        this._log(msg);
                        this._deviceConnection(device);
                        this.device = new Device(device, this.manager);
                    }
                }
                this.delay();
            }
        );
    }

    _stopDeviceScan = () => {
        this._log('Stop scanning');
        this.manager.stopDeviceScan();
        this.setState({
            devicesList: []
        })
    };
    /*
     *logger du text à l'écran
     */
    _log = (text: string, ...args) => {
        const message = "[" + Date.now() % 10000 + "] " + text;
        this.setState({
            text: [message, ...this.state.text]
        });
    };
    /*
     * ajouter le nom d'un device à la liste (pas très fiable, peut manquer des device ayant le même nom)
     */
    _addToList = (device) => {
        this._log(device);
        this.setState({
            devicesList: [device, ...this.state.devicesList]
        });
    };
    /*
     * se connecter à un device
     */
    _deviceConnection = (device: Device) => {
        device.connect()
            .then((device) => {
                const msg = 'Discovering services and characteristics of ' + device.name + " " + device.id + " " + device.uuid;
                this._log(msg);
                return device.discoverAllServicesAndCharacteristics(device.id);
            })
            .then((device: Device) => {
                this.setState({
                    device: device
                });
                this._log("Logging shit");
                console.log(this.state);
                //device.writeCharacteristicWithResponseForService();
                //this._mappingFct(device);
                //this._log(this.tmp.id)
                // Do work on device with services and characteristics
            })
            .catch((error) => {
                // Handle errors
            });
    };
    _mappingFct = (array : Array) => {
        return array.map(param => {
            this._log(param);
        });
    };
    /*
     * logger les erreur à l'écran
     */
    _logError = (tag: string, error: BleError) => {
        this._log(
            tag +
            "ERROR(" +
            error.errorCode +
            "): " +
            error.message +
            "\nREASON: " +
            error.reason +
            " (att: " +
            error.attErrorCode +
            ", ios: " +
            error.iosErrorCode +
            ", and: " +
            error.androidErrorCode +
            ")"
        );
    };
    /*
     * créer un délai entre... ce qu'on veut
     */
    delay = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 5000);
        });
    };
    /*
     * Allumer LED
     */
    ledOn = () => {

    };
    /*
     * Éteindre LED
     */
    ledOff = () => {

    };
    /*
     * écrire message via serial
     */
    serialMessage = (msg) => {

    };

    /*
     * fonction de base de RN pour afficher le rendu
     */
    render() {
        return (
            <SafeAreaView
                style={styles.container}
            >
                <Button
                    onPress={() => {
                        this.setState({
                            text: [],
                            devicesList: [],
                            deviceState: ''
                        });
                    }}
                    title={"Clear"}
                />
                <Button
                    onPress={() => {
                        this._scan()
                    }}
                    title={"Start"}
                />
                <Button
                    onPress={() => {
                        this._stopDeviceScan()
                    }}
                    title={"Stop"}
                />
                <Button
                    onPress={() => {
                        this.ledOn()
                    }}
                    title={"LED ON"}
                />
                <Button
                    onPress={() => {
                        this.ledOff()
                    }}
                    title={"LED OFF"}
                />
                <FlatList
                    style={styles.container}
                    data={this.state.text}
                    renderItem={({item}) => <Text> {item} </Text>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView>
        );
    }
}
/*
 * pour avoir du style et mettre de jolie couleur
 */
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
