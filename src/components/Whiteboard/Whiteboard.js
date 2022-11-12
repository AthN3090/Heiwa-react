import {React, useEffect, useRef} from 'react'
import './Whiteboard.css'
function Whiteboard({socket, receiver}){

    const canvasRef = useRef()
    const canvasContainer = useRef()
    const whiteBoardReset = useRef()
    const colorWheel = useRef()
    const psuedoColorWheel = useRef()
    useEffect(()=>{
        
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        canvas.width = canvasContainer.current.clientWidth;
        canvas.height = canvasContainer.current.clientHeight;
        let color = 'white'
        let startPos = {x: 0, y: 0 }
        let isDrawing = false
        function mouseDown(e){
            isDrawing = true
            let x = e.pageX - canvas.offsetLeft
            let y = e.pageY  - canvas.offsetTop
            
            startPos = {x, y}
        }
        function mouseMove(e){
            if(!isDrawing) return
            context.beginPath()
            let x = e.pageX - canvas.offsetLeft
            let y = e.pageY - canvas.offsetTop
            context.moveTo(startPos.x, startPos.y)
            context.lineTo(x, y)
            context.stroke()
            let data = {
                x1: startPos.x/canvas.width, 
                y1: startPos.y/canvas.height,
                x2: x/canvas.width, 
                y2: y/canvas.height, 
                color: color
            }
            startPos = {x, y}
            context.lineCap = 'round'
            context.lineWidth = 2
            context.strokeStyle = color
            context.closePath()
            socket.emit('drawing', {content: data, to: receiver})
            
            
        }
        function mouseUp(e){
            isDrawing = false
        }
        function resizeCanvas(e){
            canvas.width = canvasContainer.current.clientWidth;
            canvas.height = canvasContainer.current.clientHeight;
        }
        
        function clearWhiteBoard(){
            context.clearRect(0, 0, canvas.width, canvas.height)
        }
        function colorChange(e){
            color = e.target.value
            psuedoColorWheel.current.style.backgroundColor = color
            console.log(color)

        }
        function activateColorWheel(e){
            colorWheel.current.click()
        }
        function throttle(callback, delay){
            let previousCall = new Date().getTime();
            return function() {
                console.log("moved")
              const time = new Date().getTime();
      
              if ((time - previousCall) >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
              }
            };
          };
        socket.on('drawing', (data)=>{
            context.beginPath()
            let x = data.x2
            let y = data.y2
            context.moveTo(data.x1*canvas.width, data.y1*canvas.height)
            context.lineTo(x*canvas.width, y*canvas.height)
            context.stroke()
            context.lineCap = 'round'
            context.lineWidth = 2
            context.strokeStyle = data.color
            context.closePath()
        })
        canvas.addEventListener('mousedown', mouseDown)
        canvas.addEventListener('mousemove', throttle(mouseMove,10))
        canvas.addEventListener('mouseup', mouseUp)
        window.addEventListener('resize', resizeCanvas)

        canvas.addEventListener('touchstart', mouseDown)
        canvas.addEventListener('touchmove', throttle(mouseMove,10))
        canvas.addEventListener('touchend', mouseUp)

        psuedoColorWheel.current.addEventListener('click', activateColorWheel)
        whiteBoardReset.current.addEventListener('click',clearWhiteBoard)
        colorWheel.current.addEventListener('change', colorChange)
    },[receiver, socket])
    

    return(  
    <div className='white-board'>
        <p style={{textAlign:"center", color:"white", margin:"0px"}}> Whiteboard</p>
        <div style={{width: '100%', height: '60vh'}} ref={canvasContainer}>
            <canvas ref={canvasRef}></canvas>
        </div>
        <div id = "color-n-reset">
            <input id="colorwheel" type={'color'} ref={colorWheel}
            />
            <span id= "psuedo-colorwheel" ref={psuedoColorWheel} ></span>
            
            <button id="reset" ref={whiteBoardReset}></button>
        </div>
    </div>
        )
}

export default Whiteboard