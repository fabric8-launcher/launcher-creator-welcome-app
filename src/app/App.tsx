import * as React from 'react';
import * as _ from 'lodash';
import {
  Brand,
  Button,
  ButtonVariant,
  Nav,
  NavItem,
  NavList,
  Page,
  PageHeader,
  PageSection,
  PageSectionVariants,
  PageSidebar,
  Text,
  TextContent,
  Toolbar,
  ToolbarGroup,
  ToolbarItem
} from '@patternfly/react-core';
import { global_breakpoint_md as breakpointMd } from '@patternfly/react-tokens';
import { CogIcon } from '@patternfly/react-icons';

import logo from '../assets/logo/RHD-logo.svg';
import './App.css';
import appConfig from './config/appConfig';
import capabilitiesCardsMapping from './capabilities/capabilitiesCardsMapping';
import capabilitiesConfig from './config/capabilitiesConfig';
import { CloudDeploymentInfo } from './infos/CloudDeploymentInfo';
import { CodeBaseInfo } from './infos/CodeBaseInfo';
import { getLocationAbsoluteUrl } from '../shared/utils/Locations';
import { checkNotNull } from '../shared/utils/Preconditions';


const appDefinition = checkNotNull(appConfig.definition, 'appConfig.definition');
const backendTier = appDefinition.tiers.find(t => t.tier === 'backend');
const backendCapabilityDefinitionByModule = _.keyBy(backendTier ? backendTier.capabilities : [], 'module');

export default class App extends React.Component<{}, { isNavOpen: boolean }> {

  constructor(props) {
    super(props);
    const isNavOpen = typeof window !== 'undefined' && window.innerWidth >= parseInt(breakpointMd.value, 10);
    this.state = {
      isNavOpen,
    }
  }

  public render() {

    const PageNav = (
      <Nav onSelect={this.onNavSelect} onToggle={this.onNavToggle} aria-label="Nav">
        <NavList>
          <NavItem to={`#cloud-deployment-info`}>
            Cloud Deployment
          </NavItem>
          <NavItem to={`#codebase-info`}>
            Codebase
          </NavItem>
          {_.values(capabilitiesConfig).filter(this.showCapability).map(c => (
            <NavItem key={c.module} to={`#${c.module}-capability`}>
              {c.name}
            </NavItem>
          ))}
        </NavList>
      </Nav>
    );
    const PageToolbar = (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarItem>
            <Button id="nav-toggle" aria-label="Overflow actions" variant={ButtonVariant.plain}>
              <CogIcon />
            </Button>
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    );

    const Header = (
      <PageHeader
        logo={<Brand src={logo} alt="Red Hat" />}
        toolbar={PageToolbar}
        showNavToggle
        onNavToggle={this.onNavToggle}
      />
    );

    const Sidebar = <PageSidebar nav={PageNav} isNavOpen={this.state.isNavOpen} />;

    return (
      <React.Fragment>
        <Page header={Header} sidebar={Sidebar}>
          <PageSection variant={PageSectionVariants.light}>
            <TextContent>
              <Text component="h1">Here we go.</Text>
              <Text component="p">
                Congratulations; we've together built a working system of application code and services running on the OpenShift platform.
                Everything is hooked together for you to bring your ideas to life.
              </Text>
            </TextContent>
          </PageSection>
          <PageSection>
            <CloudDeploymentInfo applicationUrl={getLocationAbsoluteUrl('')} openshiftConsoleUrl={appConfig.openshiftConsoleUrl!} />
            {backendTier && (
              <CodeBaseInfo runtime={backendTier.extra.runtimeInfo} baseImage={backendTier.extra.runtimeImage}
                sourceRepository={appConfig.sourceRepository} />
            )}
            {_.values(capabilitiesConfig).filter(this.showCapability).map(c => {
              const CapabilityComponent = capabilitiesCardsMapping[c.module];
              const capabilityDefinition = backendCapabilityDefinitionByModule[c.module];
              const props = capabilityDefinition ? { ...capabilityDefinition.props, extra: capabilityDefinition.extra } : {};
              return (
                <CapabilityComponent {...props} key={c.module} />
              );
            })}
          </PageSection>
        </Page>
      </React.Fragment>
    );
  }

  private showCapability = (capability: { module: string, requireDefinition: boolean }) => {
    return !capability.requireDefinition || !!backendCapabilityDefinitionByModule[capability.module];
  };

  private onNavSelect = result => {
  };

  private onNavToggle = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  };
}