// Import du style
import './App.scss'

function App() {
    return (
        <div className='App'>
            <header className='Header'>
                <button type="button" className='Header-button'>
                    <span className='svg-16'>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="8" y1="4.37114e-08" x2="8" y2="16" stroke="#2C2C2C" strokeWidth="2"/>
                            <line x1="8.74228e-08" y1="8" x2="16" y2="8" stroke="#2C2C2C" strokeWidth="2"/>
                        </svg>
                    </span>
                    <p>Workout</p>
                </button>
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
            </header>

            <main>
                <div className="Card">
                    <div className="Card-element date">
                        <p>05/04/24</p>
                    </div>
                    <div className="Card-element title">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="3.5" stroke="#4C5948"/>
                        </svg>
                        <p className='workoutTitle'>EMOM 1'15 x 12</p>
                    </div>
                    <div className="Card-element workoutMovements">
                        <div className='line'/>
                        <div className='movements'>
                            <div className="space"/>
                            <p>180m-280m Row</p>
                            <p className='info'><span/> 1'15 REST</p>
                            <div className="space"/>
                        </div>
                    </div>
                    <div className="Card-element title">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4.75L3.5 7L9 1" stroke="#4C5948"/>
                        </svg>
                        <p className='score'>270m</p>
                    </div>
                    <div className="Card-element space" />
                    <div className="Card-element title">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="3.5" stroke="#4C5948"/>
                        </svg>
                        <p className='workoutTitle'>For Time 11'</p>
                    </div>
                    <div className="Card-element workoutMovements">
                        <div className='line'/>
                        <div className='movements'>
                            <p className='subtitle'>3 Rounds</p>
                            <div className="space"/>
                            <p>12 Devil Presses @15kg</p>
                            <p>18 Box Step-Ups</p>
                        </div>
                    </div>
                    <div className="Card-element space" />
                    <div className="Card-element title">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4.75L3.5 7L9 1" stroke="#4C5948"/>
                        </svg>
                        <p className='score'>67 Reps</p>
                    </div>
                </div>

                <div className="Card">
                    <div className="Card-element date">
                        <p>04/04/24</p>
                    </div>
                    <div className="Card-element title">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="3.5" stroke="#4C5948"/>
                        </svg>
                        <p className='workoutTitle'>For Time 40'</p>
                    </div>
                    <div className="Card-element workoutMovements">
                        <div className='line'/>
                        <div className='movements'>
                            <div className="space"/>
                            <p>400m Run</p>
                            <p>40 Burpees Broad Jump</p>
                            <p>400m Run</p>
                            <p>40 Toes To Bar</p>
                            <p>400m Run</p>
                            <p>40 Burpees Over The Band</p>
                            <p>400m Run</p>
                            <p>40 Toes To Bar</p>
                            <p>400m Run</p>
                            <p>40 Burpees Pull-Up</p>
                            <p>400m Run</p>
                            <div className="space"/>
                        </div>
                    </div>
                    <div className="Card-element title">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4.75L3.5 7L9 1" stroke="#4C5948"/>
                        </svg>
                        <p className='score'>35'45</p>
                    </div>
                    <div className="Card-element space" />
                    <div className="Card-element title comment">
                        <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.41895 -0.00292969L4.0957 0.331055L0.729492 7.10742L0.0527344 6.77344L3.41895 -0.00292969ZM8.33203 -0.00292969L9.00879 0.331055L5.64258 7.10742L4.96582 6.77344L8.33203 -0.00292969Z" fill="#4C5948"/>
                        </svg>
                        <p>SC: Leg Raises / 30 BPU</p>
                    </div>
                </div>

                <div className="Card">
                    <div className="Card-element date">
                        <p>02/04/24</p>
                    </div>
                    <div className="Card-element title">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="3.5" stroke="#4C5948"/>
                        </svg>
                        <p className='workoutTitle'>Strength</p>
                    </div>
                    <div className="Card-element workoutMovements">
                        <div className='line'/>
                        <div className='movements'>
                            <p className='subtitle'>4 Rounds</p>
                            <div className="space"/>
                            <p>3 Back Squats @75%</p>
                            <p className='info'><span/>20' Rest</p>
                            <p>2 Back Squats</p>
                            <p className='info'><span/>20' Rest</p>
                            <p>2 Back Squats</p>
                            <p className='info'><span/>2'30 Rest</p>
                            <div className="space"/>
                        </div>
                    </div>
                    <div className="Card-element title">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4.75L3.5 7L9 1" stroke="#4C5948"/>
                        </svg>
                        <p className='score'>80 kg</p>
                    </div>
                    <div className="Card-element space" />
                    <div className="Card-element title">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="3.5" stroke="#4C5948"/>
                        </svg>
                        <p className='workoutTitle'>EMOM 8'</p>
                    </div>
                    <div className="Card-element workoutMovements">
                        <div className='line'/>
                        <div className='movements'>
                            <div className="space"/>
                            <p>1: 60 Double-Unders</p>
                            <p>2: Max Strict Handstand Push-Ups</p>
                            <div className="space"/>
                        </div>
                    </div>
                    <div className="Card-element title">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="3.5" stroke="#4C5948"/>
                        </svg>
                        <p className='workoutTitle'>EMOM 12'</p>
                    </div>
                    <div className="Card-element workoutMovements">
                        <div className='line'/>
                        <div className='movements'>
                            <div className="space"/>
                            <p>1: Max Strict Ring Pull-Ups</p>
                            <p>2: Max Push-Ups</p>
                            <div className="space"/>
                        </div>
                    </div>
                    <div className="Card-element title">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="3.5" stroke="#4C5948"/>
                        </svg>
                        <p className='workoutTitle'>Skill</p>
                    </div>
                    <div className="Card-element workoutMovements">
                        <div className='line'/>
                        <div className='movements'>
                            <div className="space"/>
                            <p>Ring Muscle-Ups Attemps</p>
                        </div>
                    </div>
                </div>

                <div className="Card">
                    <div className="Card-element date">
                        <p>28/03/24</p>
                    </div>
                    <div className="Card-element title">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="3.5" stroke="#4C5948"/>
                        </svg>
                        <p className='workoutTitle'>EMOM 1'30 x 8</p>
                    </div>
                    <div className="Card-element workoutMovements">
                        <div className='line'/>
                        <div className='movements'>
                            <div className="space"/>
                            <p>1 Clean High Pull</p>
                            <p className='info'><span/>drop</p>
                            <p>1 Power Clean</p>
                            <p>1 Hang Power Clean</p>
                            <div className="space"/>
                        </div>
                    </div>
                    <div className="Card-element title">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4.75L3.5 7L9 1" stroke="#4C5948"/>
                        </svg>
                        <p className='score'>75 kg</p>
                    </div>
                    <div className="Card-element space" />
                    <div className="Card-element title comment">
                        <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.41895 -0.00292969L4.0957 0.331055L0.729492 7.10742L0.0527344 6.77344L3.41895 -0.00292969ZM8.33203 -0.00292969L9.00879 0.331055L5.64258 7.10742L4.96582 6.77344L8.33203 -0.00292969Z" fill="#4C5948"/>
                        </svg>
                        <p>2 Fails @80kg à cause de la main</p>
                    </div>
                    <div className="Card-element space" />
                    <div className="Card-element title">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="3.5" stroke="#4C5948"/>
                        </svg>
                        <p className='workoutTitle'>EMOM 10'</p>
                    </div>
                    <div className="Card-element workoutMovements">
                        <div className='line'/>
                        <div className='movements'>
                            <div className="space"/>
                            <p>1: 30s Max Strict Presses @30kg</p>
                            <p>2: 30s Max Push-Ups</p>
                        </div>
                    </div>
                </div>

                <div className="Card">
                    <div className="Card-element date">
                        <p>26/03/24</p>
                    </div>
                    <div className="Card-element title">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="3.5" stroke="#4C5948"/>
                        </svg>
                        <p className='workoutTitle'>EMOM 12'</p>
                    </div>
                    <div className="Card-element workoutMovements">
                        <div className='line'/>
                        <div className='movements'>
                            <div className="space"/>
                            <p>1: 8 Deficit Box Pike Push-Ups</p>
                            <p>2: Max Handstand Push-Ups</p>
                            <p>3: 1/1 Deadlift</p>
                            <div className="space"/>
                        </div>
                    </div>
                    <div className="Card-element title comment">
                        <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.41895 -0.00292969L4.0957 0.331055L0.729492 7.10742L0.0527344 6.77344L3.41895 -0.00292969ZM8.33203 -0.00292969L9.00879 0.331055L5.64258 7.10742L4.96582 6.77344L8.33203 -0.00292969Z" fill="#4C5948"/>
                        </svg>
                        <p>2 Fails @80kg à cause de la main</p>
                    </div>
                    <div className="Card-element space" />
                    <div className="Card-element title">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="3.5" stroke="#4C5948"/>
                        </svg>
                        <p className='workoutTitle'>For Time 10'</p>
                    </div>
                    <div className="Card-element workoutMovements">
                        <div className='line'/>
                        <div className='movements'>
                            <p className='subtitle'>4 Rounds</p>
                            <div className="space"/>
                            <p>1 Deadlift @120kg</p>
                            <p>2 Wall Walks</p>
                            <p>3 Burpees Over The Bar</p>
                        </div>
                    </div>
                    <div className="Card-element space" />
                    <div className="Card-element title">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4.75L3.5 7L9 1" stroke="#4C5948"/>
                        </svg>
                        <p className='score'>9'30</p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default App
