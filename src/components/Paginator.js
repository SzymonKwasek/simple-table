import React, {useState, useEffect} from 'react'
import './TableStyles.css'

const Paginator = ({onSubtract, onAdd, pagesCount, page, setSpecificPage}) => {

    const [pageButtons, setPageButtons] = useState(Array.from(Array(6)))

    const [offset, setOffset] = useState(1)

    useEffect(() => {
        // console.log(pagesCount)
        // if(pagesCount < 6) {
        //     setPageButtons(Array.from(Array(pagesCount)))
        // } else {
        //     setPageButtons(Array.from(Array(6)))
        // }
    }, [pagesCount])

    // useEffect(() => {
    //     console.log(page)
    // }, [page])

    return (
        <div className={'paginator'}>
            <button onClick={onSubtract}>
                <span>{'<'}</span>
            </button>
            <div className={'page-buttons'}>
                {
                    pageButtons.map((item, index) => {
                        return(
                            <button key={index} onClick={() => setSpecificPage(index + offset)}>
                                <span>{`${index + offset}`}</span>
                            </button>
                        )
                    })
                }
            </div>
            <button onClick={onAdd}>
                <span>{'>'}</span>
            </button>
        </div>
    )
}

export default Paginator