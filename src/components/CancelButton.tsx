import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import batLogo from "../assets/batman-silhouette-svgrepo-com.svg";
import { setPress } from "../features/historySlice";

const CancelButton = () => {
  const token = useAppSelector((state) => state.auth.token);
  const press = useAppSelector((state) => state.history.press);

  const storedPanicId = sessionStorage.getItem("panic_id");

  const dispatch = useAppDispatch();

  const handleCancellingPanic = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/panic/cancel`,
        { panic_id: Number(storedPanicId) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response: ", response.data);

      if (response.data?.status === "success") {
        dispatch(setPress({ press: false }));
      }
    } catch (error) {
      console.error("Panic message can not be send: ", error);
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <h2 className="font-bold mb-4">Cancel Panic Alert Button</h2>
      <button
        className="border-black border-4 w-20 h-20 p-10 rounded-full bg-red-500 sm:w-40 sm:h-40 mx-auto"
        onClick={handleCancellingPanic}
        style={{ transform: !press ? "scale(1)" : "scale(0.8)" }}
      >
        <img src={batLogo} width={100} height={100} />
      </button>
    </div>
  );
};

export default CancelButton;
