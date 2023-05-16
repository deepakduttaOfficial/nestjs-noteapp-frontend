const api_url = import.meta.env.VITE_API_URL;
import axios from "axios";

interface SignUpInterface {
  name: string;
  email: string;
  password: string;
}

interface SignInInterface {
  email: string;
  password: string;
}

interface SignInResponse {
  data?: object;
  error?: string | string[];
}

// Set access_token to the localStorage
export const authenticate = (data: object) => {
  localStorage.setItem("auth", JSON.stringify(data));
};

// Get access_token for authenticate user
export const isAuthenticate = (): any => {
  const auth = localStorage.getItem("auth");
  if (!auth) return false;
  return JSON.parse(auth);
};

// Signup
export const signup = ({ name, email, password }: SignUpInterface) => {
  return axios
    .post(`${api_url}/signup`, {
      name,
      username: email,
      password,
    })
    .then((res) => {
      return { data: res.data };
    })
    .catch((error) => {
      console.log(error)
      return { error: error.response.data.message };
    });
};

// Sign in
export const signin = ({
  email,
  password,
}: SignInInterface): Promise<SignInResponse> => {
  return axios
    .post(`${api_url}/signin`, {
      username: email,
      password,
    })
    .then((res) => {
      return { data: res.data };
    })
    .catch((error) => {
      return { error: error.response.data.message };
    });
};

// Logout
export const logout = (next: () => void) => {
  const auth = localStorage.getItem("auth");
  if (!auth) {
    return null;
  }
  localStorage.removeItem("auth");
  next();
};
