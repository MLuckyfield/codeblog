import * as constants from '../utilities/constants'

const Homepage = ()=>{
  return(
    <div class='container' style={{display:'flex',flexDirection:'column'}}>
      <div class='hero'>
        <div class='overlay center'>Learning Starts Here</div>
      </div>
      <div class='up_row' style={{display:'flex',justifyContent:'center'}}>
        <div class='row' style={{width:'100%',maxWidth:'400px',flexWrap:'wrap'}}>
          {constants.TECH.map((item, i) => {
            return <button class='round_button grab_attention'>
                      <div class='col'>
                          <img src={item.icon}/>
                          <span>{item.tag}</span>
                      </div>
                  </button>
          })}
        </div>
      </div>
    </div>
  )
}

export default Homepage
