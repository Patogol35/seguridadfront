import { Container } from "@mui/material";
import ScanCard from "./components/ScanCard";
import { useScan } from "./hooks/useScan";

function App() {
  const scanState = useScan();

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <ScanCard {...scanState} />
    </Container>
  );
}

export default App;
