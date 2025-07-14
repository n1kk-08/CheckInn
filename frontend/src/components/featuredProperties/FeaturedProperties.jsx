import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {

  const { data, error, loading } = useFetch("/hotels?featured=true&limit=4")

  return (
    <div className="fp">
      {loading ? "Loading please wait..!" :
        <>
          {data.map((item) => (<div className="fpItem" key={item._id}>
            <img
              src={item.photos[0]}
              alt=""
              className="fpImg"
            />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">Starting from ₹{item.cheapestPrice}</span>
            <div className="fpRating">

              {item.rating ? (<><button>{item.rating}</button>
                <span>Excellent</span></>) : ""}
            </div>
          </div>))

          }
        </>
      }
    </div>
  );
};

export default FeaturedProperties;
