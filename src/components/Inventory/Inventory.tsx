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
import CSSVARIABLES from 'global/constants/css/variables';
import Button from 'components/Button';
import Footer from 'components/Footer';

declare interface IInventoryProps {}

const Inventory: React.FC = (props: IInventoryProps) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [showDailyDeals, setShowDailyDeals] = useState<boolean>(false);
  const token = useAppSelector(state => state.user.token)
  const [selectedRows, setSelectedRows] = useState<any []>([])
  const [rows, setRows] = useState()

  const defaultColDef = {
    // set every column width
    width: 115,
    // make every column editable
    editable: true,
  };

  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }
  
  const onSelectionChanged = () => {
    setShowDailyDeals(false)
    // @ts-ignore
    setSelectedRows(gridApi.getSelectedRows());
  };

  const columnDefs = [
    { headerName: "ID", field: "id", sortable: true, filter: true, resizable: true, width: 110},
    { headerName: "Name", field: "name", sortable: true, filter: true, resizable: true, width: 220},
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
      const response = await fetch(API + ENDPOINTS.SELLER_PRODUCTS, {
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

        <div className="actions">
            <Button text="Daily Deals" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground2} onClick={() => {setShowDailyDeals(!showDailyDeals)}} />
            <Button text="Category Deals" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground} onClick={() => {}}/>          
            <Button text="Personal Deals" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground2} onClick={() => {}}/>          
        </div>
        <div className="ag-theme-material" style={{ width: '80%' }}>
          <AgGridReact
            onGridReady={onGridReady}
            domLayout='autoHeight'
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            rowData={rows}
            rowSelection='multiple'
            rowMultiSelectWithClick={true}
            onSelectionChanged={onSelectionChanged}
          >
          </AgGridReact>
        </div>
        {
          showDailyDeals && 
        <DailyDeals wines={selectedRows}/>
        }
      </section>
      <Footer />
    </InventoryWrapper>
  )
};

interface DailyDealsProps {
  wines: any []
}

const DailyDeals: React.FC<DailyDealsProps> = (props: DailyDealsProps) => {
  const token = useAppSelector(state => state.user.token)
  // const [deals, setDeals] = useState<any>([])
  const [daily_deals, setDailyDeals] = useState<any []>([])
    
  const deals: any = props.wines.map(wine => wine.id)  


  async function getDailyDeals() {
    const response = await fetch(API + ENDPOINTS.SELLER_DEALS + '?deal_type=' + 'DAILY', {
          method: METHODS.GET,
          headers: {
            Authorization: 'Bearer ' + token
        },
      })
    const data = await response.json()
    // console.log(data);
    
    setDailyDeals(data.body.deals)
  }

    useEffect(() => {
    getDailyDeals()
  }, [])

  const submit = async () => {
    if (!deals.length) return
    const response = await fetch(API + ENDPOINTS.DEALS, {
      method: METHODS.POST,
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({deal_type: "DAILY", deals: deals})
    })
    const data = await response.json()

      getDailyDeals()
  }

    const Delete = async (id: any) => {
    const response = await fetch(API + ENDPOINTS.DEALS, {
      method: METHODS.DELETE,
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({product_id: id})
    })
      const data = await response.json()
      
      getDailyDeals()
    }
  
  return (
    <section className="daily__deals">
      <h1>Submit Daily Deals</h1>
      {props.wines.map(wine => (
        <p>{wine.id}.){wine.name}</p>
      ))}

      <div className="actions">
          <Button text="Submit" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground2} onClick={submit} />
      </div>

      {daily_deals?.length ? 
        <section className="submitted">
          <h1>Submitted Daily Deals</h1>
          <section className="wines">
            {daily_deals.map(row => (
              <div className="wine" key={row.id}>
                {/* <img src={row.img_url} alt={row.name}/> */}
                <p>{row.id}.) {row.name} <button onClick={() => Delete(row.id)}>delete</button></p>
                {/* <div className="prices">
                  <span className="price">${parseFloat(row.winesource_price).toFixed(2)}</span>
                  <span className="avg_price">${parseFloat(row.average_price).toFixed(2)}</span>
                </div> */}
              </div>
            ))}
          </section>
        </section>
        :
        ''
      }

    </section>
  )
}

export default Inventory;
