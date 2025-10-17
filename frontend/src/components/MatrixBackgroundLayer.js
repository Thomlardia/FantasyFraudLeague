import { useLocation } from "react-router-dom";
import MatrixBackground from "./MatrixBackground";

const MATRIX_ROUTES = new Set(["/", "/login", "/signup"]);

export default function MatrixBackgroundLayer() {
  const location = useLocation();
  const visible = MATRIX_ROUTES.has(location.pathname);

  return (
    <div className={`matrix-layer${visible ? " is-visible" : ""}`}>
      <MatrixBackground visible={visible} />
    </div>
  );
}

