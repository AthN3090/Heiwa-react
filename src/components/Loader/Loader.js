function Loader(){
    return (
        <div style={{display:"flex" ,height: "100vh", width:"100%", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            <div style={
                {
                    height: "50px",
                    width: "50px"
                }
            }>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#009966" stroke="#009966" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#009966" stroke="#009966" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#009966" stroke="#009966" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
            </div>
                <span style={{
                    color: "white",
                    fontSize: "20px",
                    marginTop: "10px"
                }}>Please wait for few minutes ..</span>
        </div>
    )
}
export default Loader;