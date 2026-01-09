import { Container } from "@mui/material";
import ScanCard from "./components/ScanCard";
import { useScan } from "./hooks/useScan";

function App() {
  const scanState = useScan();

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 1, sm: 2, md: 4 },
      }}
    >
      <ScanCard {...scanState} />
    </Container>
  );
}

export default App;
