const API_BASE_URL = "http://localhost:3000/api";

const getToken = () => {
  return localStorage.getItem("jwtToken");
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { email, password } }),
  });
  return handleResponse(response);
};

export const getArticles = async (queryString = '') => {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/articles?${queryString}`, {
    method: "GET",
    headers: headers,
  });
  return handleResponse(response);
};

export const favoriteAnArticle = async (slug) => {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/articles/${slug}/favorite`, {
    method: "POST",
    headers: headers,
  });
  return handleResponse(response);
}

export const unfavoriteAnArticle = async (slug) => {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/articles/${slug}/favorite`, {
    method: "DELETE",
    headers: headers,
  });
  return handleResponse(response);
}

export const getArticle = async (slug) => {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/articles/${slug}`, {
    method: "GET",
    headers: headers,
  });
  return handleResponse(response);
};

export const followAuthor = async (username) => {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/profiles/${username}/follow`, {
    method: "POST",
    headers: headers,
  });
  return handleResponse(response);
};

export const unfollowAuthor = async (username) => {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/profiles/${username}/follow`, {
    method: "DELETE",
    headers: headers,
  });
  return handleResponse(response);
};

// TODO: Bug: the 'following' field is not returned correctly by this endpoint.
export const getProfile = async (username) => {
  const headers = { "Content-Type": "application/json" };

  const response = await fetch(`${API_BASE_URL}/profiles/${username}`, {
    method: "GET",
    headers: headers,
  });
  return handleResponse(response);
};
