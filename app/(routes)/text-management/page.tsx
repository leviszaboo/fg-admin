import TextManager from "@/components/text-management/TextManager"
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