const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function userLogIn(userEmail: string, userPassword: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email: userEmail, password: userPassword }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || "Failed to log-in");
  }

  return await response.json();
}