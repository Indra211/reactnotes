import "./App.css";
import {
  RemoveDataWithKey,
  RetriveData,
  StoreData,
  StoreGrpTextData,
} from "./utils/storage";
import { SideMenu } from "./components/SideMenu/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Label } from "./components/Label/Label";
import { IoSend } from "react-icons/io5";
import { formatDate } from "./utils/const";
import { NoteView } from "./components/NoteView/NoteView";
import { FaArrowLeft } from "react-icons/fa";
import { updateDisplay } from "./redux/features";
import { useGetWidth } from "./components/GetWidth";
import notesImg from "./assets/notes.png";
import { BiLock } from "react-icons/bi";

const App = () => {
  const { width } = useGetWidth();
  const dispatch = useDispatch();
  const { note_grp_update, selectedGrp, display } = useSelector(
    (state) => state.notes
  );
  let [addUpdate, setAddUpdate] = useState("");
  const [notesGroups, setNotesGroups] = useState([]);
  const [notes, setNotes] = useState("");
  const [notesData, setNotesData] = useState([]);
  useEffect(() => {
    const note_data = RetriveData(`${selectedGrp?.name}-note`);
    setNotes(note_data ? note_data : "");
  }, [selectedGrp?.name]);
  useEffect(() => {
    const notesGroup = RetriveData("notesGroup");
    setNotesGroups(notesGroup);
  }, [note_grp_update]);

  useEffect(() => {
    const noteData = RetriveData(selectedGrp?.name);
    setNotesData(noteData || []);
  }, [selectedGrp, addUpdate]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (notes) {
      StoreData(selectedGrp?.name, {
        note: notes,
        date: formatDate(new Date()),
      });
      RemoveDataWithKey(`${selectedGrp?.name}-note`);
      setNotes("");
      setAddUpdate((prev) => (prev += "u"));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(e);
    }
  };
  const handleArrow = () => {
    dispatch(updateDisplay({ notes: "flex", noteView: "none" }));
  };
  return (
    <div className="container">
      <div
        className="menu"
        style={{ display: width < 500 ? display.notes : "flex" }}
      >
        <SideMenu notesGroupData={notesGroups} />
      </div>
      <div
        className={selectedGrp?.name ? "notes" : "notesEmpty"}
        style={{
          display: width < 500 ? display.noteView : "flex",
        }}
      >
        {selectedGrp?.name ? (
          <>
            <div className="notesHead">
              <div
                style={{
                  borderWidth: 1,
                  padding: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                {width < 500 && (
                  <span>
                    <FaArrowLeft color="gray" onClick={handleArrow} />
                  </span>
                )}
                {selectedGrp?.name && <Label head={true} item={selectedGrp} />}
              </div>
            </div>
            <div className="notesView">
              {notesData?.length > 0 &&
                notesData?.map((item) => <NoteView key={item} item={item} />)}
            </div>
            <div className="textInput">
              <form onSubmit={onSubmit} className="formData">
                <textarea
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value);
                    StoreGrpTextData(
                      `${selectedGrp?.name}-note`,
                      e.target.value
                    );
                  }}
                  className="textarea"
                  placeholder="Enter Your Notes here..."
                  rows={10}
                  onKeyDown={handleKeyDown}
                />
                <button type="submit" className="submitFormBtn">
                  <IoSend color={notes ? "blue" : "grey"} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            <img src={notesImg} alt="img" style={{ height: 220 }} />
            <h1>Pocket Notes</h1>
            <p>
              Send and receive messages without keeping your phone online. Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
            <p
              style={{
                position: "absolute",
                bottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <BiLock /> end-to-end encrypted
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
