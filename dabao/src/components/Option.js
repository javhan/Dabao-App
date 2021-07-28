import React from "react"

const Option = (prop) => {
    console.log(prop.data)
    const options = prop?.data?.map((data)=> {
        return <option value={data.name}>{data.name}</option>
    })
    console.log(options)
    return options
}

export default Option