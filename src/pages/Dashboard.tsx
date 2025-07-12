import { useEffect, useState } from "react";
import batLogo from "../assets/batman-silhouette-svgrepo-com.svg";
import { z } from "zod";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setPanicId } from "../features/panicDetailsSlice";
import PanicHistory from "../components/PanicHistory";
import { setHistory, setPress } from "../features/historySlice";
import { unsetCredentials } from "../features/authSlice";
import { useNavigate } from "react-router";
import CancelButton from "../components/CancelButton";
interface LocationOption {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
}

const panicInformationSchema = z.object({
  panic_type: z.string().min(10, "Panic type can't be less than 10 characters"),
  details: z.string().min(10, "Panic details can't be less than 10 characters"),
});

type PanicInfo = z.infer<typeof panicInformationSchema>;

const Dashboard = () => {
  const [userLocation, setUserLocation] = useState<null | {
    latitude: string;
    longitude: string;
  }>(null);

  const token = useAppSelector((state) => state.auth.token);
  const press = useAppSelector((state) => state.history.press);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUsersCurrentLocation = async () => {
      try {
        const locationOptions: LocationOption = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({
                latitude: `${latitude}`,
                longitude: `${longitude}`,
              });
            },
            (error) => {
              console.error("Error getting user location:", error);
            },
            locationOptions
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        console.error("Problem getting your location:", error);
      }
    };

    getUsersCurrentLocation();
  }, []);

  const handlePanicButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setPress({ press: true }));

    const formData = new FormData(e.currentTarget);

    const parsed = panicInformationSchema.safeParse({
      panic_type: formData.get("panic_type") as string,
      details: formData.get("details") as string,
    });

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.flatten(),
        form: formData,
      };
    }

    const inputData: PanicInfo = parsed.data;
    const panicInformation = Object.assign(
      userLocation !== null && userLocation,
      inputData
    );

    try {
      if (token !== "") {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/panic/send`,
          panicInformation,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        sessionStorage.setItem("panic_id", response?.data?.data?.panic_id);
        dispatch(setPanicId(response?.data?.data));
      }
    } catch (error) {
      console.error("Panic message can not be send: ", error);
    }
  };

  const logout = () => {
    dispatch(unsetCredentials());
    dispatch(
      setHistory({
        status: "",
        message: "",
        data: {
          panics: [],
        },
      })
    );
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("message");
    sessionStorage.removeItem("status");
    sessionStorage.removeItem("panic_id");
    navigate("/login");
  };

  return (
    <div className="text-black text-xl w-full flex flex-col justify-center items-center overflow-hidden p-4 bg-slate-300">
      <div className="flex justify-between w-full mb-4">
        <h2 className="text-2xl font-semibold">Panic Alert Details</h2>
        <button
          className="text-white text-lg bg-blue-500 px-4 py-2 rounded-xl"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="flex justify-center items-center w-full">
        <form
          className="flex flex-1 flex-col md:flex-row space-y-4 md:space-y-6 justify-between w-full"
          onSubmit={handlePanicButton}
        >
          <div className="flex-1">
            <div className="flex flex-col">
              <label
                className="block mb-2 text-lg font-semibold text-gray-900"
                htmlFor="panic_type"
              >
                Alert Type
              </label>
              <input
                type="text"
                name="panic_type"
                id="panic_type"
                className="border border-gray-300 text-gray-900 block w-full p-2.5"
                placeholder="e.g. Bank Robbery"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block mb-2 text-lg font-semibold text-gray-900"
                htmlFor="details"
              >
                Alert Details
              </label>
              <input
                type="text"
                name="details"
                id="details"
                className="border border-gray-300 text-gray-900 block w-full p-2.5"
                placeholder="e.g. The Joker is holding hostages..."
                required
              />
            </div>
          </div>
          {!press && (
            <div className="flex flex-col flex-1 justify-center items-center">
              <h2 className="font-bold mb-4">Press Panic Alert Button</h2>
              <button
                type="submit"
                className="border-black border-4 w-20 h-20 p-10 rounded-full bg-green-500 sm:w-40 sm:h-40 flex justify-center items-center"
                style={{ transform: press ? "scale(0.8)" : "scale(1)" }}
              >
                <img src={batLogo} className="w-10 h-10 max-w-40 " />
              </button>
            </div>
          )}
        </form>
        {press && <CancelButton />}
      </div>
      <div className="w-full ">
        <h2 className="text-2xl font-semibold mb-4">Panic History</h2>
        <PanicHistory />
      </div>
    </div>
  );
};

export default Dashboard;
