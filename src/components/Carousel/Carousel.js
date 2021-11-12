import React, {Children, cloneElement, useEffect, useState} from "react";
import "./Carousel.css";
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';

const PAGE_WIDTH = 500;

export default function Carousel(props) {
    const [pages, setPages] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        setPages(
            Children.map(props.children, (child) => {
                return cloneElement(child, {
                    style: {
                        minWidth: `${PAGE_WIDTH}px`,
                        maxWidth: `${PAGE_WIDTH}px`,
                        height: "100%",
                    }
                })
            })
        );
    }, []);

    const handlerClickLeft = (e) => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset + PAGE_WIDTH;
            return Math.min(newOffset, 0);
        });
    };

    const handlerClickRight = (e) => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset - PAGE_WIDTH;
            let maxOffset = -(PAGE_WIDTH * (pages.length - 1));
            return Math.max(newOffset, maxOffset);
        });
    };

    return (
        <div className="slider">
            <FaChevronLeft className="arrow" onClick={handlerClickLeft} />
            <div className="slider-wrap">
                <div className="slider-items"
                style={{
                    transform: `translateX(${offset}px)`
                }}>
                    {pages}
                </div>
            </div>
            <FaChevronRight className="arrow" onClick={handlerClickRight} />
        </div>
    );
};
