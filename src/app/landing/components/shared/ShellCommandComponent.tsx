import * as React from 'react';
import * as CopyToClipboard from 'react-copy-to-clipboard';
import * as ReactTooltip from 'react-tooltip'
import './ShellCommandComponent.css'

interface IShellCommandProps {
  readonly command: string;
}

class ShellCommand extends React.Component<IShellCommandProps, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      copied: 0
    };

    this.onCopy = this.onCopy.bind(this);
    this.onMouseOutOfCopy = this.onMouseOutOfCopy.bind(this);
    this.getTooltipContents = this.getTooltipContents.bind(this);
  }

  public render() {
    return (
      <React.Fragment>
        <p>
          {this.props.children}
        </p>
        <div className="input-group input-group-lg">
          <div className="input-group-addon shell-command">
            shell$>
          </div>
          <input type="text"
            className="form-control shell-command"
            readOnly={true}
            placeholder={this.props.command} />
          <div className="input-group-btn">
            <CopyToClipboard
              text={this.props.command}
              onCopy={this.onCopy}>
              <button 
                className={'btn ' + (this.state.copied===0 ? 'btn-success' : 'btn-danger')}
                type="button"
                data-effect="solid"
                data-for="copyButton"
                data-tip="Copy shell command"
                onMouseLeave={this.onMouseOutOfCopy}>
                <i className="fa fa-clipboard" />
              </button>
            </CopyToClipboard>

            <ReactTooltip
              id="copyButton"
              />
          </div>
        </div>
      </React.Fragment>
    );
  }

  private onCopy() {
    this.setState({ copied: 1 });
  }

  private onMouseOutOfCopy(){
    this.setState({ copied: 0 });
  }

  private getTooltipContents(){
    return this.state.copied===true ? 'Copied!' : 'Copy shell command';
  }

}

export default ShellCommand;