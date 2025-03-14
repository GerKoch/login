import { useEffect, useState } from "react"
import Modal from "./Modal";
import { PiUserCircleLight } from "react-icons/pi";

interface userProps {
  username: string;
  password: string;
  background: string;
}

const users: userProps[] = [
  { username: "User 1", password: "password1", background: "/images/florian-olivo-4hbJ-eymZ1o-unsplash.jpg" },
  { username: "User 2", password: "password2", background: "/images/logan-weaver-lgnwvr-XcBPc0Q_2h8-unsplash.jpg" },
  { username: "User 3", password: "password3", background: "/images/quentin-martinez-_jZHQ3NalY4-unsplash.jpg" },
  { username: "User 4", password: "password4", background: "/images/sergey-shmidt-koy6FlCCy5s-unsplash.jpg" },
  { username: "User 5", password: "password5", background: "/images/shifaaz-shamoon-okVXy9tG3KY-unsplash.jpg" }
]

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userBackground, setUserBackground] = useState("")
  const [currentUser, setCurrentUser] = useState("")
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username")
    const storedBackground = sessionStorage.getItem("background")

    if (storedUsername) {
      setUsername(storedUsername)
      setUserBackground(storedBackground || "")
      setCurrentUser(storedUsername)
      setLoading(true)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (userBackground) {
      document.body.style.backgroundImage = `url(${userBackground})`
      document.body.style.backgroundSize = "cover"
      document.body.style.backgroundPosition = "center"
      document.body.style.backgroundRepeat = "no-repeat"
    }
  }, [userBackground])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const user = users.find(u => u.username === username)

    if (!user || user.password !== password) {
      setError("Datos incorrectos")
    } else {
      sessionStorage.setItem("username", username)
      sessionStorage.setItem("background", user.background)
      setUserBackground(user.background)
      setCurrentUser(user.username)
      setIsLoggedIn(true)
      setError("")
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
    setUsername("")
    setPassword("")
    setShowModal(false)
  }

  const cancelLogout = () => {
    setShowModal(false)
  }

  return (
    <div className="container">
      <div className="login-container">
        <header>
          {
            isLoggedIn &&
            <>
              <h1>Hola, {currentUser}</h1>
              <h3>¡Bienvenido a tu sesion!</h3>
            </>
          }
        </header>
        {loading ? (<p>Cargando...</p>) : !isLoggedIn ? (
          <div>
            <PiUserCircleLight size={90} />
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Usuario</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              {error && <p>{error}</p>}
              <button type="submit">Iniciar sesión</button>
            </form>
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
        <h4>Accede con los diferentes usuarios y el backroud cambiará</h4>
        <div className="container-users-passwords">
          <ul>
            Usuarios
            <li>User 1</li>
            <li>User 2</li>
            <li>User 3</li>
            <li>User 4</li>
            <li>User 5</li>
          </ul>
          <ul>
            Contraseñas
            <li>password1</li>
            <li>password2</li>
            <li>password3</li>
            <li>password4</li>
            <li>password5</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login