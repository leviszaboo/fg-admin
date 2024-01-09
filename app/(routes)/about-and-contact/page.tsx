import TextManager from "@/components/about-and-contact/TextManager"
import PrivateRoute from "../../utils/PrivateRoute"
import Header from "@/components/Header"

export default function TextManagementPage() {
  return (
    <PrivateRoute>
      <Header />
      <TextManager />
    </PrivateRoute>
  )
}