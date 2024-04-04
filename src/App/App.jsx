// Import du style
import './App.scss'

// Import d'images
import castronautImg from '../assets/catstronaut.png'

function App() {
    return (
        <div className="App">
        <header className="App-header">
            <h1 className="App-header-title">
            <strong>React</strong> App + <strong>Vite</strong>
            </h1>
            <p className="App-header-update">Last update: 11-10-23</p>
        </header>
        <picture className="App-picture">
            <img src={castronautImg} alt="Catstronaut Avatar" />
        </picture>
        <p className="App-description">
            Reading this?
            <br />
            Then all systems are go!
        </p>
        </div>
    )
}

export default App
