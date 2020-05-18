import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import TableCell from './TableCell'
import Paginator from './Paginator'

import { checkIfSortedAsc, searchFunction } from '../utils'

const ROWS_PER_PAGE = 10

const Table = (props) => {

    const [rows, setRows] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [pagesCount, setPagesCount] = useState(0)

    const [innerData, setInnerData] = useState([])


    // useEffects-----------------------------

    useEffect(() => {
        if(props.data.length > 0) {
            setLoading(false)
            prepareData(props.data)
        }
    }, [props.data])

    useEffect(() => {
        prepareData(innerData)
    }, [page])

    //----------------------------------------

    // Prepare data handlers ------------------
    const prepareRows = (data) => {
        const rows = data.map(item => Object.values(item))
        setRows(rows)
    }

    const paginateData = (data) => {
        if(props.paginate) {
            if(page === 1) {
                return data.slice(0, page * ROWS_PER_PAGE)
            } else {
                return data.slice(((page - 1) * ROWS_PER_PAGE) , page * ROWS_PER_PAGE)
            }
        }
        return data
      }

    const prepareData = (data) => {
        const pagesCount = (data.length / ROWS_PER_PAGE)
        setPagesCount(pagesCount)

        setInnerData(data)

        const paginatedData = paginateData(data)
        prepareRows(paginatedData)
      }
    //----------------------------------------

    // Filter and sorting handlers ------------------------------------------------------------
    const onInputChange = (e) => {
        setPage(1)
        const searchString = e.target.value.toLowerCase()
        const dataCopy = JSON.parse(JSON.stringify(props.data)) // deep copy of props.data to prevent bad data manipulation
        let foundElements = searchFunction(dataCopy, searchString)
        prepareData(foundElements)
    }

    const sortData = (value) => {
        if(props.data.length > 0) {
            let sortedData = []
            const isSortedAsc = checkIfSortedAsc(innerData, value)
            if(isSortedAsc) {
                sortedData = innerData.sort((a, b) => (a[value] > b[value]) ? -1 : 1)
            } else {
                sortedData = innerData.sort((a, b) => (a[value] > b[value]) ? 1 : -1)
            }
            prepareData(sortedData)
        }
    }
    
    // -----------------------------------------------------------------------------

    // Table render handlers------------------------------------------------------
    const renderHeader = () => {
        return(
            <tr key="header">
                {
                    props.headings.map((cell, index) => {
                        return(
                            <TableCell 
                                key={`header-${index}`}
                                onHeaderClick={(content) => sortData(content)}
                                content={cell}
                                header
                            />
                        )
                    })
                }
            </tr>
        )
    }

    const createRow = (row, index) => {
        return (
            <tr key={`row-${index}`}>
                {
                    row.map((cell, cellIndex) => {
                        return (
                            <TableCell 
                                key={`row-${index}-${cellIndex}`}
                                content={cell}   
                            />
                        )
                    })
                }
            </tr>
        )
    }

    const renderBody = rows.map(createRow)

    // -----------------------------------------------------------------------------

    return (
        <div className={'table-wrapper'}>
            {
               loading && <div className={'overlay'}/>
            }
            <input
                placeholder={'Search...'}
                className={'search-input'} 
                onChange={onInputChange}/>
            <div className={'scroll-container'}>
                {
                    loading ?
                    <div className={'loading'}/>
                    :
                    <table className={'table'}>
                        <thead>
                            {renderHeader()}
                        </thead>
                        <tbody>       
                            {renderBody}
                        </tbody>
                    </table>
                }
            </div>
            {props.paginate &&
                <Paginator
                    pagesCount={pagesCount} 
                    page={page} 
                    setPage={(index) => setPage(index)}/>
            }
        </div>
    )

}

Table.defaultProps = {
    paginate: false
}

Table.propTypes = {
    headings: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    paginate: PropTypes.bool
}

export default Table