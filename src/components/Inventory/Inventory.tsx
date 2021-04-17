import React, { useEffect, useState } from 'react';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { InventoryWrapper } from './Inventory.styles';
import API from 'global/constants/api';
import ENDPOINTS from 'global/constants/endpoints';
import METHODS from 'global/constants/restMethods';
import { useAppSelector } from 'hooks/storeHooks';
import Navbar from 'components/Navbar';

declare interface IInventoryProps {}

const Inventory: React.FC = (props: IInventoryProps) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const token = useAppSelector(state => state.user.token)
  
  const [rows, setRows] = useState()

  const defaultColDef = {
    // set every column width
    width: 115,
    // make every column editable
    editable: true,
  };
  
  const columnDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true, resizable: true },
    { headerName: "Category", field: "category", sortable: true, filter: true, resizable: true },
    { headerName: "Vintage", field: "vintage", sortable: true, filter: true, resizable: true },
    { headerName: "Case Size", field: "case_size", sortable: true, filter: true, resizable: true },
    { headerName: "Points", field: "points", sortable: true, filter: true, resizable: true },
    { headerName: "Vivino", field: "vivino_price", sortable: true, filter: true, resizable: true },
    { headerName: "Total Wines", field: "total_wines_price", sortable: true, filter: true, resizable: true },
    { headerName: "Wine.com", field: "wine_com_price", sortable: true, filter: true, resizable: true },
    { headerName: "Wine Searcher", field: "wine_searcher_price", sortable: true, filter: true, resizable: true },
    { headerName: "Avg. Price", field: "average_price", sortable: true, filter: true, resizable: true },
    { headerName: "Winesource Cost", field: "winesource_cost", sortable: true, filter: true , resizable: true},
    { headerName: "Winesource Price", field: "winesource_price", sortable: true, filter: true, resizable: true },
    { headerName: "Distributor", field: "distributor", sortable: true, filter: true, resizable: true },
  ];


  useEffect(() => {
              
    async function getRows() {
      const response = await fetch(API + ENDPOINTS.PRODUCTS, {
            method: METHODS.GET,
            headers: {
              Authorization: 'Bearer ' + token
            },
          })
      const data = await response.json()
      console.log(data);
      
      setRows(data.body.products)
    }

    getRows()
  }, [])

  return (
    <InventoryWrapper data-testid="Inventory">
      <Navbar />
      <section className="content">
        <div className="ag-theme-material" style={{ width: '80%' }}>
          <AgGridReact
            domLayout='autoHeight'
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            rowData={rows}
          >
          </AgGridReact>
          </div>
      </section>
    </InventoryWrapper>
  )
};

export default Inventory;
