const API_BASE_URL = 'http://localhost:8080'; // Configure as needed or use env var

/**
 * Common fetch wrapper handling JSON parsing and error checking.
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  console.log(`[API Request] ${config.method || 'GET'} ${url}`, config.body);

  try {
    const response = await fetch(url, config);
    console.log(`[API Response Status] ${response.status} ${url}`);

    // Handle 204 No Content (Delete)
    if (response.status === 204) {
      return null;
    }

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      console.warn("[API] Failed to parse JSON", text, e);
      data = {};
    }

    console.log(`[API Response Body]`, data);

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'An error occurred',
        errors: data.errors, // For validation errors
      };
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${url}`, error);
    // If it's a network error or something else not thrown above
    if (!error.status) {
      throw {
        status: 500,
        message: error.message || 'Network Error (Is the backend running on port 8080?)',
      };
    }
    throw error;
  }
}

export const api = {
  // 1. HOME PAGE - PUBLIC FEED
  getPosts: () => request('/posts'),

  // 2. VIEW POST PAGE
  getPostById: (id) => request(`/posts/${id}`),

  // 3. CREATE POST
  createPost: (payload) => request('/posts', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),

  // 4. MANAGE POSTS
  getAllPostsRaw: () => request('/posts/all'),
  getDraftPosts: () => request('/posts/draft'),

  // 5. EDIT POST
  updatePost: (id, payload) => request(`/posts/${id}`, {
    method: 'PUT', // or PATCH depending on strictness, assuming PUT for full update as per "Updated PostResponse"
    body: JSON.stringify(payload),
  }),

  // 6. PUBLISH POST
  publishPost: (id) => request(`/posts/${id}/publish`, {
    method: 'POST',
  }),

  // 7. DELETE POST
  deletePost: (id) => request(`/posts/${id}`, {
    method: 'DELETE',
  }),
};
