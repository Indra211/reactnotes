import { useDispatch, useSelector } from "react-redux";
import { NamingFunction } from "../../utils/const";
import { StoreGrpTextData } from "../../utils/storage";
import { updateDisplay, updateSelectedGrp } from "../../redux/features";
import { useGetWidth } from "../GetWidth";

export const Label = ({ item, head = false }) => {
  const dispatch = useDispatch();
  const { width } = useGetWidth();
  const { selectedGrp } = useSelector((state) => state.notes);
  const handleGrp = () => {
    dispatch(updateSelectedGrp(item));
    StoreGrpTextData("selecetdGrp", item);
    if (width < 500) {
      dispatch(updateDisplay({ notes: "none", noteView: "flex" }));
    }
  };
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: "8px",
        borderTopLeftRadius: "32px",
        borderBottomLeftRadius: "32px",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor:
          width < 500
            ? null
            : head
            ? null
            : item?.name === selectedGrp?.name
            ? "#F7ECDC"
            : null,
      }}
      onClick={!head ? handleGrp : null}
    >
      <p
        style={{
          padding: width > 500 && width < 1080 ? "7.5px 6px" : "15px 12px",
          fontSize: width > 500 && width < 1080 ? "8px" : "16px",
          fontWeight: "bolder",
          background: item?.color,
          borderRadius: "100%",
          color: "white",
        }}
      >
        {NamingFunction(item?.name)}
      </p>
      <p style={{ color: "black", fontWeight: "bold" }}>{item?.name}</p>
    </div>
  );
};
