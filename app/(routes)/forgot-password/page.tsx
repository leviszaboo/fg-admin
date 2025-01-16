import ForgotPassword from "../../../components/auth/ForgotPassword";
import Header from "@/components/Header";
import AnonymRoute from "../../utils/routing/AnonymRoute";

export default function ForgotPasswordPage() {
  return (
    <AnonymRoute>
      <Header />
      <ForgotPassword />
    </AnonymRoute>
  );
}
