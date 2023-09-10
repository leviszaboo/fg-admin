import ForgotPassword from "../../components/auth/ForgotPassword"
import Header from "@/app/components/home/Header"
import AnonymRoute from "../../utils/AnonymRoute"

export default function ForgotPasswordPage() {
  return (
    <>
      <AnonymRoute>
        <Header />
        <ForgotPassword />
      </AnonymRoute>
    </>
  )
}
