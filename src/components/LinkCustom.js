import React from 'react'

const LinkCustom = (props) => (
  <span
    className={ props.mark.type }
  >
    { props.children }
    <a href={ props.mark.type }>{ props.children }</a>
  </span>
)

export default LinkCustom;