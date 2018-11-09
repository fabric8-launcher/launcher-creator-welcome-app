import * as React from 'react';
import {
  Alert,
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
import {CogIcon} from '@patternfly/react-icons';

import logo from '../assets/logo/RHD-logo.svg';
import './App.css';
import LandingPage from './landing/LandingPage';

export default class App extends React.Component<{}> {

  constructor(props) {
    super(props);
  }

  public render() {

    const PageNav = (
      <Nav onSelect={this.onNavSelect} onToggle={this.onNavToggle} aria-label="Nav">
        <NavList>
          <NavItem to="#nav-capability-cloudDeployment" itemId={0}>
            Overview
          </NavItem>
          <NavItem to="#nav-capability-codebase" itemId={1}>
            Runtime info
          </NavItem>
          <NavItem to="#nav-capability-healthChecks" itemId={2}>
            Health checks
          </NavItem>
          <NavItem to="#nav-capability-httpApiEndpoints" itemId={3}>
            HTTP API Endpoints
          </NavItem>
          <NavItem to="#nav-capability-relationalDatabases" itemId={4}>
            Relational Databases
          </NavItem>
          <NavItem to="#nav-capability-messaging" itemId={4}>
            Messaging
          </NavItem>
        </NavList>
      </Nav>
    );
    const PageToolbar = (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarItem>
            <Button id="nav-toggle" aria-label="Overflow actions" variant={ButtonVariant.plain}>
              <CogIcon/>
            </Button>
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    );

    const Header = (
      <PageHeader
        logo={<Brand src={logo} alt="Red Hat"/>}
        toolbar={PageToolbar}
      />
    );

    const Sidebar = <PageSidebar nav={PageNav} isNavOpen={true} />;

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
              <Alert variant="warning">
                This application is mocking interactions with the actual services to demonstrate future features.
                Be patient, the real magic will happen soon..
              </Alert>
            </TextContent>
          </PageSection>
          <PageSection>
            <LandingPage/>
          </PageSection>
        </Page>
      </React.Fragment>
    );
  }

  private onNavSelect = result => {
  };

  private onNavToggle = () => {
  };
}