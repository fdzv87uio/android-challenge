## How to Run the Local Server 🚀

This project uses Expo, which simplifies the development process for React Native applications. To get the project up and running, you'll need to follow a few simple steps.

Prerequisites

First, ensure you have Node.js installed on your system. You can download it from the official Node.js website. This will also install npm (Node Package Manager).

If you prefer using Yarn, you can install it globally with npm install -g yarn.

Installation

Before you can run the local server, you need to install the project dependencies. In your terminal, navigate to the project's root directory and run one of the following commands:

    Using npm:
    Bash

npm install

Using Yarn:
Bash

    yarn install

These commands will install all the packages listed under dependencies and devDependencies in the package.json file.

Running the Project

Once the dependencies are installed, you can start the development server using one of the following scripts defined in the package.json file.

    To start the server and open the Expo Developer Tools in your browser, run:
    Bash

npm start
# or
    yarn start

To run the app on an Android emulator or device, run:
Bash

    npm run android
# or
    yarn android

To run the app on an iOS simulator or device, run:
Bash

    npm run ios
# or
    yarn ios

To run the app as a web application in your browser, run:
Bash

    npm run web
# or
    yarn web

adb logcat | grep "com.fdzv87uio.androidchallenge"