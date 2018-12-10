# Tutoriel React Native avec Bluetooth Low Energy pour Android/iOS

Tutoriel pour la création d'une application React Native communiquant avec des modules Bluetooth Low Energy (BLE) pour Android/iOS. Les bases sont les mêmes pour une application iOS.

## À propos de ce tutoriel
Les technologies avançant très rapidement et tous modules n'étant pas mis à jour aussi régulièrement, des incompatibilités peuvent se créer au fil du temps. Dans le dossier de l'application servant d'exemple vous trouverez le fichier package.json qui contient les versions des modules utilisés lors de la réalisation de ce tutoriel. Vous pouvez modifier votre propre fichier package.json pour y modifier les versions que vous utilisez et donc retrouver la compatibilité des modules que j'ai utilisés. Notez toutefois qu'utiliser d'ancienne version peut rendre votre application plus à risque, les mises à jour servent souvent à supprimer des failles de sécurité.

Ce tutoriel a été réalisé avec ces environnements suivants :

Windows 10 :

- Terminal de commande : 
    - PowerShell
- IDE : 
    - VSCode et/ou WebStorm
    - Android Studio

## Prérequis
*Voir [tutorial](https://github.com/KerberosMorphy/rn-hello-world-java-cpp) sur la création d'une application RN utilisant du code Java et C++*


## Créer votre application

Initialisez votre application
```shell
react-native init VotreApp
```
```shell
cd VotreApp
```
Importer le module ```react-native-ble-plx```
```shell
npm install --save react-native-ble-plx
```
```shell
react-native link react-native-ble-plx
```


## FAQ

- Problème : *Cannot find module 'asap/raw'*
 
  Solution : Supprimer le dossier node_modules, faire ```npm install```

- Problème :  *Manifest merger failed : uses-sdk:minSdkVersion 16 cannot be smaller than version 18 declared in library*

  Solution : Ouvrir ```build.gradle```, modifier minSdkVersion pour **18**

## Bibliographie
- [Kerberos Morphy RN-Hello-World-Java-C++](https://github.com/KerberosMorphy/rn-hello-world-java-cpp)
- [React Native BLE PLX](https://polidea.github.io/react-native-ble-plx/)
- [Martyn Currey HM-10](http://www.martyncurrey.com/hm-10-bluetooth-4ble-modules/)
- [StackOverflow](https://stackoverflow.com/questions/50137867/send-data-using-react-native-ble-plx-package)
## Licence
```
MIT License

Copyright (c) 2018 Benoit Verret, Assistyv

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
