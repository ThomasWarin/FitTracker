// Import du style
import './App.scss'

import { useState } from 'react'

// Import data
import workouts from '../data/workouts.json'
import { CardsView } from '../Components/CardsView/CardsView'
import { AddWorkoutView } from '../Components/AddWorkoutView/AddWorkoutView'

function App() {

    let dataWorkouts = JSON.parse(localStorage.getItem("dataWorkouts"))
    if (!dataWorkouts) {
        const jsonString = JSON.stringify(workouts)
        localStorage.setItem("dataWorkouts", jsonString)
        dataWorkouts = workouts
    }

    const [currentView, setCurrentView] = useState('cards')
    const handleViewChange = (view) => {
        setCurrentView(view)
    }

    return (
        <div className='App'>
            <header className='Header'>
                <button
                    type="button"
                    className='Header-button'
                    onClick={() => {
                        currentView === 'cards' ? handleViewChange('addWorkout') : handleViewChange('cards')
                    }}
                >
                    <span className='svg-16'>
                        {currentView === 'cards' && <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="8" y1="4.37114e-08" x2="8" y2="16" stroke="#2C2C2C" strokeWidth="2"/>
                            <line x1="8.74228e-08" y1="8" x2="16" y2="8" stroke="#2C2C2C" strokeWidth="2"/>
                        </svg>}
                        {currentView === 'addWorkout' && <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 4L18 4M2 4C3.33333 3.16667 6 1.2 6 3.49691e-07M2 4C3.33333 4.83333 6 6.8 6 8" stroke="#4C5948" strokeWidth="2"/>
                        </svg>}
                    </span>
                    <p> { currentView === 'cards' ? "Workout" : "Back" }
                    </p>
                </button>
                { currentView === 'cards' && <>
                    <button type="button" className='Header-button secondary'>
                        <span className='svg-24'>
                            <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.2083 14C19.2083 8.28571 24 8.61905 24 1H19.2083M5.79167 14C5.79167 8.28571 1 8.61905 1 1H5.79167M19.2083 1C19.2083 10.9048 16.0139 15.2857 14.4167 16.2381H10.5833C8.98611 15.2857 5.79167 10.9048 5.79167 1M19.2083 1H5.79167M5.79167 21H19.2083" stroke="#4C5948" strokeWidth="2"/>
                            </svg>
                        </span>
                    </button>
                    <button type="button" className='Header-button secondary'>
                        <span className='svg-24'>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="3" x2="22" y2="3" stroke="#4C5948" strokeWidth="2"/>
                                <path d="M8 3C8 4.10457 7.10457 5 6 5C4.89543 5 4 4.10457 4 3C4 1.89543 4.89543 1 6 1C7.10457 1 8 1.89543 8 3Z" fill="#EEE8D0" stroke="#4C5948" strokeWidth="2"/>
                                <line y1="11" x2="22" y2="11" stroke="#4C5948" strokeWidth="2"/>
                                <path d="M18 11C18 12.1046 17.1046 13 16 13C14.8954 13 14 12.1046 14 11C14 9.89543 14.8954 9 16 9C17.1046 9 18 9.89543 18 11Z" fill="#EEE8D0" stroke="#4C5948" strokeWidth="2"/>
                                <line y1="19" x2="22" y2="19" stroke="#4C5948" strokeWidth="2"/>
                                <circle cx="10" cy="19" r="2" fill="#EEE8D0" stroke="#4C5948" strokeWidth="2"/>
                            </svg>
                        </span>
                    </button>
                </> }
            </header>

            <main>

            { currentView === 'cards' && <CardsView workouts={ dataWorkouts } /> }
            { currentView === 'addWorkout' && <AddWorkoutView backHome={ handleViewChange } /> }

            </main>
        </div>
    )
}

export default App
