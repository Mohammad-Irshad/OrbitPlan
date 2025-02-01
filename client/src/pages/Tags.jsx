import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTag, getAllTags } from "../app/features/tagsSlice";

const Tags = () => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const dispatch = useDispatch();
  const { allTags } = useSelector((state) => state.tags);
  console.log(allTags);

  const handleAddTag = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(addNewTag(formData));
  };

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  return (
    <div>
      <section>
        <div className="row">
          <div className="col-md-6">
            <h2>Add a New Tag</h2>
            <form onSubmit={handleAddTag}>
              <label className="form-label">Tag Name</label>
              <input
                className="form-control"
                type="text"
                required
                onChange={(e) => setFormData({ name: e.target.value })}
              />
              <button type="submit" className="btn btn-primary mt-3">
                Add Tag
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <h2>Existed Tags</h2>
            <div>
              {allTags.map((tag, index) => (
                // <span key={index} className="badge badge-pill badge-secondary m-1">
                //     {tag.name}
                // </span>
                <span key={index} class="badge text-bg-success mx-1 fs-6 mb-2">
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tags;
