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
import { link } from 'react-icons-kit/feather/link'
import { tag } from 'react-icons-kit/feather/tag'
import { alignLeft } from 'react-icons-kit/feather/alignLeft'
import { alignCenter } from 'react-icons-kit/feather/alignCenter'
import { alignRight } from 'react-icons-kit/feather/alignRight'
import { type } from 'react-icons-kit/feather/type'
import { maximize2 } from 'react-icons-kit/feather/maximize2'
import { download } from 'react-icons-kit/feather/download'

import { BoldMark, ItalicMark, FormatToolbar, Alignment } from "./index"

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

    if (!e.ctrlKey) return 

    e.preventDefault()

    switch(e.key) {
			/* When "b" is pressed, add a "bold" mark to the text. */
			case 'b': {
				change.toggleMark('bold');
				return true;
			}
			case 'i': {
				change.toggleMark('italic');
				return true;
			}

			case 'c': {
				change.toggleMark('code');
				return true;
			}

			case 'l': {
				change.toggleMark('list');
				return true;
			}

			case 'u': {
				change.toggleMark('underline');
				return true;
			}

			case 'q': {
				change.toggleMark('quote');
				return true;
			}

			case 'h': {
				change.toggleMark('title');
				return true;
			}

			default: {
				return;
			}
    }

  }

	renderNode = (props) => {
		switch (props.node.type) {
			case 'link': {
				console.log(props.node.data.get('href'));
				return (
					<a href={props.node.data.get('href')} {...props.attributes}>
						{props.children}
					</a>
				);
			}

			default: {
				return;
			}
		}
	};

  renderMark = (props) => {
    switch (props.mark.type) {
			case 'bold':
				return <BoldMark {...props} />;

			case 'italic':
				return <ItalicMark {...props} />;

			case 'code':
				return <code {...props.attributes}>{props.children}</code>;

			case 'list':
				return (
					<ul {...props.attributes}>
						<li>{props.children}</li>
					</ul>
				);

			case 'underline':
				return <u {...props.attributes}>{props.children}</u>;

			case 'quote':
				return <blockquote {...props.attributes}>{props.children}</blockquote>;

			case 'title':
				return <h1 {...props.attributes}>{props.children}</h1>;

      case 'left':
        return <Alignment { ...props } />

      case 'center':
        return <Alignment { ...props } />

      case 'right':
        return <Alignment { ...props } />

      case 'maximize':
        return (
          this.maximize( ...props )
        )

      default:
        break;
    }
  }

	hasLinks = () => {
		const { value } = this.state;
    console.log(value.inlines.some((inline) => inline.type === 'link'))
		return value.inlines.some((inline) => inline.type === 'link');
	};

	wrapLink = (change, href) => {
		change.wrapInline({
			type: 'link',
			data: { href },
		});

		change.collapseToEnd();
	};

	unwrapLink = (change) => change.unwrapInline('link');

	onLinkClick = (e) => {
		/* disabling browser default behavior like page refresh, etc */
		e.preventDefault();

		const { value } = this.state;
		const hasLinks = this.hasLinks();
		const change = value.change();

		if (hasLinks) {
			// change.call(this.unwrapLink);
      console.log(change.call(this.unwrapLink))
		} else if (value.isExpanded) {
			const href = window.prompt('Enter the URL of the link:');
      console.log(href.length > 0 ? change.call(this.wrapLink, href) : null)
			// return href.length > 0 ? change.call(this.wrapLink, href) : null;
		} else {
			const href = window.prompt('Enter the URL of the link:');
			const text = window.prompt('Enter the text for the link:');

			console.log(href.length > 0
				? change
						.insertText(text)
						.extend(0 - text.length)
						.call(this.wrapLink, href)
				: null)
		}

		this.onChange(change);
	};

	renderLinkButton = (type, icon) => (
		<button
			onPointerDown={(e) => this.onLinkClick(e, type)}
			className="c-toolbar__tooltip-button"
		>
			<Icon icon={icon} />
		</button>
	);

	onMarkClick = (e, type) => {
		/* disabling browser default behavior like page refresh, etc */
		e.preventDefault();

		/* grabbing the this.state.value */
		const { value } = this.state;

		/*
			applying the formatting on the selected text
			which the desired formatting
		*/
		const change = value.change().toggleMark(type);

		/* calling the  onChange method we declared */
		this.onChange(change);
	};

  renderMarkButton = (type, icon) => (
		<button
			onPointerDown={(e) => this.onMarkClick(e, type)}
      className='c-toolbar__tooltip-button'
		>
			<Icon icon={icon} />
		</button>
  )
  
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
					renderNode={this.renderNode}
          placeholder='Notes'
          ref={el => (this.componentRef = el)}
        />
        <FormatToolbar>
					{this.renderMarkButton('code', code)}
          <div className="u-divider"></div>
					{this.renderMarkButton('title', type)}
					{this.renderMarkButton('bold', bold)}
					{this.renderMarkButton('italic', italic)}
					{this.renderMarkButton('underline', underline)}
          <div className="u-divider"></div>
					{this.renderMarkButton('left', alignLeft)}
					{this.renderMarkButton('center', alignCenter)}
					{this.renderMarkButton('right', alignRight)}
          <div className="u-divider"></div>
					{this.renderMarkButton('list', list)}
					{this.renderMarkButton('quote', tag)}
					{this.renderLinkButton('link', link)}
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