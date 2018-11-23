import * as React from 'react';
import {ExternalLink} from './ExternalLink';


export function SourceMappingLink(props: {
  sourceRepositoryUrl?: string;
  name: string;
  fileRepositoryLocation: string;
}) {
  if (props.sourceRepositoryUrl) {
    const link = props.sourceRepositoryUrl + props.fileRepositoryLocation;
    return (<div>{props.name} (<ExternalLink href={link}>view source</ExternalLink>)</div>)
  }
  return (<div>{props.fileRepositoryLocation}</div>);
}