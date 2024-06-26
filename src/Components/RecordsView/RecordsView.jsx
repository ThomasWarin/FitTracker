// Import du style
import './RecordsView.scss'

import { Icon } from "../SvgComponents/SvgComponents"
import records from "../../data/records.json"
import { roundToNearestHalf } from '../../utils/roundToNearestHalf'
import { useState } from 'react'

export const RecordsView = () => {
    let dataRecords = JSON.parse(localStorage.getItem("dataRecords"))
    if (!dataRecords) {
        const jsonString = JSON.stringify(records)
        localStorage.setItem("dataRecords", jsonString)
        dataRecords = records
    }

    const [data, setData] = useState(dataRecords)

    const [search, setSearch] = useState('')
    const [activeModal, setActiveModal] = useState(false)
    const [activePercentContainer, setActivePercentContainer] = useState(false)
    const [activeNewRecord, setActiveNewRecord] = useState(false)

    const [activeRecord, setActiveRecord] = useState({name: '', type: '', value:''})

    const percentages1 = [30, 35, 40, 45, 50, 55, 60, 65, 70, 75]
    const percentages2 = [80, 85, 90, 95, 100, 105, 110, 115, 120, 125]

    const [recordValue, setRecordValue] = useState('')
    const [minutesValue, setMinutesValue] = useState('')
    const [secondsValue, setSecondsValue] = useState('')

    const saveRecord = () => {
        const dataRecordsToUpdate = [...data]
        let recordToSave = 0

        // Update record value (weight, distance, reps)
        if (recordValue) {
            recordToSave = recordValue
        }
        // Update record value (time)
        if (minutesValue || secondsValue) {
            const actualMinutes = parseInt(minutesValue, 10)
            const actualSeconds = parseInt(secondsValue, 10)

            const minutesToSave = (!actualMinutes || actualMinutes < 0) ? '00' :
                                  (actualMinutes < 10) ? `0${actualMinutes}` : actualMinutes

            const secondsToSave = (!actualSeconds || actualSeconds < 0) ? '00' :
                                  (actualSeconds >= 60) ? 59 :
                                  (actualSeconds < 10) ? `0${actualSeconds}` : actualSeconds

            recordToSave = `${minutesToSave}:${secondsToSave}`
        }

        dataRecordsToUpdate.forEach(category => {
            category.subcategory.forEach(subcategory => {
                if (subcategory.name === activeRecord.name) {
                    subcategory.value = recordToSave
                }
                subcategory.movements.forEach(movement => {
                    if (movement.name === activeRecord.name) {
                        movement.value = recordToSave
                    }
                })
            })
        })

        setActiveRecord({name: activeRecord.name, type: activeRecord.type, record: recordToSave})
        setData(dataRecordsToUpdate)

        const jsonString = JSON.stringify(dataRecordsToUpdate)
        localStorage.setItem("dataRecords", jsonString)

        setActiveNewRecord(false)
        setActivePercentContainer(false)
    }

    // Return Unit by Type of Movement
    const getUnitByType = (type) => {
        const units = {
            weight: "kg",
            reps: "reps",
            distance: "m",
            time: "min"
        }
        return units[type]
    }

    /** Converts a time string in "MM:SS" format to a new time based on the given percentage. */
    const convertTimeToPercent = (time, percentage) => {

        // Return 0 if the record is not provided
        if (time === 0) return 0

        // Split the time string into minutes and seconds
        const [minutes, seconds] = time.split(':')
        // Convert minutes and seconds from strings to integers
        const minutesToConvert = parseInt(minutes, 10)
        const secondsToConvert = parseInt(seconds, 10)

        // Convert the total time to seconds and Apply the percentage
        const totalSeconds = minutesToConvert * 60 + secondsToConvert
        const totalSecondsConverted = totalSeconds * (percentage / 100)

        // Calculate the converted minutes and seconds
        const minutesConverted = Math.floor(totalSecondsConverted / 60)
        const secondsConverted = Math.floor(totalSecondsConverted % 60)

        // Format the minutes and seconds to always have minimum two digits
        const minutesFormatted = String(minutesConverted).padStart(2, '0')
        const secondsFormatted = String(secondsConverted).padStart(2, '0')

        // Return the formatted time string in "*MM:SS" format
        return `${minutesFormatted}:${secondsFormatted}`
    }

    return (
        <div className='Records'>
            <div className="Records-container">
                <div className="line"/>

                {/* Search Input */}
                <div className="Records-search">
                    <Icon name="Search" size={ 15 } color="#4C5948" />
                    <div className="Records-search-input">
                        <label htmlFor="movement">Movements</label>
                        <input
                            type="text"
                            id="movement"
                            placeholder='Search'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && <button type="button" className='deleteSearch' onClick={() => setSearch('')}>
                            <Icon name="X" size={ 15 } color="#4C5948" />
                        </button>}
                    </div>
                </div>

                {/* Movements List */}
                {data.map((category) => (
                    // Delete Category with Filter Search Input
                    category.subcategory.filter((subcategory) => subcategory.movements.filter((movement) => movement.name.toLowerCase().includes(search.toLowerCase())).length !== 0).length !== 0 &&

                    <div className="Records-category" key={category.name}>
                        <div className="Records-category-title">
                            <Icon name="Dumbbell" size={ 15 } color="#4C5948" />
                            <h2>{category.name}</h2>
                        </div>

                        {category.subcategory.map((subcategory) => (
                            // Delete Subcategory with Filter Search Input
                            subcategory.movements.filter((movement) => movement.name.toLowerCase().includes(search.toLowerCase())).length !== 0 &&

                            <div className="Records-category-subcategory" key={subcategory.name}>
                                <h3>
                                    {subcategory.type !== 'none' ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setActiveModal(true)
                                                setActiveRecord({name: subcategory.name, type: subcategory.type, record: subcategory.value})
                                                setRecordValue(subcategory.value)
                                            }}
                                        >
                                            <span>{subcategory.name}</span>
                                            <span>
                                                {subcategory.value
                                                    ? `${subcategory.value} ${getUnitByType(subcategory.type)}`
                                                    : '-'
                                                }
                                            </span>
                                        </button>
                                    ) : (
                                        <div className='buttonLike'>
                                            <span>{subcategory.name}</span>
                                        </div>
                                    )}
                                </h3>
                                <ul className="Records-category-list">
                                    {subcategory.movements.map((movement) => (
                                        // Filter with Search Input
                                        movement.name.toLowerCase().includes(search.toLowerCase()) &&

                                        <li key={movement.name}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setActiveModal(true)
                                                    setActiveRecord({name: movement.name, type: movement.type, record: movement.value})
                                                    if (movement.type === 'time') {
                                                        if (movement.value !== 0) {
                                                            const [minutes, seconds] = movement.value.split(':')
                                                            setMinutesValue(minutes)
                                                            setSecondsValue(seconds)
                                                        }
                                                    } else {
                                                        setRecordValue(movement.value)
                                                    }
                                                }}
                                            >
                                                <span>{movement.name}</span>
                                                <span>
                                                    {movement.value
                                                        ? `${movement.value} ${getUnitByType(movement.type)}`
                                                        : '-'
                                                    }
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}

                {/* Popup to save Record */}
                {activeModal &&
                <div 
                    className="Records-container-overlay"
                    onClick={() => {
                        setActiveModal(false)
                        setActivePercentContainer(false)
                        setActiveNewRecord(false)
                        setActiveRecord({name: '', type: '', record: ''})
                        setRecordValue('')
                        setMinutesValue('')
                        setSecondsValue('')
                    }}
                >
                    <div onClick={(e) => e.stopPropagation()} className="Records-container-modal">
                        <div className='header'>
                            <p className="title">{activeRecord.name}</p>
                            <p className="record">{activeRecord.record} {getUnitByType(activeRecord.type)}</p>
                        </div>

                        <div className={`buttons ${activePercentContainer ? 'activePercent' : ''}`}>
                            {!activeNewRecord && <button type="button" className='percent' onClick={() => setActivePercentContainer(!activePercentContainer)}>
                                <Icon name="Percent" size={ 14 } color="#4C5948" />
                                Percent
                            </button>}
                            <div className={`recordContainer ${activeNewRecord ? 'activeRecord' : ''}`}>
                                {   activeNewRecord &&
                                    activeRecord.type !== 'time' &&
                                    <input
                                        type="number"
                                        id="recordInput"
                                        value={recordValue}
                                        onChange={(e) => {
                                            if (!e.target.value) {
                                                setRecordValue('')
                                            } else {
                                                setRecordValue(parseInt(e.target.value, 10))
                                            }
                                        }}
                                    />
                                }
                                {   activeNewRecord &&
                                    activeRecord.type === 'time' &&
                                    <div className='inputTime'>
                                        <input
                                            type="number"
                                            id='minutesInput'
                                            value={minutesValue}
                                            onChange={(e) => {
                                                if (!e.target.value || e.target.value < 0) {
                                                    setMinutesValue('')
                                                } else {
                                                    setMinutesValue(parseInt(e.target.value, 10))
                                                }
                                            }}
                                        />
                                        <span>:</span>
                                        <input
                                            type="number"
                                            id='secondsInput'
                                            value={secondsValue}
                                            onChange={(e) => {
                                                if (!e.target.value || e.target.value < 0) {
                                                    setSecondsValue('')
                                                } else {
                                                    setSecondsValue(parseInt(e.target.value, 10))
                                                }
                                            }}
                                        />
                                    </div>
                                }
                                <button
                                    type="button"
                                    className='newRecord'
                                    onClick={() => {
                                        if (!activeNewRecord) {
                                            setActiveNewRecord(true)
                                        } else {
                                            saveRecord()
                                        }
                                    }}
                                >
                                    {!activeNewRecord && <> <Icon name="Plus" size={ 14 } color="#4C5948" /> New Record </>}
                                    {activeNewRecord && <> <Icon name="Check" size={ 14 } color="#4C5948" /> Save </>}
                                </button>
                            </div>
                        </div>

                        {activePercentContainer && !activeNewRecord &&
                        <div className='percentContainer'>
                            <div className='column'>
                                {percentages1.map((percent) => (
                                    <div className='row' key={percent}>
                                        <span>{percent}%</span>
                                        <span>
                                        {activeRecord.type !== 'time'
                                            ? roundToNearestHalf(activeRecord.record, percent)
                                            : convertTimeToPercent(activeRecord.record, percent)
                                        }
                                        {' '}
                                        {getUnitByType(activeRecord.type)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className='column'>
                                {percentages2.map((percent) => (
                                    <div className='row' key={percent}>
                                        <span>{percent}%</span>
                                        <span>
                                        {activeRecord.type !== 'time'
                                            ? roundToNearestHalf(activeRecord.record, percent)
                                            : convertTimeToPercent(activeRecord.record, percent)
                                        }
                                        {' '}
                                        {getUnitByType(activeRecord.type)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>}
                    </div>
                </div>}

            </div>
        </div>
    )
}