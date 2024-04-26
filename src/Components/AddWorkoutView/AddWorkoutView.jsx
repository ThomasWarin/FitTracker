// Import du style
import './AddWorkoutView.scss'
import { CalendarSVG, ClockSVG, CommentSVG, FlagSVG, MiniCommentSVG, MiniScoreSVG, ScoreSVG } from '../SvgComponents/SvgComponents'

import { useState } from 'react'
import { formatDateFR } from '../../utils/formatDate'

export const AddWorkoutView = ({ backHome }) => {
    /** Step State */
    const [stepDate, setStepDate] = useState(true)
    const [stepWorkout, setStepWorkout] = useState(false)
    const [stepMovements, setStepMovements] = useState(false)
    const [movementAdded, setMovementAdded] = useState(false)
    const [isActiveComment, setIsActiveComment] = useState(false)
    const [isActiveScore, setIsActiveScore] = useState(false)
    const [stepVerify, setStepVerify] = useState(false)

    /** Data to saved */
    const [date, setDate] = useState('')
    const [workout, setWorkout] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [movements, setMovements] = useState([])
    const [comment, setComment] = useState('')
    const [score, setScore] = useState('')

    /** Temporary data */
    const [newMovement, setNewMovement] = useState(['', ''])
    const [rest, setRest] = useState(false)
    const [warningDate, setWarningDate] = useState(false)
    const [warningWorkout, setWarningWorkout] = useState(false)


    const handleDateChange = (event) => {
        setDate(formatDateFR(event.target.value))
    }
    const handleWorkoutChange = (event) => {
        setWorkout(event.target.value)
    }
    const handleSubtitleChange = (event) => {
        setSubtitle(event.target.value)
    }
    const handleMovementChange = (event) => {
        const type = rest ? 'info' : 'normal'
        setNewMovement([event.target.value, type])
    }
    const handleRestChange = () => {
        const type = !rest ? 'info' : 'normal'
        setRest(!rest)
        setNewMovement([newMovement[0], type])
    }
    const handleScoreChange = (event) => {
        setScore(event.target.value)
    }
    const handleCommentChange = (event) => {
        setComment(event.target.value)
    }

    const saveJSON = () => {
        const newWorkout = {
            date: date,
            workout: [
                {
                    title: workout,
                    movements: movements.map(movement => ({
                        name: movement[0],
                        type: movement[1]
                    }))
                }
            ]
        }
        if (subtitle !== '') newWorkout.workout[0].subtitle = subtitle
        if (score !== '') newWorkout.workout[0].score = score
        if (comment !== '') newWorkout.workout[0].comment = comment

        //** Fetch dataWorkouts from LocalStorage */
        const existingData = JSON.parse(localStorage.getItem('dataWorkouts'))
        existingData.unshift(newWorkout)

        localStorage.setItem('dataWorkouts', JSON.stringify(existingData))
    }

    return (
        <>
            <div className="AddWorkout">
                <form className="AddWorkout-form">
                    <div className="line"/>

                    {/* Input Date */}
                    <div className='AddWorkout-inputContainer'>
                        <CalendarSVG />
                        <div className='AddWorkout-inputContainer-item'>
                            <label htmlFor="inputDate" className={!stepDate ? 'dataSet': ''}>Date</label>
                            {stepDate && <input type="date" name="inputDate" id="inputDate" className={ warningDate ? 'warning' : '' } onChange={() => handleDateChange(event)} />}
                            {!stepDate && <p>{ date }</p>}
                        </div>
                    </div>

                    {/* Input Workout & Subtitle */}
                    {!stepDate && <div className='AddWorkout-inputContainer'>
                        <ClockSVG />
                        <div className='AddWorkout-inputContainer-item'>
                            <label htmlFor="inputWorkoutTitle" className={!stepWorkout ? 'dataSet': ''}>Workout</label>
                            {stepWorkout && <input type="text" name="inputWorkoutTitle" id="inputWorkoutTitle" className={ warningWorkout ? 'warning' : '' } placeholder="For Time 12'" onChange={() => handleWorkoutChange(event)} />}
                            {stepMovements && <p>{ workout }</p>}
                        </div>
                        <div className='AddWorkout-inputContainer-item'>
                            <label htmlFor="inputWorkoutSubtitle" className={!stepWorkout ? 'dataSet': ''}>Info</label>
                            {stepWorkout && <input type="text" name="inputWorkoutSubtitle" id="inputWorkoutSubtitle" placeholder="3 Rounds" onChange={() => handleSubtitleChange(event)} />}
                            {stepMovements && <p>{ subtitle }</p>}
                        </div>
                    </div>}

                    {/* Input Movement */}
                    {stepMovements && <div className='AddWorkout-inputContainer'>
                        <FlagSVG />
                        <div className='AddWorkout-inputContainer-item'>
                            <label htmlFor="inputMovement" className={movementAdded || stepVerify ? 'dataSet': ''}>Movements</label>
                            { movementAdded && movements.map((movement, index) =>  <p key={ index } className={ movement[1] === 'info' ? 'info' : '' } >{ movement[1] === 'info' ? <span /> : null }{ movement[0] }</p> ) }
                            { !stepVerify && <>
                                <input type="text" name="inputMovement" id="inputMovement" value={ newMovement[0] } onChange={() => handleMovementChange(event)} />
                                <div className='containerCheckbox'>
                                    <input type="checkbox" name="checkboxRest" id="checkboxRest" value={ rest } onClick={() => handleRestChange()} />
                                    <label htmlFor="checkboxRest">Rest</label>
                                </div>
                            </> }
                        </div>
                    </div>}

                    {/* Input Score */}
                    {isActiveScore && <div className='AddWorkout-inputContainer'>
                        <MiniScoreSVG />
                        <div className='AddWorkout-inputContainer-item'>
                            <label htmlFor="inputScore" className={stepVerify ? 'dataSet': ''}>Score</label>
                            {!stepVerify && <input type="text" name="inputScore" value={ score } id="inputScore" onChange={() => handleScoreChange(event)} />}
                            {stepVerify && <p>{ score }</p>}
                        </div>
                    </div>}

                    {/* Input Comment */}
                    {isActiveComment && <div className='AddWorkout-inputContainer'>
                        <MiniCommentSVG />
                        <div className='AddWorkout-inputContainer-item'>
                            <label htmlFor="inputComment" className={stepVerify ? 'dataSet': ''}>Comment</label>
                            {!stepVerify && <input type="text" name="inputComment" value={ comment } id="inputComment" onChange={() => handleCommentChange(event)} />}
                            {stepVerify && <p>{ comment }</p>}
                        </div>
                    </div>}

                </form>
            </div>

            <div className="AddWorkout-buttons">
                {!stepVerify && <div className="AddWorkout-buttons-row">
                    { stepMovements && <>
                        <button type="button" className='AddWorkout-buttons-item secondary'
                            onClick={() => { setIsActiveScore(!isActiveScore); setScore(''); }}
                        >
                            <ScoreSVG />
                        </button>
                        <button type="button" className='AddWorkout-buttons-item secondary'
                            onClick={() => { setIsActiveComment(!isActiveComment); setComment(''); }}
                        >
                            <CommentSVG />
                        </button>
                    </> }
                    <button
                        className='AddWorkout-buttons-item primary'
                        type='button'
                        onClick={() => {
                            if (stepDate) {
                                if (date !== '') {
                                    setStepDate(false)
                                    setStepWorkout(true)
                                    if (warningDate) {
                                        setWarningDate(false)
                                    }
                                } else {
                                    setWarningDate(true)
                                }
                            }
                            if (stepWorkout) {
                                if (workout !== '') {
                                    setStepWorkout(false)
                                    setStepMovements(true)
                                    if (warningWorkout) {
                                        setWarningWorkout(false)
                                    }
                                }
                                else {
                                    setWarningWorkout(true)
                                }
                            }
                            if (stepMovements && newMovement[0] !== '') {
                                setMovements([...movements, newMovement])
                                setMovementAdded(true)
                                setNewMovement(['', ''])
                            }
                        }}
                    >
                        { !stepMovements ? 'Add' : '+'}
                        { stepDate && ' Workout' }
                        { stepWorkout && ' Movements' }
                        { stepMovements && ' Movement' }
                    </button>
                </div>}
                {stepMovements && <div className="AddWorkout-buttons-row">
                    <button
                            className='AddWorkout-buttons-item save'
                            type='button'
                            onClick={() => {
                                if (stepVerify) {
                                    saveJSON()
                                    backHome('cards')
                                }
                                else {
                                    setStepVerify(true)
                                    if (score === '') {
                                        setIsActiveScore(false)
                                    }
                                    if (comment === '') {
                                        setIsActiveComment(false)
                                    }
                                }
                            }}
                        >
                            { !stepVerify ? "Save" : "Confirm" } Workout
                    </button>
                </div>}
            </div>
        </>
    )
}