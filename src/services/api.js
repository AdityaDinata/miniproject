const API_URL = import.meta.env.VITE_MOCKAPI_URL;

// Fungsi untuk mengambil semua pengguna
export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error("Gagal mengambil data pengguna");
  }
  return response.json();
};

// Fungsi untuk mendaftar pengguna baru
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Registrasi gagal");
  }

  return response.json();
};

// Fungsi untuk mengambil kebiasaan pengguna
export const fetchUserHabits = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}/habits`);
  if (!response.ok) {
    throw new Error("Gagal mengambil data kebiasaan");
  }
  return response.json();
};

// Fungsi untuk menyimpan kebiasaan pengguna
export const saveUserHabit = async (userId, habit) => {
  const response = await fetch(`${API_URL}/users/${userId}/habits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(habit),
  });

  if (!response.ok) {
    throw new Error("Gagal menyimpan kebiasaan");
  }

  return response.json();
};

// Fungsi untuk memperbarui status kebiasaan
export const updateHabitStatus = async (userId, habitId, updatedHabit) => {
  const response = await fetch(`${API_URL}/users/${userId}/habits/${habitId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedHabit),
  });

  if (!response.ok) {
    throw new Error("Gagal memperbarui status kebiasaan");
  }

  return response.json();
};

// Fungsi untuk mengedit kebiasaan pengguna
export const editUserHabit = async (userId, habitId, updatedHabit) => {
  const response = await fetch(`${API_URL}/users/${userId}/habits/${habitId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedHabit),
  });

  if (!response.ok) {
    throw new Error("Gagal mengedit kebiasaan");
  }

  return response.json();
};

// Fungsi untuk menghapus kebiasaan pengguna
export const deleteUserHabit = async (userId, habitId) => {
  const response = await fetch(`${API_URL}/users/${userId}/habits/${habitId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Gagal menghapus kebiasaan");
  }

  return response.json();
};
