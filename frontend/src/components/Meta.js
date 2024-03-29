import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {
  return (
    <div>
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keyword' keyword={keywords}/>
        </Helmet>
      
    </div>
  )
}

Meta.defaultProps={
    title:'Welcome to Proshop',
    description:'We sell the best products for cheap prices',
    keywords:'electronics, buy electronics, cheap electronics'
}

export default Meta
