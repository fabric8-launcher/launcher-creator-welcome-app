import { Grid, GridItem } from '@patternfly/react-core';
import { ServicesIcon } from '@patternfly/react-icons';
import * as React from 'react';
import InfoCard from '../components/InfoCard';
import { ExternalLink } from '../../shared/components/ExternalLink';
import { getRouteLink } from '../config/appConfig';
import DockerImageLink from '../components/DockerImageLink';

interface BackendTierInfoProps {
  runtimeInfo: {
    name: string;
    description: string;
    icon: string;
    metadata: {
      language: string;
    }
  };
  runtimeImage: string;
  runtimeService: string;
  runtimeRoute: string;
}

export function BackendTierInfo(props: BackendTierInfoProps) {
  const link = getRouteLink(props.runtimeRoute);
  return (
    <InfoCard name="backend-tier">
      <InfoCard.Title><ServicesIcon className="with-text" />
        Backend - {props.runtimeInfo.name} - {props.runtimeInfo.metadata.language}</InfoCard.Title>
      <InfoCard.Body>
        <Grid>
          <GridItem span={3}>
            <img src={props.runtimeInfo.icon} />
          </GridItem>
          <GridItem span={9}>
            <h1>{props.runtimeInfo.name} - {props.runtimeInfo.metadata.language}</h1>
            <p className="description">{props.runtimeInfo.description}</p>
          </GridItem>
          <InfoCard.Separator />
          <GridItem span={3}>Runtime Image</GridItem><GridItem span={9}><DockerImageLink image={props.runtimeImage} /></GridItem>
          <InfoCard.Separator />
          <GridItem span={3}>Service name</GridItem><GridItem span={9}>{props.runtimeService}</GridItem>
          <InfoCard.Separator />
          <GridItem span={3}>Route</GridItem><GridItem span={9}><ExternalLink href={link} >{link}</ExternalLink></GridItem>
        </Grid>
      </InfoCard.Body>
    </InfoCard>
  );
}