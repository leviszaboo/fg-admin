import Login from "./components/Login.tsx"
import AnonymRoute from "./utils/AnonymRoute.tsx"

export default function Auth() {
  return (
    <>
    <AnonymRoute>
      <Login />
    </AnonymRoute>
    </>
  )
}
