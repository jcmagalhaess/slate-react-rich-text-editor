import React, { Component, Fragment } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

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
import { maximize2 } from 'react-icons-kit/feather/maximize2'
import { download } from 'react-icons-kit/feather/download'

import { BoldMark, ItalicMark, FormatToolbar, Alignment, LinkCustom } from "./index"

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

  constructor(props) {
    super(props);

    this.state = {
      value: initialValue,
      maximize: false,
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

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

  }

  onMarkClick = (e, type) => {
    e.preventDefault()

    const { value } = this.state

    const change = value.change().toggleMark(type)

    this.onChange(change)
  }
  
  urlLink = (props) => {
    if ( props.mark.type === 'link' ) {
      const url = prompt('Type your link: ')
      return url;
    }
  }
  renderMark = (props) => {
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
        return <LinkCustom value={ this.urlLink({ ...props }) } { ...props } />
      case 'heading':
        return <h2 { ...props.attributes }>{ props.children }</h2>
      case 'left':
        return <Alignment { ...props } />
      case 'center':
        return <Alignment { ...props } />
      case 'right':
        return <Alignment { ...props } />
      case 'blockquote':
        return (
          <blockquote { ...props.attributes }>
            { props.children }
          </blockquote>
        )
      case 'maximize':
        return (
          this.maximize( ...props )
        )

      default:
        break;
    }
  }
  
  render() {

    var handler = this.props.handler

    return (
      <Fragment>
        <Editor
          className='c-card__editor'
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
          placeholder='Notes'
          ref={el => (this.componentRef = el)}
        />
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
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'link')}
            className='c-toolbar__tooltip-button'
          >
            <Icon icon={link2} />
          </button>
          <div className="u-divider"></div>
          <button
            onClick={() => handler('maximize')}
            className='c-toolbar__tooltip-button'
          >
            <Icon icon={maximize2} />
          </button>
          {/* Printer */}
          <ReactToPrint
            content={() => this.componentRef}
            pageStyle={'@media print {code {background-color: #2b303b;}} @page { font-size: 30px; size: A4; margin: 200mm !important}'}
          >
            <PrintContextConsumer>
              {({ handlePrint }) => (
                <button
                  onClick={handlePrint}
                  className='c-toolbar__tooltip-button'>
                  <Icon icon={download} />
                </button>
              )}
            </PrintContextConsumer>
          </ReactToPrint>
        </FormatToolbar>
      </Fragment>
    )
  }
}