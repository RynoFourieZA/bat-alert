import { useState } from "react";
import batLogo from "../assets/batman-silhouette-svgrepo-com.svg";
import axios from "axios";
interface LocationOption {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
}

const Dashboard = () => {
  const [userLocation, setUserLocation] = useState<null | { latitude: number; longitude: number }>(null);

  const getUsersCurrentLocation = async () => {
    try {
      const locationOptions: LocationOption = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          },
          (error) => {
          console.error('Error getting user location:', error);
        },
        locationOptions
        )
        

      } else {
        console.error('Geolocation is not supported by this browser.');
      }

      // // Get current location
      // const location = await GetLocation.getCurrentPosition({
      //   enableHighAccuracy: true,
      //   timeout: 60000,
      // });
    } catch (error) {
      console.error("Problem getting your location:", error);
    }
  };

  getUsersCurrentLocation()
  

  const handlePanicButton = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/panic/send`,
        {}
      );
    } catch (error) {}
  };
  return (
    <div className="text-black text-xl flex justify-center items-center border-2 h-screen border-black l">
      <button
        className="border-black border-4 w-20 h-20 p-10 rounded-full bg-yellow-300 sm:w-40 sm:h-40"
        onClick={handlePanicButton}
      >
        <img src={batLogo} width={100} height={100} />
      </button>
    </div>
  );
};

export default Dashboard;
