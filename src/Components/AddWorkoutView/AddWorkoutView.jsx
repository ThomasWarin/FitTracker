// Import du style
import "./AddWorkoutView.scss"
import { Icon } from "../SvgComponents/SvgComponents"

import { useEffect, useState } from "react"
import { formatDateFR, formatDateISO } from "../../utils/formatDate"
import { isEmptyArray } from "../../utils/isEmptyArray"
import { isInvalidDate } from "../../utils/isInvalidDate"

const PartWorkout = ({ workout, editWorkout, deleteWorkout, id }) => {
    const [showMovements, setShowMovements] = useState(false)

    return (
        <div className={`AddWorkoutForm-workouts-item ${workout.id === id ? 'editing' : ''}`}>
            <div className={`header ${showMovements ? 'showMovements': ''}`}>
                <div>
                    <p className="title">{workout.title}</p>
                    {workout.subtitle && <p className="subtitle">{workout.subtitle}</p>}
                </div>
                <div className='buttons'>
                <button
                    type="button"
                    onClick={() => deleteWorkout(workout.id)}
                >
                    <Icon name="Trash2" size={10} color="#2C2C2C" />
                </button>
                <button
                    type="button"
                    onClick={() => editWorkout(workout)}
                >
                    <Icon name="PenLine" size={10} color="#2C2C2C" />
                </button>
                <button
                    type="button"
                    onClick={() => setShowMovements(prevState => !prevState)}
                >
                    { showMovements
                        ? <Icon name="ChevronUp" size={12} color="#2C2C2C" />
                        : <Icon name="ChevronDown" size={12} color="#2C2C2C" />
                    }
                </button>
                </div>
            </div>

            {showMovements && <>
                <ul className="movements">
                    {workout.movements.map((movement, indexMovement) => (
                        <li
                            key={`partWorkout-${indexMovement}`}
                            className={movement.type === 'info' ? 'info' : ''}
                        >
                            {movement.type === 'info'? <span /> : null}
                            {movement.name}
                        </li>
                    ))}
                </ul>
                </>}
        </div>
    )
}

