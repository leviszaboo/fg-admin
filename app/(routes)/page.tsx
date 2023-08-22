import Login from "../components/auth/Login.tsx"
import AnonymRoute from "../utils/AnonymRoute.tsx"
import AuthHeader from "../components/auth/AuthHeader.tsx"

export default function Auth() {
  return (
    <>
      <AnonymRoute>
        <AuthHeader />
        <Login />
      </AnonymRoute>
    </>
  )
}
