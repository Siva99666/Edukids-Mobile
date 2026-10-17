# EduKids Mobile — Android Application

Native Android application for the **EduKids** School Management & Performance Platform, built with React Native and Expo SDK 57.

---

## 🚀 Quick Start

### 1. Start the Development Server
From this directory:
```bash
npx expo start
```
Or:
```bash
npm start
```

### 2. Run on Your Android Device (Instant Preview)
1. Install **Expo Go** from the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) on your Android phone or tablet.
2. Ensure your phone and development computer are on the same Wi-Fi network (or use Tunnel mode: `npx expo start --tunnel`).
3. Open Expo Go and **scan the QR code** printed in your terminal or browser console.
4. The EduKids native mobile app will immediately load on your phone!

### 3. Run in Web Browser
```bash
npm run web
```

---

## 📦 How to Build a Standalone Android `.apk`
To generate an installable Android APK file without needing Android Studio or Java installed locally:

```bash
# 1. Install EAS CLI globally if you haven't yet
npm install -g eas-cli

# 2. Log in with your free Expo account
eas login

# 3. Configure EAS Build
eas build:configure

# 4. Trigger cloud build to get a direct download link for your .apk
eas build -p android --profile preview
```
Once the cloud build finishes (usually 3–5 minutes), EAS will give you a direct download link and QR code to download the standalone `.apk` directly onto your Android phone.

---

## 🧪 Demo Login Credentials

You can tap the quick demo buttons on the login screen or manually enter:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Student** | `arjun@greenvalley.edu` | `student123` |
| **Teacher** | `priya@greenvalley.edu` | `teacher123` |
| **Admin** | `admin@greenvalley.edu` | `admin123` |

---

## 📱 Features by Role

* **Student Portal**:
  * Daily Overview & Welcome Banner with class/grade badges.
  * Homework feed with status tags (Completed / Pending) and one-tap Mark as Done.
  * Weekly quiz and evaluation assessment modules.
  * Cumulative GPA/scores, attendance tracking, and subject grade breakdown.
* **Parent Portal**:
  * Real-time child snapshot (Roll number, average grade, attendance rate).
  * Day-by-day attendance history with verified teacher checkmarks.
  * Homework verification and monitoring.
* **Teacher Portal**:
  * Class roster switcher and active homework count.
  * Homework manager and assignment publisher.
  * Roll-call attendance marker.
* **Admin Portal**:
  * Live school KPI counters (Students, Teachers, Classes).
  * Interactive Join Requests management with one-tap **Approve** and **Reject** buttons.
* **Backend Flexibility**:
  * Tap **"Configure Server URL"** on the login screen to point the app to your deployed Railway API or local backend.
