import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';

type ClassNames = 'editorContainer';

const rootClassName = 'quillEditor';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  editorContainer: {
    display: 'flex',
    alignItems: 'center'
  }
});

interface IProps extends WithStyles<typeof styles> {
  themeName: string;
  content: string;
  onChange: (html: string) => void;
}

interface IState {
  editorHtml: string;
}

class Editor extends React.Component<IProps, IState> {

  /* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
  public modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false
    }
  };

  /* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
  public formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  public placeholder = 'Write something...';

  public constructor(props: IProps) {
    super(props);
    this.state = { editorHtml: '' };
  }

  public render() {

    const EditorContainer = styled('div')`
      .ql-container {
        border-bottom-left-radius: 0.5em;
        border-bottom-right-radius: 0.5em;
        background: #fefcfc;
      }
      
      /* Snow Theme */
      .ql-snow.ql-toolbar {
        display: block;
        background: #eaecec;
        border-top-left-radius: 0.5em;
        border-top-right-radius: 0.5em;
      }
      
      .ql-editor {
        min-height: 18em;
      }

      .ql-video {
        width: 40em;
        height: 25em;
      }
    `;

    return (
      <EditorContainer className={rootClassName}>
        <ReactQuill
          theme={this.props.themeName}
          onChange={this.props.onChange}
          value={this.props.content}
          modules={this.modules}
          formats={this.formats}
          bounds={rootClassName}
          placeholder={this.placeholder}
        />
      </EditorContainer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Editor);