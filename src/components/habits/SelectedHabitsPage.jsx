import React, { useEffect, useState } from "react";
import { Table, Button, Checkbox, Spinner, Modal, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import useHabits from "../../hooks/useHabits";
import { fetchUserHabits, updateHabitStatus, editUserHabit, deleteUserHabit } from "../../services/api";
import AppNavbar from "../layout/Navbar";

const SelectedHabitsPage = () => {
  const navigate = useNavigate();
  const { setAllHabits } = useHabits();
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedForCompletion, setSelectedForCompletion] = useState([]);
  const [editingHabit, setEditingHabit] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    } else {
      fetchHabits(user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchHabits = async (userId) => {
    setLoading(true);
    try {
      const habitsData = await fetchUserHabits(userId);
      setAllHabits(habitsData);
      setSelectedHabits(habitsData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching habits:", err);
      setError("Gagal mengambil data kebiasaan");
      setLoading(false);
    }
  };

  const handleCheckboxChange = (habitId, checked) => {
    setSelectedForCompletion((prevSelected) =>
      checked
        ? [...prevSelected, habitId]
        : prevSelected.filter((id) => id !== habitId)
    );
  };

  const markAsCompleted = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || selectedForCompletion.length === 0) return;

    setLoading(true);
    try {
      const updatePromises = selectedForCompletion.map((habitId) => {
        const habit = selectedHabits.find((h) => h.id === habitId);
        const updatedHabit = { ...habit, status: "selesai" };
        return updateHabitStatus(user.id, habitId, updatedHabit);
      });

      await Promise.all(updatePromises);
      alert("Kebiasaan yang dipilih telah ditandai sebagai selesai!");
      fetchHabits(user.id);
      setSelectedForCompletion([]);
    } catch (err) {
      console.error("Error updating habits:", err);
      setError("Gagal memperbarui status kebiasaan");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    setNewHabitName(habit.habit_name);
    setEditModalVisible(true);
  };

  const saveEdit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !editingHabit) return;

    setLoading(true);
    try {
      await editUserHabit(user.id, editingHabit.id, {
        ...editingHabit,
        habit_name: newHabitName,
      });
      alert("Kebiasaan berhasil diperbarui!");
      setEditModalVisible(false);
      fetchHabits(user.id);
    } catch (err) {
      console.error("Error editing habit:", err);
      setError("Gagal mengedit kebiasaan");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (habitId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    if (window.confirm("Anda yakin ingin menghapus kebiasaan ini?")) {
      setLoading(true);
      try {
        await deleteUserHabit(user.id, habitId);
        alert("Kebiasaan berhasil dihapus!");
        fetchHabits(user.id);
      } catch (err) {
        console.error("Error deleting habit:", err);
        setError("Gagal menghapus kebiasaan");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-500">
      <AppNavbar />
      <div className="flex flex-col items-center justify-center py-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Kebiasaan yang Dipilih
        </h2>

        {loading ? (
          <Spinner size="xl" />
        ) : error ? (
          <div>
            <p className="text-red-500">{error}</p>
            <Button onClick={() => fetchHabits(JSON.parse(localStorage.getItem("user")).id)} className="mt-2">
              Retry
            </Button>
          </div>
        ) : selectedHabits.length > 0 ? (
          <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
            <Table hoverable={true}>
              <Table.Head>
                <Table.HeadCell>Habit Name</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Mark as Completed</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {selectedHabits.map((habit) => (
                  <Table.Row key={habit.id}>
                    <Table.Cell>{habit.habit_name || "No Name"}</Table.Cell>
                    <Table.Cell>{habit.status || "belum selesai"}</Table.Cell>
                    <Table.Cell>
                      {habit.status !== "selesai" && (
                        <Checkbox
                          id={`habit-checkbox-${habit.id}`}
                          checked={selectedForCompletion.includes(habit.id)}
                          onChange={(e) =>
                            handleCheckboxChange(habit.id, e.target.checked)
                          }
                        />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        size="xs"
                        className="mr-2"
                        onClick={() => handleEdit(habit)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="xs"
                        color="failure"
                        onClick={() => handleDelete(habit.id)}
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <div className="flex justify-between mt-6">
              <Button
                className="bg-green-500 text-white"
                onClick={markAsCompleted}
              >
                Tandai Selesai
              </Button>
              <Button
                className="bg-blue-500 text-white"
                onClick={() => navigate("/landing-pengguna")}
              >
                Tambah Kebiasaan
              </Button>
            </div>
          </div>
        ) : (
          <p>Tidak ada kebiasaan yang dipilih.</p>
        )}

        {editModalVisible && (
          <Modal
            show={editModalVisible}
            onClose={() => setEditModalVisible(false)}
          >
            <Modal.Header>Edit Kebiasaan</Modal.Header>
            <Modal.Body>
              <TextInput
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                placeholder="Masukkan nama kebiasaan"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={saveEdit}>Simpan</Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>

    </div>
  );
};

export default SelectedHabitsPage;
