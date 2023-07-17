import React from 'react'

const ColorCard = ({ color, onClick }) => {
    return (
        <div className='color-wrapper'>
            <div className='color-container' aria-selected="false" onClick={(e) => { onClick(e, color) }} style={{ backgroundColor: color }}>
            </div>
        </div>

    )
}

export default ColorCard