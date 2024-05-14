// Import du style
import './App.scss'

import { useState } from 'react'

// Import data
import workouts from '../data/workouts.json'
import { CardsView } from '../Components/CardsView/CardsView'
import { AddWorkoutView } from '../Components/AddWorkoutView/AddWorkoutView'

import { Icon } from '../Components/SvgComponents/SvgComponents'

function App() {

    let dataWorkouts = JSON.parse(localStorage.getItem("dataWorkouts"))
    if (!dataWorkouts) {
        const jsonString = JSON.stringify(workouts)
        localStorage.setItem("dataWorkouts", jsonString)
        dataWorkouts = workouts
    }

    const [isOpenPopup, setIsOpenPopup] = useState(false)
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
                        currentView === 'cards' ? handleViewChange('addWorkout') : setIsOpenPopup(true)
                    }}
                >
                    <p>
                        {currentView === 'cards' && <Icon name='Plus' size={ 16 } color="#2C2C2C" />}
                        {currentView === 'addWorkout' && <Icon name='ChevronLeft' size={ 16 } color="#2C2C2C" />}
                        { currentView === 'cards' ? "Workout" : "Back" }
                    </p>
                </button>
                { currentView === 'cards' && <>
                    <button type="button" className='Header-button secondary'>
                        <Icon name='Trophy' size={ 24 } color="#4C5948" />
                    </button>
                    <button type="button" className='Header-button secondary'>
                        <Icon name='SlidersHorizontal' size={ 24 } color="#4C5948" />
                    </button>
                </> }
            </header>

            <main className='Main'>

            { currentView === 'cards' && <CardsView workouts={ dataWorkouts } /> }
            { currentView === 'addWorkout' && <AddWorkoutView backHome={ handleViewChange } /> }

            {isOpenPopup && <div className="overlay">
                <div className="cancelPopup">
                    <p>Cancel workout creation?</p>
                    <div className="cancelPopup-row">
                        <button className='no' onClick={() => setIsOpenPopup(false)}>No</button>
                        <button className='yes' onClick={() => { handleViewChange('cards'); setIsOpenPopup(false); }}>Yes</button>
                    </div>
                </div>
            </div>}

            </main>
        </div>
    )
}

export default App
