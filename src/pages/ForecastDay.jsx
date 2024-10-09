
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DataTable from "../components/DataTable";
import {
    initialState,
    FILTER,
} from "../pages/admin-const/constants";

import {useNavigate } from "react-router-dom";


import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forcast7Day } from "../api/Weather";
import { useDispatch } from "react-redux";
import Loader from "../components/loader/Loader";

const API_KEY = 'a7e237aeb43316767ba70bd4c67a9c47';
const ForecastDay = () => {
    const authSelector = useSelector(
        (state) => state.projectpulse.authUserReducer
    );
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showHeader, setShowHeader] = useState(false);
    const [filter, setFilter] = useState(FILTER);
    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [totalRecords, settotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchData = async (city) => {
        try {
            setisLoading(true)
            const res = await forcast7Day(city)
            if(res?.error?.message){
                setError(res.error.message)
                settotalRecords(0)
                setForecast([])
                setTitle('')
                setCity('')
                toast.error(res.error.message)
                return
            }
            console.log("🚀 ~ fetchData ~ res:", res)
            settotalRecords(7)
            setTitle(`${res?.location?.name}, ${res?.location?.region} ${res?.location?.country}`)
            setCity('')
            setForecast(res?.forecast?.forecastday)
        } catch (error) {

        }
        finally{
            setisLoading(false)
        }
    }

    useEffect(() => {
        getUserLocation()

    }, []);
  

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherByCoords(latitude, longitude);
                },
                (error) => {
                    setError("Unable to retrieve your location. Please search for a city.");
                }
            );
        } else {
            setError("Geolocation is not supported by your browser. Please search for a city.");
        }
    };

    const fetchWeatherByCoords = async (lat, lon) => {
        setisLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            if (!response.ok) throw new Error('Weather data not found');
            const data = await response.json();
            console.log("🚀 ~ fetchWeatherByCoords ~ data:", data)
            fetchData(data?.name)
            setCity("")
            // setCity(data?.name)
            //   dispatch(addAuthData({...authSelector,city:data?.name}))
            setError(null);
        } catch (err) {
            setError('Failed to fetch weather data. Please try again.');
        } finally {
            setisLoading(false);
        }
    };

   

    const employeeColumn = useMemo(
        () => [
            {
                Header: "Date",
                accessor: "date",
                className: "name-field",
                disableSortBy: true,
                Cell: ({ row }) => (
                    <>
                        <div className="table-data">
                            <p>{row?.original?.date}</p>
                        </div>
                    </>
                ),
            },
            {
                Header: "Condition",
                accessor: "condtion",
                className: "name-field",
                disableSortBy: true,
                Cell: ({ row }) => (
                    <>
                        <div className="table-data d-flex justify-center">
                            <p>{row?.original?.day?.condition?.text}</p>
                            <img src={row?.original?.day?.condition?.icon} alt="" style={{ width: '36px', height: '36px' }} />
                        </div>
                    </>
                ),
            },

            {
                Header: "Humidity(%)",
                accessor: "avghumidity",
                className: "name-field",
                disableSortBy: true,
                Cell: ({ row }) => (
                    <div className="table-data">
                        {" "}
                        <p>{row?.original?.day?.avghumidity}</p>{" "}
                    </div>
                ),
            },
            {
                Header: "Temperature(c)",
                accessor: "avgtemp_c",
                className: "name-field",
                disableSortBy: true,
                Cell: ({ row }) => (
                    <div className="table-data">
                        {" "}
                        <p>{row?.original?.day?.avgtemp_c}</p>{" "}
                    </div>
                ),
            },
            {
                Header: "Wind Speed(m/h)",
                accessor: "maxwind_mph",
                className: "name-field",
                disableSortBy: true,
                Cell: ({ row }) => (
                    <div className="table-data">
                        {" "}
                        <p>{row?.original?.day?.maxwind_mph}</p>{" "}
                    </div>
                ),
            }

        ],
        [showHeader]
    );



    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => {
            const visibleColumns = [

                ...columns,

            ]

            if (!showHeader) {
                return visibleColumns.filter((column) => column.id !== "id")
            }
            return visibleColumns
        })
    }

    return (
        <>
            <div
                className="table-wrapper mt-2"
                style={{ width: "90%", margin: "auto" }}
            >
<div className="table-header filter-action nowrap">
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      flexWrap: 'wrap', 
      gap: '10px', 
    }}
  >
    <h5 style={{ margin: '0' }}>Weather forecast - {title}</h5>

    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 1,
        gap: '10px', 
        maxWidth: '600px', 
        flexWrap: 'wrap', 
      }}
    >
       

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          flexGrow: 1,
          padding: '8px',
          minWidth: '200px', 
          maxWidth: '400px', 
        }}
      />
      
      
      <button
        onClick={() => { fetchData(city) }}
        disabled={loading || !city}
        style={{
          padding: '10px 20px',
          borderRadius: '5%',
          backgroundColor: !city ? 'rgba(76, 175, 80, 0.5)' : '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
      <button
      type="button"
      className="btn btn-primary"
      onClick={() => { navigate('/') }}
      style={{
        padding: '10px 20px',
        borderRadius: '5%',
        whiteSpace: 'nowrap', 
      }}
    >
      Go back
    </button>
    </div>

   
  </div>
</div>


{
    isLoading ? (<Loader/>) : (

        <DataTable
            columns={employeeColumn}
            data={forecast}
            initialState={initialState}
            setFilter={setFilter}
            totalRecords={totalRecords}
            tableHooks={tableHooks}
            setSelectedRows={setSelectedRows}
            isLoading={isLoading}
            manual={true}
            showBottomPagination={false}
            icontype="clients"
        />
    )
}
            </div>

        </>
    );
};

export default ForecastDay;
