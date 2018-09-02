import { IItem, ITag } from "types";

export default class EditableItem {

  public title: string;
  public description: string;
  public content: string;
  public tags?: ITag[];
  public titleError: boolean;
  public descriptionError: boolean;
  public contentError: boolean;
  public tagError?: boolean;
  private error: boolean;

  constructor(item: Partial<IItem>) {
    this.title = item.title || '';
    this.description = item.description || '';
    this.content = item.content || '';
    this.tags = item.tags || [];
    return this;
  }

  public hasErrors = (): boolean => {
    this.validateAll();
    return this.error;
  }

  public validateAll = () => {
    this.validate('title');
    this.validate('description');
    this.validate('content');

    if (this.titleError || this.descriptionError || this.contentError) {
      this.error = true;
    } else {
      this.error = false;
    }

    return this;
  }

  public validate(name: string) {
    if (!this[name]) {
      this[name + 'Error'] = true;
    } else {
      this[name + 'Error'] = false;
    }

    if (this.titleError || this.descriptionError || this.contentError) {
      this.error = true;
    } else {
      this.error = false;
    }

    return this;
  }

}