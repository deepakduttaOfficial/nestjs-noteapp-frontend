const api_url = import.meta.env.VITE_API_URL;
import axios from "axios";

// interfaces
interface CreatePost {
  title: string;
  description: string;
  token: string;
}
interface CreatePostResponse {
  data?: any;
  error?: string | string[];
}

// Create Note
export const createPost = ({
  title,
  description,
  token,
}: CreatePost): Promise<CreatePostResponse> => {
  return axios({
    url: `${api_url}/note/create`,
    method: "post",
    data: { title, description },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return { data: res.data };
    })
    .catch((error) => {
      return { error: error.response.data.message };
    });
};

// Get all post based on Note
export const getAllPost = (token: string): Promise<CreatePostResponse> => {
  return axios({
    url: `${api_url}/note/gets`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return { data: res.data };
    })
    .catch((error) => {
      return { error: error.response.data.message };
    });
};

// Get single Note
export const getSinglePost = (token: string, id: any): Promise<any> => {
  return axios({
    url: `${api_url}/note/get/${id}`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return { data: res.data };
    })
    .catch((error) => {
      return { error: error.response.data.message };
    });
};

// Update note
export const updateNote = ({
  title,
  description,
  token,
  id,
}: any): Promise<any> => {
  return axios({
    url: `${api_url}/note/update/${id}`,
    method: "put",
    data: { title, description },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return { data: res.data };
    })
    .catch((error) => {
      return { error: error.response.data.message };
    });
};

// Remove note

export const removeNote = ({ token, id }: any): Promise<any> => {
  return axios({
    url: `${api_url}/note/remove/${id}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return { data: res.data };
    })
    .catch((error) => {
      return { error: error.response.data.message };
    });
};
