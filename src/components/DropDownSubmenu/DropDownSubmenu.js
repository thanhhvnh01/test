import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { filterData } from "@views/Products/DataLua";
//
import './Dropdown.scss'

const DropDownSubmenu = ({ title, data }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [menuIndex, setMenuIndex] = useState(null);

  const handleMenuClick = (category) => {
    if (submenuOpen) {
      navigate(`/products?categoryId=${category.categoryId}`);
    }
  };

  const handleSubmenuClick = (category, productType) => {
    navigate(`/products?categoryId=${category.categoryId}&productTypeId=${productType.productTypeId}`);
  };

  return (
    <div
      className="dropdown-wrapper"
    >
      <div className="dropdown-button">{title}</div>
      <div className="dropdown-content">
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
                      <div className="child-item-1">
                        {c.label}
                      </div>
                    )
                  })}
                </div>
                {/* {
                  d.child.length > 6 && <div className="container-2">
                    {d.child?.slice(6, 12).map((c, index) => {
                      return (
                        <div className="child-item-2">
                          {c.label}
                        </div>
                      )
                    })}
                  </div>
                } */}
              </div>
            }
          </div>

        ))}
      </div>
    </div >
  );
};

export default DropDownSubmenu;
