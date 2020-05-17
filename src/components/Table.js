import React, { useEffect, useState } from 'react'
import TableCell from './TableCell'
import Paginator from './Paginator'

const ROWS_PER_PAGE = 10

const Table = (props) => {

    const [rows, setRows] = useState([])

    const [page, setPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(0)
    const [searchString, setSearchString] = useState('')
    const [sortValue, setSortValue] = useState({value: '', desc: false})


    const checkIfSortedAsc = (arr, val) => arr.every((v,i,a) => !i || a[i-1][val] <= v[[val]]);

    //ToDo: pagination buttons, cleanup, styling

    // useEffects-----------------------------

    useEffect(() => {
        if(props.data.length > 0) {
            const pagesCount = (props.data.length / ROWS_PER_PAGE)
            setPagesCount(pagesCount)
            const paginatedData = paginateData(props.data)
            prepareRows(paginatedData)
        }
    }, [props.data, page])

    useEffect(() => {
        if(props.data.length > 0) {
            let sortedData = []
            const isSortedAsc = checkIfSortedAsc(props.data, sortValue.value)
            if(isSortedAsc) {
                sortedData = props.data.sort((a, b) => (a[sortValue.value] > b[sortValue.value]) ? -1 : 1)
            } else {
                sortedData = props.data.sort((a, b) => (a[sortValue.value] > b[sortValue.value]) ? 1 : -1)
            }
            const paginatedData = paginateData(sortedData)
            prepareRows(paginatedData)
        }
    }, [sortValue])

    useEffect(() => {
        const dataCopy = JSON.parse(JSON.stringify(props.data))
        let foundElements = []
        if(searchString.length > 0) {
            foundElements = dataCopy.filter(item => {
                return String(item.id).includes(searchString) || item.name.toLowerCase().includes(searchString) || item.city.toLowerCase().includes(searchString)
            })
        } else {
            foundElements = dataCopy
        }
        const paginatedData = paginateData(foundElements)
        prepareRows(paginatedData)
    }, [searchString])
    //----------------------------------------

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

    //----------------------------------------

    // Paginator handlers --------------------
    const onAddPage = () => {
        if(page < pagesCount) setPage(page + 1)
    }

    const onSubtractPage = () => {
        if(page > 1) setPage(page - 1)
    }


    const prepareRows = (data) => {
        const rows = data.map(item => Object.values(item))
        setRows(rows)
    }
    //----------------------------------------

    // Filter functions ------------------------------------------------------------
    const onInputChange = (e) => {
        setSearchString(e.target.value.toLowerCase())
    }

    const sortData = (content) => {
        setSortValue({value: content, desc: !sortValue.desc})
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
            <input onChange={onInputChange}/>
            <div className={'scroll-container'}>
                <table className={'table'}>
                    <thead>{renderHeader()}</thead>
                    <tbody>{renderBody}</tbody>
                </table>
                {props.paginate &&
                    <Paginator 
                        onAdd={onAddPage} 
                        onSubtract={onSubtractPage} 
                        goToStart={() => setPage(1)} 
                        goToEnd={() => setPage(pagesCount)} 
                        pagesCount={pagesCount} 
                        page={page} 
                        setSpecificPage={(index) => setPage(index)}/>
                }
            </div>

        </div>
    )

}

export default Table