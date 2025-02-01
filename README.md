
---

# **Quiz It! 🧠🎉**  
A fun and exciting quiz app where you can test your knowledge across various categories!  

## 🚀 **Live Demo**  
👉 [**Quiz It! Live**]([#](https://quizyt.netlify.app/)) 

---

## 📌 **Features**  
✅ Play quizzes without signing in  
✅ Choose from multiple categories (General Knowledge, History, Science, Tech, etc.)  
✅ Track your progress with a personalized **scoreboard** (requires login)  
✅ Secure **user authentication** with Clerk  
✅ Leaderboard to compare scores with others  
✅ Responsive UI built with TailwindCSS  

---

## 🛠 **Tech Stack**  
### **Frontend:**  
- ⚡ **Vite + React.js** (Fast and optimized development)  
- 🎨 **TailwindCSS** (For modern and responsive UI)  
- 🔐 **Clerk** (User authentication & management)  

### **Backend:**  
- 🛢 **Supabase** (Database & user data storage)  
- 🚀 **Express.js** (Leaderboard API)  

---

## 🏗 **Setup & Installation**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/Temmarie/Quiz-it.git
cd Quiz-it
```

### **2️⃣ Install Dependencies**  
```bash
npm install
```

### **3️⃣ Set Up Environment Variables**  
Create a `.env` file in the root directory and add the following variables:  
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=your_backend_api_url
VITE_CLERK_SECRET_KEY=clerk_secret_key
```
_(Replace with actual keys from Supabase & Clerk)_  

### **4️⃣ Run the Development Server**  
```bash
npm run dev
```
The app will be available at **`http://localhost:5173/`** 🚀  

---

## 🔥 **Backend Setup (Leaderboard API)**  
The backend is powered by **Express.js**. Follow these steps to set it up: 

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/Temmarie/Quiz_iT_Express.git

cd Quiz-iT_Express
```

### **2️⃣ Install Dependencies**  
```bash
npm install
```

### **2️⃣ Install Backend Dependencies**  
```bash
npm install
```
### **3️⃣ Set Up Environment Variables**  
Create a `.env.server` file in the root directory and add the following variables:  
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=your_backend_api_url
VITE_CLERK_SECRET_KEY=clerk_secret_key

```
### **3️⃣ Start the Server**  
```bash
node server.js
```
Your API should now be running at **`http://localhost:3000/`**  

---

## 📷 **Screenshots**  
_(Add some screenshots of your app here!)_  

---

## 🤝 **Contributing**  
Feel free to fork the repo, create a new branch, and submit a pull request!  

---

## 📜 **License**  
This project is licensed under the **MIT License**.  

---

### 🎉 **Enjoy playing Quiz It! and test your knowledge!** 🧠🚀  

Let me know if you want any changes! 😊