export const AddWorkoutView = ({ backHome, workoutToEdit, initWorkoutToEdit, maxId, setMaxId }) => {
    const [labelMovements, setLabelMovements] = useState(true)

    const [valueDate, setValueDate] = useState('')
    const [valueDateISO, setValueDateISO] = useState('')
    const [valueWorkout, setValueWorkout] = useState('')
    const [valueSubtitle, setValueSubtitle] = useState('')
    const [valueMovement, setValueMovement] = useState(['', ''])
    const [valueScore, setValueScore] = useState('')
    const [valueComment, setValueComment] = useState('')

    const [arrayMovements, setArrayMovements] = useState([])
    const [workoutCreated, setWorkoutCreated] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [idEditing, setIdEditing] = useState(0)

    const [isEditingFromCards, setIsEditingFromCards] = useState(false)

    /** Toggle warnings */
    const [warnings, setWarnings] = useState({
        warningDate: false,
        warningWorkout: false,
        warningMovement: false
    })
    const toggleWarnings = () => {
        const newWarnings = { ...warnings }

        // Warning Date
        const isActiveWarningDate = toggleWarningDate()
        newWarnings.warningDate = isActiveWarningDate

        // Warning Workout
        if (!valueWorkout) {
            newWarnings.warningWorkout = true
        } else {
            newWarnings.warningWorkout = false
        }

        // Warning Movement
        const isActiveWarningMovement = toggleWarningMovement()
        newWarnings.warningMovement = isActiveWarningMovement

        setWarnings(newWarnings)

        // Return if warning is active
        return Object.values(newWarnings).some(value => value === true)
    }
    const toggleWarningMovement = () => {
        return arrayMovements.length === 0
    }
    const toggleWarningDate = () => {
        return isInvalidDate(valueDate)
    }

    /** Cancel Movement */
    const cancelMovement = () => {
        const isActiveWarningMovement = toggleWarningMovement()

        if (!isActiveWarningMovement) {
            if (valueMovement[0] !== '') {
                setValueMovement(['', ''])
            } else if (arrayMovements.length !== 0) {
                const newArrayMovements = [...arrayMovements]
                newArrayMovements.pop()
                setArrayMovements(newArrayMovements)
            }
        } else {
            const newWarnings = { ...warnings }
            newWarnings.warningMovement = isActiveWarningMovement
            setWarnings(newWarnings)
        }
    }
    /** Add New Part */
    const addNewPart = () => {
        const warningActive = toggleWarnings()

        if (!warningActive) {

            if (!workoutCreated) {
                const temporaryWorkout = {
                    id: maxId + 1,
                    date: valueDate,
                    workout: [
                        {
                            id: 1,
                            title: valueWorkout,
                            movements: arrayMovements.map(movement => ({
                                name: movement[0],
                                type: movement[1]
                            }))
                        }
                    ]
                }
                if (valueSubtitle !== '') temporaryWorkout.workout[0].subtitle = valueSubtitle
                if (valueScore !== '') temporaryWorkout.workout[0].score = valueScore
                if (valueComment !== '') temporaryWorkout.workout[0].comment = valueComment

                setWorkoutCreated(temporaryWorkout)
            } else {
                const highestId = Math.max(...workoutCreated.workout.map(part => part.id))

                const temporaryPart = {
                    id: highestId + 1,
                    title: valueWorkout,
                    movements: arrayMovements.map(movement => ({
                        name: movement[0],
                        type: movement[1]
                    }))
                }
                if (valueSubtitle !== '') temporaryPart.subtitle = valueSubtitle
                if (valueScore !== '') temporaryPart.score = valueScore
                if (valueComment !== '') temporaryPart.comment = valueComment

                const temporaryWorkout = {...workoutCreated}
                temporaryWorkout.workout.push(temporaryPart)

                setWorkoutCreated(temporaryWorkout)
            }

            setValueWorkout('')
            setValueSubtitle('')
            setValueMovement(['', ''])
            setArrayMovements([])
            setValueScore('')
            setValueComment('')
            setLabelMovements(true)
        }
    }
    /** Edit Part Workout */
    const editWorkout = (part) => {
        setIsEditing(true)
        setIdEditing(part.id)

        // Inputs Workout
        setValueWorkout(part.title)

        // Inputs Movements
        const movements = [...part.movements]
        const newArrayMovements = movements.map(movement => [movement.name, movement.type])
        setArrayMovements(newArrayMovements)
        setLabelMovements(true)

        // Input Subtitle
        if (part.subtitle) {
            setValueSubtitle(part.subtitle)
        } else {
            setValueSubtitle('')
        }
        // Input Score
        if (part.score) {
            setValueScore(part.score)
        } else {
            setValueScore('')
        }
        // Input Comment
        if (part.comment) {
            setValueComment(part.comment)
        } else {
            setValueComment('')
        }
    }
    /** Confirm Editing Workout */
    const confirmEditingWorkout = (id) => {
        const editingPart = {
            id: id,
            title: valueWorkout,
            movements: arrayMovements.map(movement => ({
                name: movement[0],
                type: movement[1]
            }))
        }
        if (valueSubtitle !== '') editingPart.subtitle = valueSubtitle
        if (valueScore !== '') editingPart.score = valueScore
        if (valueComment !== '') editingPart.comment = valueComment

        const newWorkoutCreated = {...workoutCreated}
        newWorkoutCreated.workout = newWorkoutCreated.workout.map(part => {
            if (part.id === id) {
                return editingPart
            } else {
                return part
            }
        })

        setWorkoutCreated(newWorkoutCreated)
        setIsEditing(false)
        setIdEditing(0)
        setValueWorkout('')
        setValueSubtitle('')
        setValueMovement(['', ''])
        setArrayMovements([])
        setValueScore('')
        setValueComment('')
        setLabelMovements(true)
    }
    /** Delete Workout */
    const deleteWorkout = (idToDelete) => {
        const updatedWorkout = {...workoutCreated}
        updatedWorkout.workout = updatedWorkout.workout.filter(item => item.id !== idToDelete)
        if (updatedWorkout.workout.length === 0) {
            setWorkoutCreated(null)
        } else {
            setWorkoutCreated(updatedWorkout)
        }
    }

    /** Save JSON */
    const saveJSON = () => {
        let newWorkout = null

        if (!workoutCreated) {
            const warningActive = toggleWarnings()

            if (!warningActive) {
                newWorkout = {
                    id: maxId + 1,
                    date: valueDate,
                    workout: [
                        {
                            id: 1,
                            title: valueWorkout,
                            movements: arrayMovements.map(movement => ({
                                name: movement[0],
                                type: movement[1]
                            }))
                        }
                    ]
                }
                if (valueSubtitle !== '') newWorkout.workout[0].subtitle = valueSubtitle
                if (valueScore !== '') newWorkout.workout[0].score = valueScore
                if (valueComment !== '') newWorkout.workout[0].comment = valueComment
            } else {
                return
            }
        } else {
            newWorkout = {...workoutCreated}

            if (valueWorkout && arrayMovements.length > 0) {
                const highestId = Math.max(...newWorkout.workout.map(part => part.id))

                const temporaryPart = {
                    id: highestId + 1,
                    title: valueWorkout,
                    movements: arrayMovements.map(movement => ({
                        name: movement[0],
                        type: movement[1]
                    }))
                }
                if (valueSubtitle !== '') temporaryPart.subtitle = valueSubtitle
                if (valueScore !== '') temporaryPart.score = valueScore
                if (valueComment !== '') temporaryPart.comment = valueComment

                newWorkout.workout.push(temporaryPart)
            }
            if ((valueWorkout && arrayMovements.length === 0) || (!valueWorkout && arrayMovements.length > 0)) {
                toggleWarnings()
                return
            }

            if (!isInvalidDate(valueDate)) {
                newWorkout.date = valueDate
            } else {
                const newWarnings = { ...warnings }
                newWarnings.warningDate = true
                setWarnings(newWarnings)
                return
            }
        }

        //** Fetch dataWorkouts from LocalStorage */
        let existingData = JSON.parse(localStorage.getItem('dataWorkouts'))

        if (isEditingFromCards) {
            existingData = existingData.map((item) => {
                if (item.id === workoutCreated.id) {
                    return newWorkout
                } else {
                    return item
                }
            })
            initWorkoutToEdit(null)
        } else {
            const isDateExist = existingData.find((item) => item.date === newWorkout.date) !== undefined

            if (isDateExist) {
                existingData.forEach((item) => {
                    if (item.date === newWorkout.date) {
                        const maxIdExisting = Math.max(...item.workout.map(part => part.id))
                        const addedWorkout = newWorkout.workout

                        addedWorkout.forEach(workout => {
                            workout.id += maxIdExisting
                        })

                        item.workout.push(...newWorkout.workout);
                    }
                })
            } else {
                existingData.unshift(newWorkout)
                setMaxId(maxId + 1)
            }
        }

        localStorage.setItem('dataWorkouts', JSON.stringify(existingData))
        backHome('cards')
    }

    useEffect(() => {
        if (workoutToEdit !== null) {
            const dateWorkout = workoutToEdit.date
            setIsEditingFromCards(true)
            setValueDate(dateWorkout)
            setValueDateISO(formatDateISO(dateWorkout))
            setWorkoutCreated(workoutToEdit)
        }
    }, [])

    return (
        <>
            <form className="AddWorkoutForm" onSubmit={(event) => event.preventDefault()}>

                <div className="AddWorkoutForm-container">
                    <div className="line"/>

                    {/* Fieldset Date */}
                    <fieldset className="AddWorkoutForm-fieldset">
                        <Icon name="Calendar" size={ 15 } color="#4C5948" />
                        <div className="AddWorkoutForm-fieldset-input">
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                name="workout_date"
                                id="date"
                                className={warnings.warningDate ? 'warning' : ''}
                                value={valueDateISO}
                                onChange={(event) => {
                                    setValueDate(formatDateFR(event.target.value))
                                    setValueDateISO(event.target.value)
                                }}
                            />
                        </div>
                    </fieldset>

                    {/* Workouts Parts */}
                    {workoutCreated && <div className="AddWorkoutForm-workouts">
                        {workoutCreated.workout.map((workout, indexWorkout) => (
                            <PartWorkout
                                key={`partWorkout-${indexWorkout}`}
                                workout={workout}
                                editWorkout={editWorkout}
                                deleteWorkout={deleteWorkout}
                                id={idEditing}
                            />
                        ))}
                    </div>}

                    {/* Fieldset Workout & Subtitle */}
                    <fieldset className="AddWorkoutForm-fieldset">
                        <Icon name="Anvil" size={ 15 } color="#4C5948" />
                        <div className="AddWorkoutForm-fieldset-input">
                            <label htmlFor="workout">Workout</label>
                            <input
                                type="text"
                                name="workout_title"
                                id="workout"
                                className={warnings.warningWorkout ? 'warning' : ''}
                                placeholder="For Time 15'"
                                value={valueWorkout}
                                onChange={(event) => setValueWorkout(event.target.value)}
                            />
                        </div>
                        <div className="AddWorkoutForm-fieldset-input">
                            <label htmlFor="subtitle">Subtitle</label>
                            <input
                                type="text"
                                name="workout_subtitle"
                                id="subtitle"
                                placeholder="3 Rounds"
                                value={valueSubtitle}
                                onChange={(event) => setValueSubtitle(event.target.value)}
                            />
                        </div>
                    </fieldset>

                    {/* Fieldset Movement */}
                    <fieldset className="AddWorkoutForm-fieldset movementsFieldset">
                        <Icon name="Dumbbell" size={ 15 } color="#4C5948" />
                        <div className="AddWorkoutForm-fieldset-input">
                            <label className={!isEmptyArray(arrayMovements) ? 'left': ''} htmlFor="movements">{!isEmptyArray(arrayMovements) ? "Movements": !labelMovements ? "Information" : "Movement"}</label>
                            {!isEmptyArray(arrayMovements) && <ul className="movementsList">
                                {arrayMovements.map((movement, index) => (
                                    <li key={`movement-${index}`} className={movement[1] === 'info' ? 'info' : '' }>{movement[1] === 'info' ? <span /> : null }{movement[0]}</li>
                                ))}
                            </ul>}
                            {!isEmptyArray(arrayMovements) && <label className='secondaryLabel' htmlFor="movements">{!labelMovements ? "Information" : "Movement"}</label>}
                            <input
                                type="text"
                                name="workout_movements"
                                id="movements"
                                className={warnings.warningMovement ? 'warning' : ''}
                                placeholder={labelMovements ? "15 Toes to Bar" : "2' Rest"}
                                value={valueMovement[0]}
                                onChange={(event) => setValueMovement([event.target.value, labelMovements ? 'normal' : 'info'])}
                            />
                        </div>
                    </fieldset>

                    <div className="AddWorkoutForm-buttonContainer">
                        <button
                            type="button"
                            onClick={() => {
                                setLabelMovements(!labelMovements)
                                setValueMovement([valueMovement[0], !labelMovements ? 'normal' : 'info'])
                            }}
                        >
                            <Icon name="ArrowLeftRight" size={ 15 } color="#4C5948" />
                            {labelMovements ? "Information" : "Movement"}
                        </button>
                        <button
                            type="button"
                            className="svgOnly"
                            onClick={() => cancelMovement()}
                        >
                            <Icon name="Minus" size={ 15 } color="#4C5948" />
                        </button>
                        <button
                            type="button"
                            className="svgOnly"
                            onClick={() => {
                                if (valueMovement[0] !== '') {
                                    setArrayMovements([...arrayMovements, valueMovement])
                                    setValueMovement(['', ''])
                                } else {
                                    const newWarnings = { ...warnings }
                                    newWarnings.warningMovement = true
                                    setWarnings(newWarnings)
                                }
                            }}
                        >
                            <Icon name="Plus" size={ 15 } color="#4C5948" />
                        </button>
                    </div>

                    {/* Input Score */}
                    <fieldset className="AddWorkoutForm-fieldset">
                        <Icon name="Trophy" size={ 15 } color="#4C5948" />
                        <div className="AddWorkoutForm-fieldset-input">
                            <label htmlFor="score">Score</label>
                            <input
                                type="text"
                                name="workout_score"
                                id="score"
                                placeholder="14'50 | 150 Reps"
                                value={valueScore}
                                onChange={(event) => setValueScore(event.target.value)}
                            />
                        </div>
                    </fieldset>

                    {/* Input Comment */}
                    <fieldset className="AddWorkoutForm-fieldset">
                        <Icon name="MessageSquareText" size={ 15 } color="#4C5948" />
                        <div className="AddWorkoutForm-fieldset-input">
                            <label htmlFor="comment">Comment</label>
                            <input
                                type="text"
                                name="workout_comment"
                                id="comment"
                                placeholder="Sooo hard..."
                                value={valueComment}
                                onChange={(event) => setValueComment(event.target.value)}
                            />
                        </div>
                    </fieldset>

                    {/* Add New Part */}
                    <div className="AddWorkoutForm-buttonContainer">
                        {!isEditing
                            ? <button
                                type="button"
                                onClick={() => addNewPart()}
                            >
                                <Icon name="CopyPlus" size={ 15 } color="#4C5948" />
                                Add New Part
                            </button>
                            : <button
                                type="button"
                                onClick={() => confirmEditingWorkout(idEditing)}
                            >
                                <Icon name="Check" size={ 15 } color="#4C5948" />
                                Confirm Editing Workout
                            </button>
                        }
                    </div>
                </div>
            </form>

            {/* Submit Button */}
            {!isEditing &&
                <button
                    type="submit"
                    className="AddWorkoutForm-buttonSubmit"
                    onClick={() => saveJSON()}
                >
                    <Icon name="Save" size={ 16 } color="#2C2C2C" />
                    Save Workout
                </button>
            }
        </>
    )
}