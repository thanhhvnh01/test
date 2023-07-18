import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion'

import { MdClose } from 'react-icons/md'
import './Filter.scss'
import 'react-accessible-accordion/dist/fancy-example.css';
import { Grid, VStack } from '@chakra-ui/react';
import ColorCard from './ColorCard';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomCheckbox from './CustomCheckbox';

// const fakeDataColor = [
//     {
//         name:
//     }
// ]

const Filter = () => {
    const [sortBy, setSortBy] = useState()
    const [colors, setColors] = useState([])
    const [texture, setTexture] = useState([])
    const [material, setMaterial] = useState()
    const query = useLocation().search;
    // const sortBy = new URLSearchParams(query).get("sort-by");
    // const categoryIdParam = new URLSearchParams(query).get("category");
    // const texture = new URLSearchParams(query).get("texture");
    // const colorId = new URLSearchParams(query).get("color");

    const handleCloseFilter = () => {
        document.getElementById('filter').style.width = "0"
        document.getElementById('backdrop').style.display = 'none'
    }

    const handleChangeFilter = (e, element, remove) => {
        const ele = document.querySelectorAll(".filter-item");

        ele.forEach(function (btn) {
            if (!sortBy) {
                btn.setAttribute('aria-selected', 'false');
            }
            btn.setAttribute('aria-selected', 'false');
        });
        if (remove) {
            e.target.setAttribute('aria-selected', 'false');
        }
        e.target.setAttribute('aria-selected', 'true');
        setSortBy(element)
    }

    const handleTextureFilter = (e, value) => {
        if (e.target.ariaSelected === "true") {
            setTexture(texture.filter((i) => i.value !== value.value))
            e.target.setAttribute('aria-selected', 'false')
        } else {
            e.target.setAttribute('aria-selected', 'true')
            setTexture(texture.concat(value))
        }
    }

    const handleColorFilter = (e, value) => {
        if (e.target.ariaSelected === "true") {
            setColors(colors.filter((item) =>
                item !== value
            ))
            e.target.setAttribute('aria-selected', 'false');
        } else {
            e.target.setAttribute('aria-selected', 'true');
            setColors(colors.concat(value))
        }
    }

    const handleRemoveFilter = (type, value) => {
        if (type === "sort") {
            const eleSort = document.querySelectorAll(".filter-item");
            eleSort.forEach(function (btn) {
                btn.setAttribute('aria-selected', 'false');
            });
            setSortBy()
        }
        if (type === "color") {
            const eleColor = document.querySelectorAll(".color-container");
            eleColor.forEach((e) => {
                if (value === e.style.backgroundColor) {
                    e.setAttribute('aria-selected', 'false')
                }
            })
            setColors(colors.filter((item) =>
                item !== value
            ))
        }
        if (type === "texture") {
            const eleTexture = document.querySelectorAll(".checkbox-custom");
            eleTexture.forEach((e) => {
                console.log(e.id, `checkbox-${value.value}`);
                if (`checkbox-${value.value}` === e.id) {
                    console.log("run");
                    e.setAttribute('aria-selected', 'false')
                }
            })
            setTexture(texture.filter((i) =>
                i !== value
            ))
        }
    }

    console.log(texture);

    return (
        <>
            <div onClick={() => { handleCloseFilter() }} id="backdrop" className='backdrop'>
            </div>
            <div id="filter" className='filter-section'>
                <div className='filter-header'>
                    <div className='text-bold'>
                        Filter & Sort
                    </div>
                    <div onClick={() => {
                        handleCloseFilter()
                    }}>
                        <MdClose size={30} />
                    </div>
                </div>
                <div className='filter-body'>
                    <div className='text-bold'>
                        Applied filters
                    </div>
                    <AppliedFilter
                        sortBy={sortBy}
                        colors={colors}
                        texture={texture}
                        handleRemoveFilter={handleRemoveFilter}
                    />

                    <Accordion allowZeroExpanded={true}>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton >
                                    Sort By
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <VStack alignItems="flex-start" spacing={0}>
                                    <div onClick={(e) => { handleChangeFilter(e, "Newest") }} className='filter-item' aria-selected="false">
                                        Newest
                                    </div>
                                    <div onClick={(e) => { handleChangeFilter(e, "Price (HIGH-LOW)") }} className='filter-item' aria-selected="false">
                                        Price (HIGH-LOW)
                                    </div>
                                    <div onClick={(e) => { handleChangeFilter(e, "Price (LOW-HIGH)") }} className='filter-item' aria-selected="false">
                                        Price (LOW-High)
                                    </div>
                                    <div onClick={(e) => { handleChangeFilter(e, "Best Sellers") }} className='filter-item' aria-selected="false">
                                        Best Sellers
                                    </div>
                                </VStack>
                            </AccordionItemPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    Hair Texture
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <VStack alignItems="flex-start" spacing={0}>
                                    <CustomCheckbox onClick={handleTextureFilter} label="Curly Hair" value={1} />
                                    <CustomCheckbox onClick={handleTextureFilter} label="Body wavy" value={2} />
                                    <CustomCheckbox onClick={handleTextureFilter} label="Wavy wavy" value={3} />
                                    <CustomCheckbox onClick={handleTextureFilter} label="Curly slightly" value={4} />
                                    <CustomCheckbox onClick={handleTextureFilter} label="Curly hard" value={5} />
                                </VStack>
                            </AccordionItemPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    Hair Color
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <Grid templateColumns="repeat(5,1fr)" sx={{ padding: "10px" }}>
                                    <ColorCard color="green" onClick={handleColorFilter} />
                                    <ColorCard color="red" onClick={handleColorFilter} />
                                    <ColorCard color="yellow" onClick={handleColorFilter} />
                                    <ColorCard color="black" onClick={handleColorFilter} />
                                    <ColorCard color="blue" onClick={handleColorFilter} />
                                    <ColorCard color="pink" onClick={handleColorFilter} />
                                    <ColorCard color="purple" onClick={handleColorFilter} />
                                    <ColorCard color="orange" onClick={handleColorFilter} />
                                    <ColorCard color="gray" onClick={handleColorFilter} />
                                    <ColorCard color="white" onClick={handleColorFilter} />
                                </Grid>
                            </AccordionItemPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    Materiral
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <p>
                                    Màu vãi loz
                                </p>
                            </AccordionItemPanel>
                        </AccordionItem>

                    </Accordion>
                </div>
                <div className='filter-action'>

                    <button className='btn-apply'>Apply</button>

                </div>
            </div>
        </>
    )
}

export default Filter

const AppliedFilter = ({ sortBy, colors, handleRemoveFilter, texture }) => {

    const FilterTag = ({ value, label, onRemove }) => {
        return (
            <div className='filter-tag'>
                <MdClose size={20} onClick={() => { onRemove() }} />
                <span >
                    {label ? label : value}
                </span>
            </div>
        )
    }
    return (
        <div className='applied-filter'>
            {sortBy ? <div>
                <FilterTag value={sortBy} onRemove={() => { handleRemoveFilter("sort") }} />
            </div> : <div></div>}
            {texture ? texture.map((i) => (
                <FilterTag value={i.value} label={i.label} onRemove={() => { handleRemoveFilter("texture", i) }} ></FilterTag>
            )) : <div></div>
            }
            {
                colors ? colors.map((i) => (
                    <FilterTag key={i} value={i} onRemove={() => { handleRemoveFilter("color", i) }} />
                )) : <div></div>
            }
        </div >
    )
}