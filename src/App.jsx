import { Container } from "@mui/material";
import ScanCard from "./components/ScanCard";
import { useScan } from "./hooks/useScan";

function App() {
  const scanState = useScan();

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        py: { xs: 2, sm: 4 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ScanCard {...scanState} />
    </Container>
  );
}

export default App;
