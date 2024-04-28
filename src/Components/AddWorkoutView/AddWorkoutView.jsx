// Import du style
import './AddWorkoutView.scss'
import { AddNewPartSVG, CalendarSVG, CancelSVG, ClockSVG, CommentSVG, FlagSVG, MiniCommentSVG, MiniScoreSVG, ScoreSVG } from '../SvgComponents/SvgComponents'

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
    const [score, setScore] = useState('')
    const [comment, setComment] = useState('')

    /** Temporary data */
    const [newMovement, setNewMovement] = useState(['', ''])
    const [actualWorkout, setActualWorkout] = useState('')
    const [rest, setRest] = useState(false)
    const [warningDate, setWarningDate] = useState(false)
    const [warningWorkout, setWarningWorkout] = useState(false)
    const [warningMovement, setWarningMovement] = useState(false)

    /** Inputs Change */
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

    /** Cancel Last Action */
    const cancelLastAction = () => {
        if (stepWorkout) {
            setStepWorkout(false)
            setStepDate(true)
        }
        if (stepMovements && !stepVerify) {
            if (movements.length === 0) {
                setStepMovements(false)
                setStepWorkout(true)
            }
            else {
                const newMovements = movements.slice(0, -1)
                setMovements(newMovements)
                if (newMovements.length === 0) {
                    setMovementAdded(false)
                }
            }
        }
        if (stepVerify) {
            setStepVerify(false)
        }
    }

    /** Add New Part of the Workout */
    const addNewPart = () => {
        // No actual workout
        if (!actualWorkout) {
            const temporaryWorkout = {
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
            if (subtitle !== '') temporaryWorkout.workout[0].subtitle = subtitle
            if (score !== '') temporaryWorkout.workout[0].score = score
            if (comment !== '') temporaryWorkout.workout[0].comment = comment

            setActualWorkout(temporaryWorkout)
        }
        // Add New Part
        else {
            const temporaryPart = {
                title: workout,
                movements: movements.map(movement => ({
                    name: movement[0],
                    type: movement[1]
                }))
            }
            if (subtitle !== '') temporaryPart.subtitle = subtitle
            if (score !== '') temporaryPart.score = score
            if (comment !== '') temporaryPart.comment = comment

            const temporaryWorkout = actualWorkout
            temporaryWorkout.workout.push(temporaryPart)
            setActualWorkout(temporaryWorkout)
        }

        // Reinitialize Inputs
        setStepWorkout(true)
        setStepMovements(false)
        setStepVerify(false)
        setWorkout('')
        setSubtitle('')
        setMovements([])
        setScore('')
        setComment('')
        setRest(false)
        setMovementAdded(false)
        setIsActiveScore(false)
        setIsActiveComment(false)
    }

    /** Save JSON */
    const saveJSON = () => {
        let newWorkout = null

        if (!actualWorkout) {
            newWorkout = {
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
        } else {
            const temporaryPart = {
                title: workout,
                movements: movements.map(movement => ({
                    name: movement[0],
                    type: movement[1]
                }))
            }
            if (subtitle !== '') temporaryPart.subtitle = subtitle
            if (score !== '') temporaryPart.score = score
            if (comment !== '') temporaryPart.comment = comment

            newWorkout = actualWorkout
            newWorkout.workout.push(temporaryPart)
        }

        //** Fetch dataWorkouts from LocalStorage */
        const existingData = JSON.parse(localStorage.getItem('dataWorkouts'))
        const isDateExist = existingData.find((item) => item.date === newWorkout.date) !== undefined

        if (isDateExist) {
            existingData.forEach((item) => {
                if (item.date === newWorkout.date) {
                    item.workout.push(...newWorkout.workout);
                }
            })
        } else {
            existingData.unshift(newWorkout)
        }

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
                            {stepWorkout && <input type="text" name="inputWorkoutTitle" id="inputWorkoutTitle" className={ warningWorkout ? 'warning' : '' } value={ workout } placeholder="For Time 12'" onChange={() => handleWorkoutChange(event)} />}
                            {stepMovements && <p>{ workout }</p>}
                        </div>
                        <div className='AddWorkout-inputContainer-item'>
                            <label htmlFor="inputWorkoutSubtitle" className={!stepWorkout ? 'dataSet': ''}>Info</label>
                            {stepWorkout && <input type="text" name="inputWorkoutSubtitle" id="inputWorkoutSubtitle" value={ subtitle } placeholder="3 Rounds" onChange={() => handleSubtitleChange(event)} />}
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
                                <input type="text" name="inputMovement" id="inputMovement" className={ warningMovement ? 'warning' : '' } value={ newMovement[0] } onChange={() => handleMovementChange(event)} />
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
                    {!stepMovements && !stepDate  && <button type="button" className='AddWorkout-buttons-item secondary'
                        onClick={() => cancelLastAction()}
                    >
                        <CancelSVG />
                    </button>}
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
                            if (stepMovements) {
                                if (newMovement[0] !== '') {
                                    setMovements([...movements, newMovement])
                                    setMovementAdded(true)
                                    setNewMovement(['', ''])
                                    if (warningMovement) {
                                        setWarningMovement(false)
                                    }
                                } else {
                                    setWarningMovement(true)
                                }
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
                    <button type="button" className='AddWorkout-buttons-item secondary'
                        onClick={() => cancelLastAction()}
                    >
                        <CancelSVG />
                    </button>
                    {stepVerify && <button type="button" className='AddWorkout-buttons-item secondary'
                        onClick={() => addNewPart()}
                    >
                        <AddNewPartSVG />
                    </button>}
                    <button
                            className='AddWorkout-buttons-item save'
                            type='button'
                            onClick={() => {
                                // Save Workout
                                if (stepVerify) {
                                    saveJSON()
                                    backHome('cards')
                                }
                                // Check Workout
                                else {
                                    // Movements OK
                                    if (movements.length > 0) {
                                        setStepVerify(true)
                                        if (score === '') {
                                            setIsActiveScore(false)
                                        }
                                        if (comment === '') {
                                            setIsActiveComment(false)
                                        }
                                        if (warningMovement) {
                                            setWarningMovement(false)
                                        }
                                    }
                                    // No Movements
                                    else {
                                        setWarningMovement(true)
                                    }
                                }
                            }}
                        >
                            { !stepVerify ? "Check" : "Save" } Workout
                    </button>
                </div>}
            </div>
        </>
    )
}