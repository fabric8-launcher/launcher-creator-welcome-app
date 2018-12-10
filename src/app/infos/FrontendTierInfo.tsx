import { Grid, GridItem } from '@patternfly/react-core';
import { ScreenIcon } from '@patternfly/react-icons';
import * as React from 'react';
import InfoCard from '../components/InfoCard';
import { ExternalLink } from '../../shared/components/ExternalLink';
import { getRouteLink } from '../config/appConfig';

interface FrontendTierInfoProps {
  frameworkInfo: {
    name: string;
    description: string;
    icon: string;
    metadata: {
      language: string;
    }
  };
  frameworkImage: string;
  frameworkService: string;
  frameworkRoute: string;
}



export function FrontendTierInfo(props: FrontendTierInfoProps) {
  const link = getRouteLink(props.frameworkRoute);
  return (
    <InfoCard name="frontend-tier">
      <InfoCard.Title><ScreenIcon className="with-text" />
        Front-end - {props.frameworkInfo.name} - {props.frameworkInfo.metadata.language}</InfoCard.Title>
      <InfoCard.Body>
        <Grid>
          <GridItem span={3}>
            <img src={props.frameworkInfo.icon} />
          </GridItem>
          <GridItem span={9}>
            <h1>{props.frameworkInfo.name} - {props.frameworkInfo.metadata.language}</h1>
            <p className="description">{props.frameworkInfo.description}</p>
          </GridItem>
          <InfoCard.Separator />
          <GridItem span={3}>Framework Image</GridItem><GridItem span={9}>{props.frameworkImage}</GridItem>
          <InfoCard.Separator />
          <GridItem span={3}>Service name</GridItem><GridItem span={9}>{props.frameworkService}</GridItem>
          <InfoCard.Separator />
          <GridItem span={3}>Route</GridItem><GridItem span={9}><ExternalLink href={link} >{link}</ExternalLink></GridItem>
        </Grid>
      </InfoCard.Body>
    </InfoCard>
  );
}