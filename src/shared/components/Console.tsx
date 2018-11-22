import {TextArea} from '@patternfly/react-core';
import * as React from 'react';

import './Console.css';

export function Console(props: { id: string, content?: string }) {
  const onChange = () => {};
  const consoleContent = props.content || '';
  return props.content ? (
    <TextArea id={props.id} name="console" onChange={onChange}
              className="console" rows={5} disabled={true} value={consoleContent}/>
  ): (<div />);
}