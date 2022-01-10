import React from 'react';

/**
 * Render change percent helper
 * 
 * @param {string} percent 
 */


export const renderPercentChange = (percent) => {
    if(percent > 0){
        return <span className='percent-raised'>+{Math.round(percent * 100) / 100}%</span>
    } else if(percent < 0){
        return <span className='percent-fallen'>{Math.round(percent * 100) / 100}%</span>
    } else{
        return <span>{percent}</span>
    }
}

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}