import { useEffect, useState } from "react"

interface userProps {
  username: string;
  password: string;
  background: string;
}

const users: userProps[] = [
  { username: "user1", password: "password1", background: "/images/florian-olivo-4hbJ-eymZ1o-unsplash.jpg" },
  { username: "user2", password: "password2", background: "/images/logan-weaver-lgnwvr-XcBPc0Q_2h8-unsplash.jpg" },
  { username: "user3", password: "password3", background: "/images/quentin-martinez-_jZHQ3NalY4-unsplash.jpg" },
  { username: "user4", password: "password4", background: "/images/sergey-shmidt-koy6FlCCy5s-unsplash.jpg" },
  { username: "user5", password: "password5", background: "/images/shifaaz-shamoon-okVXy9tG3KY-unsplash.jpg" }
]

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userBackground, setUserBackground] = useState("")
  const [currentUser, setCurrentUser] = useState("")

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username")
    const storedBackground = sessionStorage.getItem("background")

    if (storedUsername) {
      setIsLoggedIn(true)
      setUsername(storedUsername)
      setUserBackground(storedBackground || "")
      setCurrentUser(storedUsername)
    }
  }, [])

  useEffect(() => {
    document.body.style.backgroundImage = `url(${userBackground})`
    document.body.style.backgroundSize = "cover"
    document.body.style.backgroundPosition = "center"
    document.body.style.backgroundRepeat = "no-repeat"
  }, [userBackground])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const user = users.find(u => u.username === username && u.password === password)

    if (user) {
      sessionStorage.setItem("username", username)
      sessionStorage.setItem("background", user.background)
      setUserBackground(user.background)
      setCurrentUser(user.username)
      setIsLoggedIn(true)
      setError("")
    } else {
      setError("Usuario o contraseña incorrectos")
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("background")
    setIsLoggedIn(false)
    setUserBackground("")
    setCurrentUser("")
    setUsername("")
    setPassword("")
  }

  return (
    <div className="login-container">
      <header>
        {isLoggedIn && <h1>Hola, {currentUser} ¡Bienvenido a tu sesión!</h1>}
      </header>

      {!isLoggedIn ? (
        <>
          <h2>Iniciar sesión</h2>
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
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Iniciar sesión</button>
          </form>
        </>
      ) : (
        <div>
          <h2>Bienvenido {currentUser}</h2>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )
      }
    </div>
  )
}

export default Login