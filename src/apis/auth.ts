// src/api/auth.ts
export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: "azam",
          email,
          username: "azam",
          password,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Save access token and refresh token in local storage or cookies
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      return data;
    } else {
      throw new Error(data.message || "Failed to log in");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
