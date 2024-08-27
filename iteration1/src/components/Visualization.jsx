import './Visualization.css'
function Visualization(){
  return (
    <div className="visualizationContainer" style={{overflow:'hidden'}}>
      <iframe 
        src="https://iteration1vis.onrender.com/"
        width="1920px"
        height="1080px"
        title="Dash应用"
      ></iframe>
    </div>
  )
}
export default Visualization