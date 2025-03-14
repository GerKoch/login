interface props {
  isLoggedIn: boolean;
  currentUser: string;
}

const LoginHeader = ({ isLoggedIn, currentUser }: props) => {
  return (
    <header>
      {isLoggedIn && (
        <>
          <h1>Hola, {currentUser}</h1>
          <h3>¡Bienvenido a tu sesión!</h3>
        </>
      )}
    </header>
  )
}

export default LoginHeader
