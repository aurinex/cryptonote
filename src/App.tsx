import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeProvider } from "./utils/ThemeContext";
import { EditorProvider } from "./utils/EditorContext";
import { UserProvider } from "./utils/UserContext";

function App() {
  return (
    <ThemeProvider>
      <EditorProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </EditorProvider>
    </ThemeProvider>
  );
}

export default App;
