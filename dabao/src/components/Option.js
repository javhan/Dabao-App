import React from "react"

const Option = (prop) => {
    const options = prop?.data?.map((data)=> {
        return <option value={data.name}>{data.name}</option>
    })
    return options
}

export default Option