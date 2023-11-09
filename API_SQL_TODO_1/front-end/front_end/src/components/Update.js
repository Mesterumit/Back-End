import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Update = ({ tasks, setTasks, axios }) => {
  const { id } = useParams();
  const [updateTitle, setUpdateTitle] = useState();
  const [updateDescription, setUpdateDescription] = useState();
  const [updatePriorty, setUpdatePriorty] = useState();
  const navigate = useNavigate();

  const updateTasks = async (id) => {
    // updateTasks function, which is responsible for sending
    // a PUT request to the backend to update a specific task's
    //  details. After updating the task in the backend, 
    //  the function then updates the state of the tasks
    //  array in the frontend with the newly modified data.
    await axios.put(`http://localhost:8080/${id}`, {
      title: updateTitle,
      description: updateDescription,
      priorty: updatePriorty,
    });

    // By using the spread operator (...item),
    //  you create a new object that retains all 
    //  the properties of the current item but allows
    //   you to override specific properties, such as title,
    //    description, and priority, with the updated values 
    //    stored in updateTitle, updateDescription, 
    //    and updatePriority.
    const updatedTasks = tasks.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          title: updateTitle,
          description: updateDescription,
          priorty: updatePriorty,
        };
      }
      return item;
    });

    setTasks(updatedTasks);
  };

  useEffect(() => {
    updateTasks(id);
  }, [id]);

  return (
    <div className="d-flex align-items-start flex-column mb-3"
    >
      <form  className="p-2 m-auto" onSubmit={() => updateTasks(id)}>
        <div>
            <label>Update Title</label>
          <div>
            <input
              type="text"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
          </div>
          <label>Update Description</label>
          <div>
            <input
              type="text"
              value={updateDescription}
              onChange={(e) => setUpdateDescription(e.target.value)}
            />
          </div>
          <label>Update Priorty</label>
          <div>
            <input
              type="text"
              value={updatePriorty}
              onChange={(e) => setUpdatePriorty(e.target.value)}
            />
          </div>
          <button className="btn btn-info mt-2 text-white" style={{marginLeft:'40px',width:'5rem'}}>Update</button>
        </div>
      </form>
      <button className="btn btn-secondary text-warning" style={{marginLeft:'41rem' , width:'5rem'}} onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default Update;
