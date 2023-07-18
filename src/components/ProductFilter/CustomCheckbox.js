import React from 'react'

const CustomCheckbox = ({ label, onClick, value }) => {
    return (
        <div className='checkbox-wrapper' >
            <div id={`checkbox-${value}`} className='checkbox-custom' onClick={(e) => { onClick(e, { value, label }) }}>
            </div>
            <div className='checkbox-label' aria-selected="false">
                {label}
            </div>
        </div>
    )
}

export default CustomCheckbox