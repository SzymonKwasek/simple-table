import React, {useState, useEffect} from 'react'
import './TableStyles.css'

const Paginator = ({onSubtract, onAdd, goToStart, goToEnd, pagesCount, page, setSpecificPage}) => {

    const [pageButtons, setPageButtons] = useState(Array.from(Array(5)).map((item, index) => index + page))


    const goToStartOverride = () => {
        goToStart()
        setPageButtons(Array.from(Array(5)).map((item, index) => index + 1))
    }

    const goToEndOverride = () => {
        goToEnd()
        setPageButtons(Array.from(Array(5)).map((item, index) => index + pagesCount - 4))
    }

    const onAddOverride = () => {
        if(page < pagesCount) {
            onAdd()
            if(page + 1 > pageButtons[2] && page + 2 < pagesCount) {
                setPageButtons(Array.from(Array(5)).map((item, index) => index + page - 1))
            }
        }
    }

    const onSubtractOverride = () => {
        if(page > 1) {
            onSubtract()
            if(page - 1 < pageButtons[2] && pageButtons[0] != 1) {
                setPageButtons(pageButtons.map(item => item - 1))
            }
        }

    }

    return (
        <div className={'paginator'}>
            <div>
                <button onClick={goToStartOverride}>
                    <span>{'<<'}</span>
                </button>
                <button onClick={onSubtractOverride}>
                    <span>{'<'}</span>
                </button>
            </div>

            <div className={'page-buttons'}>
                {
                    pageButtons.map((item, index) => {
                        return(
                            <button key={index} onClick={() => setSpecificPage(item)} style={{backgroundColor: item == page ? 'red' : 'gray'}}>
                                <span>{`${item}`}</span>
                            </button>
                        )
                    })
                }
            </div>
            <div>
                <button onClick={onAddOverride}>
                    <span>{'>'}</span>
                </button>
                <button onClick={goToEndOverride}>
                    <span>{'>>'}</span>
                </button>
            </div>

        </div>
    )
}

export default Paginator