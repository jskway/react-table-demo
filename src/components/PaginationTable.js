import React, { useMemo } from 'react'
import { useTable, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import './table.css';

const PaginationTable = () => {

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2}
    },
    usePagination
  )

  const { pageIndex } = state

  return (
    <>
      {/* Apply the table props */}
      <table {...getTableProps()}>
        <thead>
          {// Loop over the header rows
            headerGroups.map(headerGroup => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                { // Loop over the headers in each row
                  headerGroup.headers.map( column => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      { // Render the header
                        column.render('Header')
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
            page.map(row => {
              // Prepare the row for display
              prepareRow(row)
              return (
                // Apply the Row Props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map( cell => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {// Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page: {' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={ e => {
              const pageNumber = e.target.value 
                ? Number(e.target.value) - 1
                : 0
              gotoPage(pageNumber)
            }}
            style={{width: '50px'}}
          />
        </span>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>
        <button
          onClick={() => previousPage()} 
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>
      </div>
    </>
  )
}

export default PaginationTable;
