import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import axios from "axios";
import {
  setHistory,
  setLastAlert,
  type PanicDetailsState,
} from "../features/historySlice";

export interface PanicHistoryType {
  id: number;
  longitude: string;
  latitude: string;
  panic_type: string;
  details: string;
  created_at: string;
  status: {
    id: number;
    name: string;
  };
}

const PanicHistory = () => {
  const [headers, setHeader] = useState<string[]>();
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const token = useAppSelector((state) => state.auth.token);
  const panicsHistory = useAppSelector((state) => state.history.data.panics);
  const press = useAppSelector((state) => state.history.press);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getPanicHistory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/panic/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(setHistory(response.data));
        setHeader(Object.keys(response.data.data.panics[0]));
      } catch (error) {
        console.error("Failed to retrieve history:", error);
      }
    };
    const getLastAlert = panicsHistory[panicsHistory.length - 1];
    dispatch(setLastAlert({ getLastAlert }));

    getPanicHistory();
  }, [press]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedValue(Number(selectedValue));
  };
  const listOfPanicHistory = panicsHistory.filter(
    (panic) => panic.status.id === selectedValue
  );

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            {headers?.map((header, index) => (
              <th scope="col" className="px-6 py-3" key={index}>
                {header !== "status" ? (
                  header.replace("_", " ")
                ) : (
                  <select
                    id="status"
                    className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleSelectChange}
                  >
                    <option selected>Status</option>
                    <option value={1}>In Progress</option>
                    <option value={2}>Cancelled</option>
                    <option value={3}>Resolved</option>
                  </select>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].includes(Number(selectedValue))
            ? listOfPanicHistory.map((panic: PanicDetailsState) => (
                <tr
                  className="bg-white border-b dark:bg-gray-200 dark:border-gray-700 border-gray-200 text-black hover:dark:bg-gray-300 text-xs"
                  key={panic.id}
                >
                  <td className="px-6 py-4">{panic.id}</td>
                  <td className="px-6 py-4">{panic.longitude}</td>
                  <td className="px-6 py-4">{panic.latitude}</td>
                  <td className="px-6 py-4">{panic.panic_type}</td>
                  <td className="px-6 py-4">{panic.details}</td>
                  <td className="px-6 py-4">{panic.created_at.slice(0, 10)}</td>
                  <td className="px-6 py-4">{panic.status.name}</td>
                </tr>
              ))
            : panicsHistory.map((panic: PanicDetailsState) => (
                <tr
                  className="bg-white border-b dark:bg-gray-200 dark:border-gray-700 border-gray-200 text-black hover:dark:bg-gray-300 text-xs"
                  key={panic.id}
                >
                  <td className="px-6 py-4">{panic.id}</td>
                  <td className="px-6 py-4">{panic.longitude}</td>
                  <td className="px-6 py-4">{panic.latitude}</td>
                  <td className="px-6 py-4">{panic.panic_type}</td>
                  <td className="px-6 py-4">{panic.details}</td>
                  <td className="px-6 py-4">{panic.created_at.slice(0, 10)}</td>
                  <td className="px-6 py-4">{panic.status.name}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default PanicHistory;
