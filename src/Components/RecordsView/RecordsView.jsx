// Import du style
import './RecordsView.scss'

import { Icon } from "../SvgComponents/SvgComponents"
import records from "../../data/records.json"

export const RecordsView = () => {
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
                            // value={''}
                            // onChange={() => { }}
                        />
                    </div>
                </div>

                {/* Movements List */}
                {records.map((category) => (
                    <div className="Records-category" key={category.name}>
                            <div className="Records-category-title">
                                <Icon name="Dumbbell" size={ 15 } color="#4C5948" />
                                <h2>{category.name}</h2>
                            </div>

                            {category.subcategory.map((subcategory) => (
                                <div className="Records-category-subcategory" key={subcategory.name}>
                                    <h3>
                                        <button type="button">
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
                                            <li key={movement.name}>
                                                <button type="button">
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

            </div>
        </div>
    )
}