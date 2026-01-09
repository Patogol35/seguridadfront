import ScanCard from "./components/ScanCard";
import { useScan } from "./hooks/useScan";

function App() {
  const scanState = useScan();

  return <ScanCard {...scanState} />;
}

export default App;
