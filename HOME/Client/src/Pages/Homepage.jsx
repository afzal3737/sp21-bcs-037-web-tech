import React from 'react'
import Residency from '../Components/Residency'

let
 name= "MAIZ"
  name="ali"

  const arrays= [1,2,3,4,5,6,7]
  const objects={

name:"Ahmed House",
Adress:16

  }
  const arrayofobjects=[

{
  name:"Ahmed House",
  Adress:16
  
},
{
  name:"Ali House",
  Adress:15
  
},
{
  name:"Afzal House",
  Adress:19
  
}



  ]


const Homepage = () => {
 
const age=14
 
  return (
   
   <div>

 <div>
  <h1>
    {objects.name + objects.Adress }
  </h1>

 </div>

<div>
{
arrayofobjects.map(
  (object) =>(
   <div> 
    <h1>{object.name}</h1>
    <h2>{object.Adress}</h2>
    </div>
  )
)
}


</div>
    <div>Homepage</div>
    <h3>{name}</h3>
    <h4>{age}</h4>
     <Residency/>
    
    {
      arrays.map(
        (number)=>(
        <p>{number}</p>
          
        )

        
      )
    }


    </div>
    

    
    



  )
}

export default Homepage