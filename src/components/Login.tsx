import LoginForm from "./LoginForm"
import Modal from "./Modal"
import LoginHeader from "./LoginHeader"
import UserInfo from "./UserInfo"
import { usersDataSeed } from "./usersDataSeed"
import { useEffect, useState } from "react"
import { PiUserCircleLight } from "react-icons/pi"

const Login = () => {
  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userBackground, setUserBackground] = useState("")
  const [currentUser, setCurrentUser] = useState("")
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [defaultBackground, setDefaultBackground] = useState("")

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username")
    const storedBackground = sessionStorage.getItem("background")

    if (!defaultBackground) {
      setDefaultBackground(document.body.style.backgroundImage)
    }

    if (storedUsername) {
      setUserBackground(storedBackground || "")
      setCurrentUser(storedUsername)
      setIsLoggedIn(true)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (userBackground) {
      document.body.style.backgroundImage = `url(${userBackground})`
      document.body.style.backgroundSize = "cover"
      document.body.style.backgroundPosition = "center"
      document.body.style.backgroundRepeat = "no-repeat"
    } else if (!isLoggedIn) {
      document.body.style.backgroundImage = defaultBackground
    }
  }, [userBackground, isLoggedIn, defaultBackground])

  const handleSubmit = (username: string, password: string) => {
    const userData = usersDataSeed.find((user) => user.username === username);

    if (!userData) {
      setError("Usuario no encontrado");
    } else if (userData.password !== password) {
      setError("Contraseña incorrecta");
    } else {
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("background", userData.background);
      setUserBackground(userData.background);
      setCurrentUser(userData.username);
      setIsLoggedIn(true);
      setError("");
    }
  }

  const handleLogout = () => {
    setShowModal(true)
  }

  const confirmLogout = () => {
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("background")
    setIsLoggedIn(false)
    setUserBackground("")
    setCurrentUser("")
    setShowModal(false)
  }

  const cancelLogout = () => {
    setShowModal(false)
  }

  return (
    <div className="container">
      <div className="login-container">
        <LoginHeader
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
        />
        {loading ? (<p>Cargando...</p>) : !isLoggedIn ? (
          <div>
            <PiUserCircleLight size={90} />
            <LoginForm onSubmit={handleSubmit} error={error} />

          </div>
        ) : (
          <>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        )}

        {showModal && (
          <Modal
            message="¿Seguro que quieres cerrar tu sesión?"
            onConfirm={confirmLogout}
            onCancel={cancelLogout}
          />
        )}
      </div>
      <div className="info-container">
        <h3>Bienvenido a Login App</h3>
        <h4>Accede con los diferentes usuarios y el backround cambiará</h4>
        <UserInfo />
      </div>
    </div>
  )
}

export default Login