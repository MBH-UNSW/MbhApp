# Getting Started 🚀

## 1. Clone the Repository

```bash
git clone https://github.com/MBH-UNSW/MbhApp.git
```

```bash
cd MbhApp
npm i
```

## 2. Requirements
> ⚠️ This guide is currently written for macOS users (my deepest apologies for Andriod ppl 😭)

### IOS 🍎
To run the app on iOS, you need:
- Xcode

#### Setup Xcode
1. Download and install Xcode
2. Open Xcode
3. Open the iOS Simulator:
    - In the top menu: **Xcode → Open Developer Tools → Simulator**

### Android Users 🤖
If you're using Android:
*👉 Pls help update this section!*

Thank you, our favorite future Andriod user ❤️

## 3. Run the App (First Time)
```bash
npm run ios
```

#### If It Doesn’t Work 😅
*because mine also doesn't work at the start*

Try ***resetting iOS dependencies***:
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npm run ios
```

## 4. Running After Setup
Once everything is working, you can simply run:
```bash
npm run start
```

---
## Tips 💡
- Make sure your Simulator is running before starting the app.
- If you run into issues, try restarting the Simulator or your terminal.
- Always pull the latest changes:
```
git pull origin main
```
---

**Happy UBH Frontend Software Team!**
