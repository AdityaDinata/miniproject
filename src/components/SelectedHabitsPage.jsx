import React, { useEffect, useState } from "react";
import { Table, Button, Checkbox } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function SelectedHabitsPage() {
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedForCompletion, setSelectedForCompletion] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login"); // Redirect to login if user is not logged in
    } else {
      fetchHabits(userId);
    }
  }, [navigate]);

  const fetchHabits = async (userId) => {
    try {
      const response = await fetch(
        `https://673617b15995834c8a9565e6.mockapi.io/users/${userId}/habits`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch habits");
      }
      const data = await response.json();
      setSelectedHabits(data || []); // Set the received data
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Handle checkbox change for marking habits as "completed"
  const handleCheckboxChange = (habitId, checked) => {
    setSelectedForCompletion((prevSelected) =>
      checked
        ? [...prevSelected, habitId] // Add to selected list
        : prevSelected.filter((id) => id !== habitId) // Remove from selected list
    );
  };

  // Handle "Mark as Completed" button click
  const markAsCompleted = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId || selectedForCompletion.length === 0) return;

    try {
      const updatePromises = selectedForCompletion.map(async (habitId) => {
        const habit = selectedHabits.find((habit) => habit.id === habitId);
        const updatedHabit = { ...habit, status: "selesai" };

        const response = await fetch(
          `https://673617b15995834c8a9565e6.mockapi.io/users/${userId}/habits/${habitId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedHabit),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update habit status");
        }
        return await response.json();
      });

      await Promise.all(updatePromises);

      // Fetch updated habits after successful update
      fetchHabits(userId);
      setSelectedForCompletion([]); // Clear the selected items
      alert("Selected habits marked as completed!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-500 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Your Selected Habits
        </h2>

        {loading && <p>Loading habits...</p>}
        {error && (
          <div>
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => fetchHabits(localStorage.getItem("userId"))}
              className="text-blue-500 mt-2"
            >
              Retry
            </button>
          </div>
        )}

        {selectedHabits.length > 0 ? (
          <>
            <Table hoverable={true}>
              <Table.Head>
                <Table.HeadCell>Habit Name</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Mark as Completed</Table.HeadCell>
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
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            {selectedForCompletion.length > 0 && (
              <div className="mt-4 text-center">
                <Button
                  className="bg-green-500 hover:bg-green-600"
                  onClick={markAsCompleted}
                >
                  Mark as Completed
                </Button>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-700">No selected habits found.</p>
        )}
      </div>
    </div>
  );
}

export default SelectedHabitsPage;
