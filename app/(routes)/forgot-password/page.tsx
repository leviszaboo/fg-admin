import ForgotPassword from "../../components/auth/ForgotPassword"
import AuthHeader from "../../components/auth/AuthHeader"
import AnonymRoute from "../../utils/AnonymRoute"

export default function ForgotPasswordPage() {
  return (
    <>
      <AnonymRoute>
        <AuthHeader />
        <ForgotPassword />
      </AnonymRoute>
    </>
  )
}
