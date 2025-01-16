import Login from "@/components/auth/Login.tsx";
import Header from "@/components/Header.tsx";
import AnonymRoute from "../utils/routing/AnonymRoute.tsx";

export default function Auth() {
  return (
    <AnonymRoute>
      <Header />
      <Login />
    </AnonymRoute>
  );
}
