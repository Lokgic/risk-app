import {
    scaleSequential,
    interpolateViridis as defaultScheme,
} from 'd3'


export default (domain,comp)=> {
    switch(comp){
        default:
            return scaleSequential(defaultScheme).domain([domain[0],domain[1]])
    }
}