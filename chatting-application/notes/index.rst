AuthContext.js -
Creates a global authentication context
Stores the login token
Decodes the token to get the userId
Persists login using AsyncStorage
Makes auth data available across the whole app

Step 1 — Create Context
const AuthContext = createContext();

This creates a global container where authentication data will be stored.

Think of it like a global storage box.

AuthProvider Component
const AuthProvider = ({ children }) => {
This component wraps your entire app.

Example:
<AuthProvider>
  <MainNavigator />
</AuthProvider>

Everything inside it can access the auth data.

5️⃣ Authentication State
const [token, setToken] = useState("");
const [userId, setUserId] = useState("");

These store:

Variable	Purpose
token	JWT authentication token
userId	user identifier extracted from token
6️⃣ Auto Login with AsyncStorage
const storedToken = await AsyncStorage.getItem("authToken");

AsyncStorage stores the token locally on the device.

So when the app restarts:

user doesn't need to login again

Example stored token:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
7️⃣ Decode JWT Token
const decodedToken = jwtDecode(storedToken);
setUserId(decodedToken.userId);

JWT contains information inside it.

Example payload:

{
  "userId": "665d9a3f82c31f3c",
  "iat": 1714533333
}

jwtDecode() extracts the userId.

8️⃣ useEffect Runs on App Start
useEffect(() => {
  fetchUser();
}, []);

This runs once when the app loads.
It checks:\
Is user already logged in?
If yes → restore session.


useLayoutEffect is similar to useEffect, but it runs synchronously after DOM/UI updates and before the screen is painted, making it useful for layout measurements or UI updates that must happen before the user sees them.
In simple words:

👉 useEffect → runs after the screen is updated and painted
👉 useLayoutEffect → runs before the screen is shown to the user

Difference Between useEffect vs useLayoutEffect
Hook	                  Runs When	                       Use Case
useEffect	            After render & paint	           API calls, logging, timers
useLayoutEffect	      After render but before paint	   layout measurement, navigation header updates