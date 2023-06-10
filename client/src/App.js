import './App.css';
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { checkUser } from './http/userAPI';
import { checkTrainer } from './http/trainerAPI'
import { Context } from '.';
import Footer from './components/Footer';


const App = observer(() => {
  const { user, trainer } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [user])

  useEffect(() => {
    checkTrainer().then(data => {
      trainer.setTrainer(true)
      trainer.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [trainer])

  if (loading) {
    return <Spinner animation={"grow"} />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
})

export default App;