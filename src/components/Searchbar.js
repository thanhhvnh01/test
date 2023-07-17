import React, { useRef, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import './Searchbar.scss'

const Searchbar = () => {
    const inputRef = useRef()
    const [open, setOpen] = useState(false)
    const [keyword, setKeyword] = useState("")

    const handleOpen = () => {
        setOpen(true)
        inputRef.current.focus()
    }

    const handleInputChange = (e) => {
        setKeyword(e.target.value)
    }

    return (
        
        <div className='search-wrapper'>
            <div style={{ cursor: "pointer" }} className='box' onClick={() => { handleOpen() }} >
                <input value={keyword} onChange={handleInputChange} ref={inputRef} onBlur={() => { setOpen(false) }} type="text" className={open ? "input-focus" : "input"} name="txt" ></input>
                <i className={open ? "icon-focus" : "icon"}><FaSearch /></i>
            </div>
            {open && (
                <div className={keyword !== "" ? 'search-result-show' : 'search-result' }>
                    content
                </div>
            )}
        </div>
    )
}

export default Searchbar