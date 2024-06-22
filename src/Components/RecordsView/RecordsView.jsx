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

    const [activeRecord, setActiveRecord] = useState({name: '', record:''})

    const percentages1 = [30, 35, 40, 45, 50, 55, 60, 65, 70, 75]
    const percentages2 = [80, 85, 90, 95, 100, 105, 110, 115, 120, 125]

    const [recordValue, setRecordValue] = useState('')
    const saveRecord = () => {
        const dataRecordsToUpdate = [...data];

        // Update record value
        dataRecordsToUpdate.forEach(category => {
            category.subcategory.forEach(subcategory => {
                if (subcategory.name === activeRecord.name) {
                    subcategory.weight = recordValue
                }
                subcategory.movements.forEach(movement => {
                    if (movement.name === activeRecord.name) {
                        movement.weight = recordValue
                    }
                })
            })
        })

        setData(dataRecordsToUpdate)
        setActiveRecord({name: activeRecord.name, record: recordValue})

        const jsonString = JSON.stringify(dataRecordsToUpdate)
        localStorage.setItem("dataRecords", jsonString)

        setActiveNewRecord(false)
        setActivePercentContainer(false)
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
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setActiveModal(true)
                                            setActiveRecord({name: subcategory.name, record: subcategory.weight})
                                        }}
                                    >
                                        <span>{subcategory.name}</span>
                                        <span>
                                            {subcategory.weight ? `${subcategory.weight} kg` : null}
                                            {subcategory.reps ? `${subcategory.reps} Reps` : null}
                                            {subcategory.distance ? `${subcategory.distance} m` : null}
                                            {subcategory.time ? `${subcategory.time} min` : null}

                                            {subcategory.weight || subcategory.reps || subcategory.distance || subcategory.time ? null : "-"}
                                        </span>
                                    </button>
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
                                                    setActiveRecord({name: movement.name, record: movement.weight})
                                                }}
                                            >
                                                <span>{movement.name}</span>
                                                <span>
                                                    {movement.weight ? `${movement.weight} kg` : null}
                                                    {movement.reps ? `${movement.reps} Reps` : null}
                                                    {movement.distance ? `${movement.distance} m` : null}
                                                    {movement.time ? `${movement.time} min` : null}

                                                    {movement.weight || movement.reps || movement.distance || movement.time ? null : "-"}
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
                        setActiveRecord({name: '', record: ''})
                        setRecordValue('')
                    }}
                >
                    <div onClick={(e) => e.stopPropagation()} className="Records-container-modal">
                        <div className='header'>
                            <p className="title">{activeRecord.name}</p>
                            <p className="record">{activeRecord.record} kg</p>
                        </div>

                        <div className={`buttons ${activePercentContainer ? 'activePercent' : ''}`}>
                            {!activeNewRecord && <button type="button" className='percent' onClick={() => setActivePercentContainer(!activePercentContainer)}>
                                <Icon name="Percent" size={ 14 } color="#4C5948" />
                                Percent
                            </button>}
                            <div className={`recordContainer ${activeNewRecord ? 'activeRecord' : ''}`}>
                                {activeNewRecord &&
                                    <input
                                        type="number"
                                        id="recordInput"
                                        value={recordValue === '' ? activeRecord.record : recordValue}
                                        onChange={(e) => {
                                            if (!e.target.value) {
                                                setRecordValue(0)
                                            } else {
                                                setRecordValue(parseInt(e.target.value, 10))
                                            }
                                        }}
                                    />
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
                                        <span>{roundToNearestHalf(activeRecord.record, percent)}kg</span>
                                    </div>
                                ))}
                            </div>
                            <div className='column'>
                                {percentages2.map((percent) => (
                                    <div className='row' key={percent}>
                                        <span>{percent}%</span>
                                        <span>{roundToNearestHalf(activeRecord.record, percent)}kg</span>
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