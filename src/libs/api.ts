const API_URL = process.env.BACKEND_URL;

if (!API_URL) {
  console.error('BACKEND_URL is not defined');
}

export async function fetchWithAuth(url: string, token: string, options?: RequestInit) {
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });
}

export async function getCampgrounds() {
  try {
    const res = await fetch(`${API_URL}/campgrounds`);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch campgrounds: ${res.status} ${errorText}`);
    }
    return await res.json();
  } catch (err) {
    console.error('Error in getCampgrounds:', err);
    throw err;
  }
}

export async function getCampground(id: string) {
  const res = await fetch(`${API_URL}/campgrounds/${id}`);
  if (!res.ok) throw new Error('Failed to fetch campground');
  return res.json();
}

export async function createBooking(campgroundId: string, bookingDate: string, token: string) {
  const res = await fetchWithAuth(`${API_URL}/campgrounds/${campgroundId}/bookings`, token, {
    method: 'POST',
    body: JSON.stringify({ bookingDate }),
  });
  if (!res.ok) throw new Error('Failed to create booking (Maximum 3 Bookings)');
  return res.json();
}

export async function getBookings(token: string) {
  const res = await fetchWithAuth(`${API_URL}/bookings`, token);
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
}

export async function updateBooking(
  bookingId: string,
  campgroundId: string,
  bookingDate: string,
  token: string
) {
  const res = await fetchWithAuth(`${API_URL}/bookings/${bookingId}`, token, {
    method: 'PUT',
    body: JSON.stringify({ campground: campgroundId, bookingDate }),
  });
  if (!res.ok) throw new Error('Failed to update booking');
  return res.json();
}

export async function deleteBooking(bookingId: string, token: string) {
  const res = await fetchWithAuth(`${API_URL}/bookings/${bookingId}`, token, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete booking');
  return res.json();
}

export async function registerUser(userData: { name: string; telephone: string; email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.msg || 'Registration failed');
  }
  return res.json();
}