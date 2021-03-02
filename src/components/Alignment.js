import React from 'react'

const Alignment = (props) => (
  <span className={`is-align is-align--${props.mark.type}`}>
    { props.children }
  </span>
)

export default Alignment