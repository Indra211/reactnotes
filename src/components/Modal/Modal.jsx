import { useState } from "react";
import { colors } from "../../utils/color";
import "./Modal.css";
import { StoreData } from "../../utils/storage";
import { useDispatch, useSelector } from "react-redux";
import { updateNotesGrp } from "../../redux/features";

export const Modal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  let { note_grp_update } = useSelector((state) => state.notes);
  const [formData, setFormData] = useState({ name: "", color: "" });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.color) {
      return alert("Please Select Color");
    }
    StoreData("notesGroup", formData);
    dispatch(updateNotesGrp((note_grp_update += "u")));
    setFormData({ name: "", color: "" });
    onClose();
  };
  const onClose = () => {
    setFormData({ name: "", color: "" });
    setShow(!show);
  };
  return (
    show && (
      <div className="modalOverlay" onClick={onClose}>
        <div className="modalContent" onClick={(e) => e.stopPropagation()}>
          <button className="closeButton" onClick={onClose}></button>
          <div style={{ display: "flex", gap: 20, flexDirection: "column" }}>
            <p style={{ fontWeight: "bolder" }}>Create New Notes group</p>
            <form
              style={{ display: "flex", gap: 20, flexDirection: "column" }}
              onSubmit={onSubmit}
            >
              <div>
                <label htmlFor="inputText" style={{ fontWeight: "bolder" }}>
                  Group Name{" "}
                </label>
                <input
                  value={formData.name}
                  required
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  id={"inputText"}
                  placeholder="Enter your group name here... "
                  style={{
                    borderRadius: 12,
                    padding: 12,
                    width: "70%",
                    borderWidth: 1,
                  }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <p style={{ fontWeight: "bolder" }}>Choose colour</p>
                <div style={{ display: "flex", gap: 10 }}>
                  {colors.map((item, index) => (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setFormData((prev) => ({ ...prev, color: item }));
                      }}
                      key={index}
                      style={{
                        height: 20,
                        width: 20,
                        borderRadius: 10,
                        backgroundColor: item,
                        border:
                          formData.color === item ? "1px solid black" : "none",
                        cursor: "pointer",
                      }}
                    ></button>
                  ))}
                </div>
              </div>
              <button type="submit" className="submitBtn">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};
