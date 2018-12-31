import {Component} from "react"
import {
    stack as d3Stack,
    stackOrderNone,
    stackOffsetNone
} from 'd3'
import colorGen from '../colorGen'
import styled from 'styled-components'
import {FaFemale} from 'react-icons/fa'

const PictGrid = styled.div`
    display:grid;
    width:100%;
    grid-template-columns: repeat(${props=>props.columns?props.columns:10},1fr);
    grid-gap:5px;
   
    
    
`

const ResponsivePictCell = styled.div`
    background:grey;
    width:100%;
    &:before {
        content:"";
        padding-bottom:100%;
        display:inline-block;
        width:0px;
        height:0px;
    }
`

const AspectRatio = styled.div`
    height: 0;
    position: relative;
    padding-bottom: 100%;
`

const AspectRatioObject = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    display:flex;

`

const SvgWrapper = styled.svg`
    width:100%;
    height:100%;
`


const Female = styled(FaFemale)`
    height:100%;
    width:100%;
`






class Pictogrid extends Component{
    constructor(props){
        super(props)
        const data = props.data
        const keys = Object.keys(data)
        const total = keys.reduce(
            (a,d,i)=>a+data[d].risk,0
        );
        const columns = 10
        // const nCat = Math.round(randomUniform(2,7)())
        const cellStyle = "fill"
        const shape = "rect"
        // let data = []
        // for (let i = 0;i<nCat;i++){
        //     const sum = data.reduce((s,n)=>s+n,0);
        //     data.push(i===nCat-1?total-sum:Math.round(randomUniform(0,total-sum)()))
        // }

        
        let state = {
            total,
            keys,
            columns,
            data:props.data,
            cellStyle,
            shape,
            ...props.dime,
        }
        state.stack = d3Stack()
            .keys(keys)
            .value((d,k,i)=>d[k].risk)
            .order(stackOrderNone)
            .offset(stackOffsetNone);

        state.cells = Array.from(Array(total).keys()).map(d=>{
            return {
                cid:d,
                loc:d,
                fill:state.cellStyle==="fill"?"grey":"none",
                stroke:state.cellStyle==="outline"?"grey":"none",
                shape:state.shape
            }
        })

        this.state = state
        this.processCells = this.processCells.bind(this)
    }
    processCells(){
        const {data,cells,cellStyle,stack,keys} = this.state;
        const color = colorGen([-1,keys.length]);
        // let seq = data.map((d,i)=>data.reduce((a,n,j)=>j<=i?a+n:a,0))
        let current = 0
        const series = stack([data])
                // series: an array of arrays. Each array is a chunck of the stack. Beginning and ending at series[x][0] (also an array)
        const newCells = cells.map((d,i)=>{
            let newC = {
                ...d,
                fill:cellStyle==="fill"?color(current):"none",
                stroke:cellStyle==="outline"?color(current):"none"
            }
            if (i===series[current][0][1]-1) {
                current++
            }
            
            return newC;
        })
        this.setState({cells:newCells})
    }
    getShape = (type="default",d)=>{
        switch(type){
            case 'female':
                return <Female fill={d.fill}/>
            case 'circle':
                return (
                    <SvgWrapper 
                            key={`svg${d.cid}`}
                            viewBox="0 0 100 100"
                            >
                    <circle
                        cx = "50"
                        cy = "50"
                        r = "48%"
                        fill={d.fill}
                        stroke={d.stroke}
                        strokeWidth="4%"
                    />
                    </SvgWrapper>
                )
            case 'rect':
            default:
                return (
                    <SvgWrapper  key={`svg${d.cid}`}>
                    <rect   height="100%" 
                        width="100%"
                        fill={d.fill}
                        stroke={d.stroke}
                        strokeWidth={5}
                />
                </SvgWrapper>
                )
        }
    }
    componentDidMount(){
        this.processCells();
    }
    render(){

        const {cells,columns,shape} = this.state;
        const {getShape} = this;

        return (
        <PictGrid
            columns={columns}
            >
            {cells.map(d=>

                    <AspectRatio key={`aspect_${d.cid}`}>
                        <AspectRatioObject key={`aspect_obj_${d.cid}`}>
                            
                               {getShape(shape,d)}

                        </AspectRatioObject>

                    </AspectRatio>
               
                )
            }
        </PictGrid>)
    }
}

export default Pictogrid;