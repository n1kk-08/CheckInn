import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../Context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Reserve = ({ setOpen, hotelId }) => {

    const [selectedRooms, setSelectedRooms] = useState([])
    const { data, error, loading} = useFetch(`/hotels/room/${hotelId}`)
    const { dates } = useContext(SearchContext)

    const navigate = useNavigate()

    const getDatesInRange = (start, end) => {
        const date = new Date(start.getTime())
        let dates = []

        while (date <= end) {
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }

        return dates;
    }

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value))

    }

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            alldates.includes(new Date(date).getTime())
        )
        return !isFound
    }
    console.log("Selected Rooms", selectedRooms)

    const handleClick = async () => {
        try {
            await Promise.all(selectedRooms.map(roomId => {
                const res = axios.put(`/rooms/availability/${roomId}`, { dates: alldates });
                // console.log("Selected Rooms2",selectedRooms)
                return res.data
            }));

            setOpen(false);
            navigate("/")
        } catch (error) { }

    }



    return <div className="reserve">
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} onClick={() => setOpen(false)} className="rClose" />
            <span>Select your rooms:</span>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Something went wrong!</div>
            ) : (
                data.map(item => (
                    <div className="rItem" key={item._id}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">Max People : <b>{item.maxPeople}</b></div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className="rSelection">
                            {item.roomNumbers.map(roomNumber => (
                                <div className="room" key={roomNumber._id}>
                                    <label>{roomNumber.number}</label>
                                    <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
            <button className="rButton" onClick={handleClick}>Reserve Now!</button>
        </div>
    </div>
}

export default Reserve;