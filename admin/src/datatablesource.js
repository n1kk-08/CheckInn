export const userColumns = [
  { field: "_id", headerName: "ID", width: 210 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image || "https://img.freepik.com/premium-photo/memoji-emoji-handsome-smiling-man-white-background_826801-6987.jpg?semt=ais_hybrid&w=740"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
  
];


export const hotelColumns = [
  {field: "_id", headerName: "ID", width:200},

  {field: "name", headerName: "Name" , width:200},
  {field: "type", headerName: "Type" , width:100},
  {field: "title", headerName: "Title" , width:200},
  {field: "city", headerName: "City" , width:100},
]

export const roomColumns = [
  {field: "_id", headerName: "ID", width:200},

  {field: "title", headerName: "Title" , width:200},
  {field: "desc", headerName: "Description" , width:100},
  {field: "price", headerName: "Price" , width:100},
  {field: "maxPeople", headerName: "Max People" , width:100},
]