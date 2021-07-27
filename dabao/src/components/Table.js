import React from "react";


const Table = (props) => {
    let matchTable = props.data
    if (matchTable = undefined){
        return "Loading..."
    }else{
    return matchTable?.map ((data, index)=> {
        return <td>{data.orderLocation}</td>
    })
}
}

export default Table