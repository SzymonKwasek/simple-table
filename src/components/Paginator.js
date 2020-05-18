import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './TableStyles.css'

const BUTTONS_COUNT = 5

const Paginator = ({pagesCount, page, setPage}) => {

    const [pageButtons, setPageButtons] = useState(Array.from(Array(BUTTONS_COUNT)).map((item, index) => index + page))

    
    // useEffects -----------------------------------------------------------
        //Reset paginator if user search for an specific value while on page > 1
    useEffect(() => {
        if(page === 1) {
            checkPagesCount()
        }
    }, [page])

    useEffect(() => {
        checkPagesCount()
    }, [pagesCount])
    //-----------------------------------------------------------------------

    // Handlers -------------------------------------------------------------
    const checkPagesCount = () => {
        if(pagesCount < BUTTONS_COUNT) {
            setPageButtons(Array.from(Array(pagesCount < 1 ? 1 : Math.floor(pagesCount))).map((item, index) => index + 1))
        } else {
            setPageButtons(Array.from(Array(BUTTONS_COUNT)).map((item, index) => index + 1))
        }
    }

    const goToStart = () => {
        setPage(1)
        setPageButtons(Array.from(Array(BUTTONS_COUNT)).map((item, index) => index + 1))
    }

    const goToEnd = () => {
        setPage(pagesCount)
        setPageButtons(Array.from(Array(BUTTONS_COUNT)).map((item, index) => index + (pagesCount - (BUTTONS_COUNT - 1))))
    }

    const onAdd = () => {
        if(page < pagesCount) {
            setPage(page + 1)
            if(page + 1 > pageButtons[2] && page + 2 < pagesCount) {
                setPageButtons(Array.from(Array(BUTTONS_COUNT)).map((item, index) => index + page - 1))
            }
        }
    }

    const onSubtract = () => {
        if(page > 1) {
            setPage(page - 1)
            if(page - 1 < pageButtons[2] && pageButtons[0] !== 1) {
                setPageButtons(pageButtons.map(item => item - 1))
            }
        }
    }
    //------------------------------------------------------------------------

    return (
        <div className={'paginator'}>
            <div>
                <button onClick={goToStart}>
                    <span>{'<<'}</span>
                </button>
                <button onClick={onSubtract}>
                    <span>{'<'}</span>
                </button>
            </div>

            <div className={'page-buttons'}>
                {
                    pageButtons.map((item, index) => {
                        return(
                            <button 
                                key={index} 
                                onClick={() => setPage(item)} 
                                style={{backgroundColor: item === page ? 'green' : 'gray', width: 30}}>
                                <span>{`${item}`}</span>
                            </button>
                        )
                    })
                }
            </div>
            <div>
                <button onClick={onAdd}>
                    <span>{'>'}</span>
                </button>
                <button onClick={goToEnd}>
                    <span>{'>>'}</span>
                </button>
            </div>

        </div>
    )
}

Paginator.propTypes = {
    setPage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    pagesCount: PropTypes.number.isRequired
}

export default Paginator