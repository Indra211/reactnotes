import { PiPlusBold } from "react-icons/pi";
import "./SideMenu.css";
import { Label } from "../Label/Label";
import { Modal } from "../Modal/Modal";
import { useState } from "react";

export const SideMenu = ({ notesGroupData = [] }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="menuContainer">
      <div className="header">
        <p className="head">Pocket Notes</p>
        <button className="addBtn" onClick={openModal}>
          <PiPlusBold /> Create Notes Group
        </button>
      </div>
      {notesGroupData?.length > 0 && (
        <div className="content">
          {notesGroupData.map((item, index) => (
            <Label item={item} key={index} />
          ))}
        </div>
      )}
      <Modal show={showModal} setShow={closeModal} />
    </div>
  );
};
