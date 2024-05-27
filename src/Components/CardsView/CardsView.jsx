// Import du style
import './CardsView.scss'

import { Icon } from "../SvgComponents/SvgComponents"
import { useState } from 'react'

const Modal = ({description, functionYes, closeModal, saveJSON}) => {
    return (
        <div className="cancelModal">
            <p>{description}</p>
            <div className="cancelModal-row">
                <button className='no' onClick={closeModal}>No</button>
                <button className='yes' onClick={() => { functionYes(); closeModal(); saveJSON() }}>Yes</button>
            </div>
        </div>
    )
} 

export const CardsView = ({ workouts, onEditWorkout }) => {
    const [idOption, setIdOption] = useState(0)
    const [workoutsList, setWorkoutsList] = useState(workouts)
    const [isOpenModal, setIsOpenModal] = useState(false)

    return (
        <>
        { workoutsList.map((date) => (
            <div className="Card" key={date.date}>
                <div className="line"/>
                <div className="Card-element date">
                    <p>{date.date}</p>
                    <button
                        type="button"
                        onClick={() => {
                            if (idOption !== date.id) {
                                setIdOption(date.id)
                            } else {
                                setIdOption(0)
                            }
                        }}
                    >
                        <Icon name="EllipsisVertical" size={12} color="#4C5948" />
                    </button>
                    {idOption === date.id && <div className='options'>
                        <button
                            type="button"
                            onClick={() => setIsOpenModal(true)}
                        >
                            <Icon name="Trash2" size={12} color="#4C5948" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onEditWorkout(workoutsList.find(obj => obj.id === date.id))}
                        >
                            <Icon name="PenLine" size={12} color="#4C5948" />
                        </button>
                    </div>}
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

        {isOpenModal &&
            <div className="overlay">
                <Modal
                    description="Delete this card?"
                    functionYes={() => setWorkoutsList(workoutsList.filter(obj => obj.id !== idOption))}
                    closeModal={() => setIsOpenModal(false)}
                    saveJSON={() => localStorage.setItem('dataWorkouts', JSON.stringify(workoutsList.filter(obj => obj.id !== idOption)))}
                />
            </div>
        }
        </>
    )
}