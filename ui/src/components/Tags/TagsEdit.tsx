import { Chip, MenuItem, Paper, StyleRulesCallback, TextField, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { isEqual } from 'lodash';
import * as React from 'react';
import Select from 'react-select';
import { classNames } from 'react-select/lib/utils';
import { ITag } from 'types';

/*tslint:disable */
type ClassNames = 'root' | 'tagsContainer' | 'tag' | 'input' | 'valueContainer' | 'chip' | 'chipFocused' | 'noOptionsMessage' | 'placeholder' | 'paper';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    margin: '2em 0'
  },
  tagsContainer: {
    textAlign: 'right'
  },
  tag: {
    marginRight: theme.spacing.unit,
    height: '2em',
    fontSize: theme.typography.fontSize * 0.8
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    padding: `${theme.spacing.unit}px 0`
  },
  chip: {
    margin: `0 ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    marginTop: theme.spacing.unit,
  }
});

interface IProps extends WithStyles<typeof styles> {
  tags: ITag[];
  tagSuggestions: ITag[];
  edit: boolean;
  tagsChanged: (tags: ITag[]) => void;
}

interface IState {
  multi: any;
}

interface ITagLabel {
  value: number;
  label: string;
}

function NoOptionsMessage(props: any) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.styles.noOptionsMessage().classname}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

//@ts-ignore
function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props: any) {
  return (
    <TextField
      fullWidth={true}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.styles.input().classname,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props: any) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props: any) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.styles.placeholder().classname}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props: any) {
  return <div className={props.selectProps.styles.valueContainer().classname}>{props.children}</div>;
}

function MultiValue(props: any) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={
        classNames(
          'chip_',
          '',
          { [props.selectProps.styles.chipFocused().classname]: props.isFocused },
          props.selectProps.styles.chip().classname
        )}
      onDelete={event => {
        event.preventDefault();
        event.stopPropagation();
        props.removeProps.onClick();
        props.removeProps.onMouseDown(event);
      }}
    />
  );
}

function Menu(props: any) {
  return (
    <Paper square={true} className={props.selectProps.styles.paper().classname} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Option,
  Control,
  NoOptionsMessage,
  Placeholder,
  MultiValue,
  ValueContainer,
  Menu
};

class TagsEdit extends React.PureComponent<IProps, IState> {

  public constructor(props: IProps) {
    super(props);
    this.state = {
      multi: this.convertTagsToLabels(this.props.tags)
    };
  }

  public componentDidUpdate(newProps: IProps) {
    if (!newProps.edit && this.props.edit || !isEqual(newProps.tags, this.props.tags)) {
      this.setState({
        multi: this.convertTagsToLabels(this.props.tags)
      });
    }
  }

  public convertTagsToLabels = (tagsToConvert: ITag[]): ITagLabel[] => {
    const labels: ITagLabel[] = [];
    for (const tag of tagsToConvert) {
      labels.push({
        value: tag.id,
        label: tag.name
      });
    }
    return labels;
  }

  public convertLabelsToTags = (labelsToConvert: ITagLabel[]) => {
    const tags: ITag[] = [];
    for (const label of labelsToConvert) {
      tags.push({
        id: label.value,
        name: label.label
      });
    }
    return tags;
  }

  public handleChange = (value: ITagLabel[]) => {
    this.props.tagsChanged(this.convertLabelsToTags(value));
    this.setState({
      'multi': value
    });
  };

  public render() {
    const { classes } = this.props;
    const tagChips = [];
    const tagSuggestions = this.convertTagsToLabels(this.props.tagSuggestions);

    const selectStyles = {
      input: (base: React.CSSProperties) => ({
        ...base,
        classname: classes.input
      }),
      valueContainer: (base: React.CSSProperties) => ({
        ...base,
        classname: classes.valueContainer
      }),
      chip: (base: React.CSSProperties) => ({
        ...base,
        classname: classes.chip
      }),
      chipFocused: (base: React.CSSProperties) => ({
        ...base,
        classname: classes.chipFocused
      }),
      noOptionsMessage: (base: React.CSSProperties) => ({
        ...base,
        classname: classes.noOptionsMessage
      }),
      placeholder: (base: React.CSSProperties) => ({
        ...base,
        classname: classes.placeholder
      }),
      paper: (base: React.CSSProperties) => ({
        ...base,
        classname: classes.paper
      })
    };

    for (const tag of this.props.tags) {
      tagChips.push(<Chip
        className={classes.tag}
        key={tag.id}
        label={tag.name}
        component="a"
        clickable={true}
      />);
      tagSuggestions.push({
        value: tag.id,
        label: tag.name
      });
    }

    return (
      <div className={classes.root}>
        <Select
          styles={selectStyles}
          options={tagSuggestions}
          components={components}
          value={this.state.multi}
          onChange={this.handleChange}
          placeholder="Tags"
          isMulti={true}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TagsEdit);