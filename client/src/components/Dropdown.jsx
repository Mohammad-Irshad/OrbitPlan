import React, { useState } from 'react'

const Dropdown = ({label, options, selectedOptions, onSelectionChange}) => {

    const [localSelectedOptions, setLocalSelectedOptions] = useState(
        selectedOptions || 0
    )

    const handleCheckboxChange = (e) => {
        const {value, checked} = e.target
        let updatedSelection = [...localSelectedOptions]

        if(checked){
            updatedSelection.push(value)
        }else{
            updatedSelection = updatedSelection.filter((item) => item != value)
        }
        setLocalSelectedOptions(updatedSelection)
        onSelectionChange(updatedSelection)
    }



  return (
        <div className="my-3 d-flex justify-content-between">
            <label htmlFor="dropdownMenuButton" className="form-label">{label}:</label>
            <div className="dropdown">
                <button 
                className="btn btn-secondary dropdown-toggle" 
                type="button" 
                id="dropdownMenuButton" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">
                Select Options
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                
                    {options.map((opt) => (
                        <li className="dropdown-item" key={opt.id}>
                            <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                value={label === 'Tags' ? opt.name : opt.id} 
                                id={`option-${opt.id}`} 
                                checked={localSelectedOptions.includes(label === 'Tags' ? opt.name : opt.id)}
                                onChange={handleCheckboxChange}                                
                                />
                            <label className="form-check-label" htmlFor={`option-${opt.id}`}>
                                {opt.name}
                            </label>
                            </div>
                        </li>
                    ))}
                
                </ul>
            </div>
        </div>

  )
}

export default Dropdown
