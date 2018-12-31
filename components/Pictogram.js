import {Component} from "react"
import {
    stack as d3Stack,
    stackOrderNone,
    stackOffsetNone,
    scaleQuantize
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
        const normalize = true;
        const columns = 10
        const cellStyle = "fill"
        const shape = "rect"
        
        let state = {
            keys,
            columns,
            cellStyle,
            shape,
            normalize,
            ...props.dime,
        }

        const total = keys.reduce(
            (a,d,i)=>a+data[d].risk,0
        );

        state.stack = d3Stack()
            .keys(keys)
            .value((d,k,i)=>d[k].risk)
            .order(stackOrderNone)
            .offset(stackOffsetNone);
        const cellTotal = normalize? 100: total;
        state.cells = Array.from(Array(cellTotal).keys()).map(d=>{
            return {
                cid:d,
                loc:d,
                fill:state.cellStyle==="fill"?"grey":"none",
                stroke:state.cellStyle==="outline"?"grey":"none",
            }
        })

        this.state = state
        this.processCells = this.processCells.bind(this)
    }
    processCells(){
        const {cellStyle,stack,keys,normalize} = this.state;
        
        const {data} = this.props;
        
        const total = keys.reduce(
            (a,d,i)=>a+data[d].risk,0
        );
        const color = colorGen([-1,keys.length]);
        // let seq = data.map((d,i)=>data.reduce((a,n,j)=>j<=i?a+n:a,0))
        const noramlizingScale = scaleQuantize().domain([0,total]).range(Array.from(Array(100).keys()))
        const dataToUse = normalize? 
            keys.reduce((a,d)=>{
                a[d] = {
                    name:data[d].name,
                    risk:noramlizingScale(data[d].risk)
                }
                return a;
            },{})
            : data;
        const series = stack([dataToUse])
                // series: an array of arrays. Each array is a chunck of the stack. Beginning and ending at series[x][0] (also an array)

        let current = 0
        const last = normalize? 100: total;
        let newCells = []
        for (let i = 0;i<last;i++){
            let newC = {
                fill:cellStyle==="fill"?color(current):"none",
                stroke:cellStyle==="outline"?color(current):"none",
                cid:i
            }
            if (i===series[current][0][1]-1 && current+1<keys.length) {
                current++
            }
            newCells.push(newC)
        }
        return newCells;
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
                        r = "45%"
                        fill={d.fill}
                        stroke={d.stroke}
                        strokeWidth="10%"
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
                        strokeWidth={15}
                />
                </SvgWrapper>
                )
        }
    }
    componentDidMount(){
        this.setState({cells:this.processCells()});
    }
    componentDidUpdate(prevProps, prevState){
        console.log(prevState.normalize + " vs " +this.state.normalize)
        if (this.props.data!==prevProps.data||this.state.normalize!==prevState.normalize){
            this.setState({cells:this.processCells()});
        }
        if (this.props.dime.normalize!==prevProps.dime.normalize){
            this.setState({normalize:this.props.dime.normalize})
           
        }
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