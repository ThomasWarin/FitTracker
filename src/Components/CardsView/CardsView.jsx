// Import du style
import './CardsView.scss'

export const CardsView = ({ workouts }) => {

    return (
        <>
        { workouts.map((date) => (
            <div className="Card" key={date.date}>
                <div className="Card-element date">
                    <p>{date.date}</p>
                </div>
                { date.workout.map((workout, workoutIndex, workouts) => (
                    <div key={`${date.date}-${workoutIndex}`}>
                        { workoutIndex > 0 && (workouts[workoutIndex - 1].score || workouts[workoutIndex - 1].comment) &&
                            <div className="Card-element space" /> }

                        <div className="Card-element title">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="4" cy="4" r="3.5" stroke="#4C5948"/>
                            </svg>
                            <p className='workoutTitle'>{workout.title}</p>
                        </div>
                        <div className="Card-element workoutMovements">
                            <div className='line'/>
                            <div className='movements'>
                                { workout.subtitle && <p className='subtitle'>{workout.subtitle}</p> }
                                { workout.movements.map((movement, movementIndex, movements) => (
                                    <div key={`${date.date}-${workoutIndex}-${movementIndex}`} className='movement'>
                                        { movementIndex === 0 && <div className="space"/> }
                                        { movement.type === 'normal'
                                            ? <p>{movement.name}</p>
                                            : <p className='info'><span/>{movement.name}</p>
                                        }
                                        { movementIndex === movements.length - 1 && (workoutIndex !== workouts.length - 1 || workout.score || workout.comment) &&
                                            <div className="space"/> }
                                    </div>
                                )) }
                            </div>
                        </div>
                        { workout.score &&
                            <div className="Card-element title">
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 4.75L3.5 7L9 1" stroke="#4C5948"/>
                                </svg>
                                <p className='score'>{workout.score}</p>
                            </div> }
                        { workout.score && workout.comment && <div className="Card-element space" /> }
                        { workout.comment &&
                            <div className="Card-element title comment">
                                <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.41895 -0.00292969L4.0957 0.331055L0.729492 7.10742L0.0527344 6.77344L3.41895 -0.00292969ZM8.33203 -0.00292969L9.00879 0.331055L5.64258 7.10742L4.96582 6.77344L8.33203 -0.00292969Z" fill="#4C5948"/>
                                </svg>
                                <p>{workout.comment}</p>
                            </div> }
                    </div>
                )) }
            </div>
        )) }
        </>
    )
}