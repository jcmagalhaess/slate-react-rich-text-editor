import React from 'react'
const LinkCustom = (props) => (
  <a
    href={ props.value }
    className={`c-card__` + props.mark.type }
    target='_blank'
    rel="noreferrer"
  >
    { props.children }
  </a>
)

export default LinkCustom;