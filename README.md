# 📥 InboxSage

**Smart email triage for busy professionals.**  
InboxSage cuts through inbox chaos by filtering, summarizing, and helping you reply faster — all powered by AI.


---

## 🛠️ Tech Stack

- **Frontend:** Next.js + Tailwind CSS  
- **Backend/API:** Next.js API Routes, OpenAI  
- **Email Integration:** Gmail API (OAuth2)  
- **Database:** MongoDB  
- **Auth:** NextAuth.js  
- **AI Tools:** OpenAI API + GROQ

---

## 📦 Installation

> Set up InboxSage locally in just a few steps.
## 1. Clone the Repository

```bash
git clone https://github.com/your-org/inboxsage.git
cd inboxsage
```
## 2. Set Up Google OAuth & Gmail API
#### Go to the Google Cloud Console Create a new project (or select an existing one)
#### Navigate to APIs & Services > Library:
#### Search for and enable the Gmail API
#### Go to APIs & Services > OAuth consent screen:
#### Configure the consent screen (select External or Internal as appropriate)
#### Add the email address(es) you will use to test the app as Test Users
#### Fill in required info like app name and scopes (at minimum Gmail scopes)
#### Go to Credentials > Create Credentials > OAuth client ID:
#### Choose Web application
#### Add your authorized redirect URIs, e.g., http://localhost:3000/api/auth/callback/google
#### Save your Client ID and Client Secret
## 3. Create a .env.local File
#### In the project root, create a .env.local file and add the following keys:

### Google OAuth Credentials
CLIENT_ID=your_google_oauth_client_id
CLIENT_SECRET=your_google_oauth_client_secret

### NextAuth secret (generate with `openssl rand -base64 32`)
NEXTAUTH_SECRET=your_generated_secret_key

### MongoDB connection string
MONGODB_URI=your_mongodb_connection_string

### GROQ API key for AI
GROQ_API_KEY=your_groq_api_key

## 4. Install Dependencies
```bash
npm install
```
## 5. Run the Development Server
```bash
npm run dev
```
## Open http://localhost:3000 in your browser.



