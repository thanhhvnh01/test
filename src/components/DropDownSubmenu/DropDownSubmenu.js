import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { filterData } from "@views/Products/DataLua";
//
import './Dropdown.scss'
import { useDispatch } from "react-redux";
import { handleSetCategory } from "@store/action";

const DropDownSubmenu = ({ title, data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmenuClick = (parent, child) => {
    document.getElementById('main-dropdown').style.visibility = 'hidden'
    const formData = {
      parentId: parent.id,
      childId: child.id,
      childItem: parent.child,
      selectedFilter: { parent: parent.label, child: child.label }
    }
    dispatch(handleSetCategory(formData))
    navigate(`/products?id=${child.id}`)
  };

  const hoverMouse = () => { document.getElementById('main-dropdown').style.visibility = 'visible' }
  

  return (
    <div
      className="dropdown-wrapper"
    >
      <div className="dropdown-button" onMouseEnter={() => { hoverMouse() }}>{title}</div>
      <div className="dropdown-content" id="main-dropdown">
        {filterData.map((d) => (
          <div className="parent-container">
            <div className="parent">
              {d.label}
            </div>
            {
              d.child && <div className="child-wrapper">
                <div className="container-1">
                  {d.child?.map((c, index) => {
                    return (
                      <div className="child-item-1" onClick={() => {
                        handleSubmenuClick(d, c)
                      }}>
                        {c.label}
                      </div>
                    )
                  })}
                </div>
              </div>
            }
          </div>

        ))}
      </div>
    </div >
  );
};

export default DropDownSubmenu;
