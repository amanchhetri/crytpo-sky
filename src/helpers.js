import React from 'react';

/**
 *  Fetch error helper
 * 
 * @param {object} response
 */

export const handleResponse = (response) => {
    return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
    });
}

/**
 * Render change percent helper
 * 
 * @param {string} percent 
 */


export const renderPercentChange = (percent) => {
    if(percent < 0){
        return <span className='percent-raised'>{percent}%</span>
    } else if(percent > 0){
        return <span className='percent-fallen'>{percent}%</span>
    } else{
        return <span>{percent}</span>
    }
}