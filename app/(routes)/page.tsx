import Login from "../components/auth/Login.tsx"
import Header from "../components/home/Header.tsx"
import AnonymRoute from "../utils/AnonymRoute.tsx"

export default function Auth() {
  return (
    <AnonymRoute>
      <Header />
      <Login />
    </AnonymRoute>
  )
}
