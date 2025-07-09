import "./App.css";
import { useAppSelector } from "./app/hooks";

function App() {
  const token = useAppSelector((state) => state.auth.token);
  
  return (
    <div className="bg-white h-full w-full">
      <p className="text-black">Email: {token}</p>
    </div>
  );
}

export default App;
