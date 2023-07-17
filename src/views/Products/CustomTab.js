import { Tab } from '@chakra-ui/react'
import React from 'react'

const CustomTab = ({ id, label, level2 }) => {
    return (
        <Tab
            className="had-dropdown"
            pl={2} pr={2}
            _selected={{ color: "#d4af37", fontWeight: "bold", borderBottom: "2px solid #d4af37" }}
            id={id}
        >
            {label}
            {level2 &&
                <div className='dropdown-content'>
                    <div>

                    </div>
                </div>
            }

        </Tab>
    )
}

export default CustomTab