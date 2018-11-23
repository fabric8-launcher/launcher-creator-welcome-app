import * as React from 'react';
import * as CopyToClipboard from 'react-copy-to-clipboard';
import './ShellCommand.css'
import {Button, Split, SplitItem} from '@patternfly/react-core';
import {ClipboardCheckIcon, ClipboardIcon} from '@patternfly/react-icons';

interface ShellCommandProps {
  readonly command: string;
}

class ShellCommand extends React.Component<ShellCommandProps, any> {

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
      <Split className="shell-command">
        <SplitItem isMain={false}>
          <div className="shell-command-prefix">
            $
          </div>
        </SplitItem>
        <SplitItem isMain={true}>
          <input type="text"
                 className="shell-command-value"
                 readOnly={true}
                 placeholder={this.props.command}/>
        </SplitItem>
        <SplitItem isMain={false}>
          <CopyToClipboard
            text={this.props.command}
            onCopy={this.onCopy}>
            <Button
              onMouseLeave={this.onMouseOutOfCopy}>
              {this.state.copied ? <ClipboardCheckIcon/> : <ClipboardIcon/>}
            </Button>
          </CopyToClipboard>
        </SplitItem>
      </Split>
    );
  }

  private onCopy() {
    this.setState({copied: 1});
  }

  private onMouseOutOfCopy() {
    this.setState({copied: 0});
  }

  private getTooltipContents() {
    return this.state.copied === true ? 'Copied!' : 'Copy shell command';
  }

}

export default ShellCommand;