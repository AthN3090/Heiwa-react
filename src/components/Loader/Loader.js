import {ReactComponent as Spinner} from './spinner.svg'
function Loader(){
    return (
        <div style={{display:"flex" ,height: "100vh", width:"100%", justifyContent:"center", alignItems:"center"}}>
            <Spinner style={{height: "50px"}}/>
        </div>
    )
}
export default Loader;