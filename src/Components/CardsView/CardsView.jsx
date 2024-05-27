// Import du style
import './CardsView.scss'

import { Icon } from "../SvgComponents/SvgComponents"

export const CardsView = ({ workouts }) => {

    return (
        <>
        { workouts.map((date) => (
            <div className="Card" key={date.date}>
                <div className="line"/>
                <div className="Card-element date">
                    <p>{date.date}</p>
                </div>
                { date.workout.map((workout, workoutIndex) => (
                    <div key={`${date.date}-${workoutIndex}`} className='Card-blockContainer' >
                        <div className="Card-element title">
                            <Icon name="Dumbbell" size={ 15 } color="#4C5948" />
                            <p className='workoutTitle'>{workout.title}</p>
                        </div>

                        { workout.subtitle && <p className='Card-element subtitle'>{workout.subtitle}</p> }

                        <div className="Card-element movements">
                            { workout.movements.map((movement, movementIndex) => (
                                <div key={`${date.date}-${workoutIndex}-${movementIndex}`} className='movement'>
                                    { movement.type === 'normal'
                                        ? <p>{movement.name}</p>
                                        : <p className='info'><span/>{movement.name}</p>
                                    }
                                </div>
                            )) }
                        </div>
                        { workout.score &&
                            <div className="Card-element title score">
                                <Icon name="Medal" size={ 15 } color="#4C5948" />
                                <p className='score'>{workout.score}</p>
                            </div> }
                        { workout.comment &&
                            <div className="Card-element title comment">
                                <Icon name="MessageSquareText" size={ 15 } color="#4C5948" />
                                <p>{workout.comment}</p>
                            </div> }
                    </div>
                )) }
            </div>
        )) }
        </>
    )
}