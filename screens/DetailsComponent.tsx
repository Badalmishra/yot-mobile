import React from 'react'
import Plate from '../components/DetailsComponent/Plate'

function DetailsComponent({route}:{route:any}) {
 
  return (
      <Plate _id={route.params._id}/>
  )
}

export default DetailsComponent
