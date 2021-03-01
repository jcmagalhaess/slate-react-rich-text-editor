import React, { Component, Fragment } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

import Icon from 'react-icons-kit'
import { bold } from 'react-icons-kit/feather/bold'
import { italic } from 'react-icons-kit/feather/italic'
import { code } from 'react-icons-kit/feather/code'
import { list } from 'react-icons-kit/feather/list'
import { underline } from 'react-icons-kit/feather/underline'
import { link2 } from 'react-icons-kit/feather/link2'
import { alignLeft } from 'react-icons-kit/feather/alignLeft'
import { alignCenter } from 'react-icons-kit/feather/alignCenter'
import { alignRight } from 'react-icons-kit/feather/alignRight'
import { type } from 'react-icons-kit/feather/type'

import { BoldMark, ItalicMark, FormatToolbar, AlignCenter } from "./index"
import AlignLeft from './AlignLeft'
import AlignRight from './AlignRight'

const initialValue = Value.fromJSON({
  document: {
    nodes : [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '',
              }
            ]
          }
        ]
      }
    ]
  }
})

export default class TextEditor extends Component {

  state = {
    value: initialValue,
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  onKeyDown = (e, change) => {

    if (!e.ctrlKey) { return }
    e.preventDefault()

    switch (e.key) {
      case 'b': {
        change.toggleMark('bold')
        return true
      }

      case 'i': {
        change.toggleMark('italic')
        return true
      }

      case 'c': {
        change.toggleMark('code')
        return true
      }

      case 'k': {
        change.toggleMark('list')
        return true
      }

      case 'u': {
        change.toggleMark('underline')
        return true
      }

      case 'a': {
        change.toggleMark('link')
        return true
      }

      case 'h': {
        change.toggleMark('heading')
        return true
      }

      case 'e': {
        change.toggleMark('center')
        return true
      }

      case 'l': {
        change.toggleMark('left')
        return true
      }

      case 'r': {
        change.toggleMark('right')
        return true
      }
    
      default:
        break;
    }

    console.log(e.key)
  }

  renderMark = props => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark { ...props } />    
      case 'italic':
        return <ItalicMark { ...props } />
      case 'code':
        return <code { ...props.attributes }>{ props.children }</code>
      case 'list':
        return (
          <ul { ...props.attributes }>
            <li>{ props.children }</li>
          </ul>
        )
      case 'underline':
        return <u { ...props.attributes }>{ props.children }</u>
      case 'link':
        return (
          <a
            href={ prompt('Adicione sua URL:') }
            target='_blank'
            rel="noreferrer"
            { ...props.attributes }
          >
            { props.children }
          </a> 
        )
      case 'heading':
        return <h2 { ...props.attributes }>{ props.children }</h2>
      case 'left':
        return <AlignLeft { ...props } />
      case 'center':
        return <AlignCenter { ...props } />
      case 'right':
        return <AlignRight { ...props } />
      case 'blockquote':
        return (
          <blockquote { ...props.attributes }>
            { props.children }
          </blockquote>
        )

      default:
        break;
    }
  }

  onMarkClick = (e, type) => {
    e.preventDefault()

    const { value } = this.state

    const change = value.change().toggleMark(type)

    this.onChange(change)

    console.log("onMarkClick() => " + change);
  }

  render() {
    return (
      <Fragment>
        <FormatToolbar>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'code')}
            className='c-toolbar__tooltip-button'>
            <Icon icon={code} />
          </button>
          <div className="u-divider"></div>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'heading')}
            className='c-toolbar__tooltip-button'>
            <Icon icon={type} />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'bold')}
            className='c-toolbar__tooltip-button'>
            <Icon icon={bold} />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'italic')}
            className='c-toolbar__tooltip-button'>
            <Icon icon={italic} />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'underline')}
            className='c-toolbar__tooltip-button'>
            <Icon icon={underline} />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'link')}
            className='c-toolbar__tooltip-button'>
            <Icon icon={link2} />
          </button>
          <div className="u-divider"></div>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'left')}
            className='c-toolbar__tooltip-button'>
            <Icon icon={alignLeft} />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'center')}
            className='c-toolbar__tooltip-button'>
            <Icon icon={alignCenter} />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'right')}
            className='c-toolbar__tooltip-button'>
            <Icon icon={alignRight} />
          </button>
          <div className="u-divider"></div>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'list')}
            className='c-toolbar__tooltip-button'>
            <Icon icon={list} />
          </button>
        </FormatToolbar>
        <Editor
          className='c-editor'
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
        />
      </Fragment>
    )
  }
}