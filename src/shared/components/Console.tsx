import * as React from 'react';
import {Component} from 'react';

import './Console.css';

export class Console extends Component<{ id: string, content?: Array<(string | React.ReactNode)>}> {

  private readonly ref = React.createRef<HTMLDivElement>();

  public componentDidUpdate() {
   if (this.ref.current) {

     if (this.ref.current.lastChild) {
       const offset = (this.ref.current.lastChild as HTMLDivElement).offsetTop - this.ref.current.offsetTop;
       this.ref.current.scrollTop = offset;
     }
     this.ref.current.style.height = this.ref.current.scrollHeight <= 130 ? '130px' : '300px';
   }
  }

  public render() {
    const consoleContent = this.props.content || [];
    return (
      <div className="console" id={this.props.id}>
        <div className="console-content" ref={this.ref}>
          {consoleContent.map((c, i) => (<div key={i} className="console-content-row">{c}</div>) )}
        </div>
      </div>
    );
  }
}