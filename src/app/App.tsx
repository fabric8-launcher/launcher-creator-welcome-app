import * as React from 'react';
import CloudDeployment from './components/clouddeployment/CloudDeploymentComponent';
import Codebase from './components/codebase/CodebaseComponent';
import HealthChecks from './components/healthcheck/HealthChecksComponent';
import HttpApiEndpoints from './components/httpapiendpoint/HttpApiEndpointsComponent';
import Messaging from './components/messaging/MessagingComponent';
import RelationalDatabase from './components/relationaldatabase/RelationalDatabasesComponent';
import APPLICATION_PROFILE from './data/ApplicationProfile';

type ApplicationProfile = Readonly<typeof APPLICATION_PROFILE>;

class App extends React.Component<object , ApplicationProfile> {

  private readonly applicationProfile: ApplicationProfile = APPLICATION_PROFILE;
  private readonly cloudDeployment = this.applicationProfile.capabilities.cloudDeployment;
  private readonly codebase = this.applicationProfile.capabilities.codebase;
  private readonly healthChecks = this.applicationProfile.capabilities.healthChecks;
  private readonly httpApiEndpoints = this.applicationProfile.capabilities.httpApiEndpoints;
  private readonly messagingBrokers = this.applicationProfile.capabilities.messagingBrokers;
  private readonly relationalDatabases = this.applicationProfile.capabilities.relationalDatabases;

  public render() {
    return (
    <React.Fragment>

      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>Here we go.</h1>
            <p>Congratulations; we've together built a working
              system of application code and services running on the
              OpenShift platform. Everything is hooked together for
              you to bring your ideas to life.</p>

            <p>Let's explore what's available.</p>

            <div className="btn-group-vertical" role="group" aria-label="capabilities">
              
              { this.cloudDeployment ? ( 
                <a href="#cloudDeployment" className="btn btn-lg btn-info">
                  <i className="fa fa-code" /> Cloud Deployment
                </a>
                ) : ( 
                  <div className="text-danger">Cloud Deployment is a required capability.</div>
                )
              }
              { this.codebase ? ( 
                <a href="#codebase" className="btn btn-lg btn-info">
                  <i className="fa fa-code" /> Runtime Application - Eclipse Vert.x
                </a>
                ) : ( 
                  <div className="text-danger">Codebase is a required capability.</div>
                )
              }
              { this.healthChecks ? ( 
                <a href="#healthChecks" className="btn btn-lg btn-info">
                  <i className="fa fa-medkit"/> Health Checks
                </a>
                ) : ( 
                  <div className="text-danger">Health Checks is a required capability.</div>
                )
              }
              { this.httpApiEndpoints ? ( 
                <a href="#httpApiEndpoints" className="btn btn-lg btn-info">
                  <i className="fa fa-plug" /> HTTP API Endpoints
                </a>
                ) : ( 
                  <div className="text-danger">HTTP Endpoints is a required capability.</div>
                )
              }
              { this.relationalDatabases ? ( 
                <a href="#relationalDatabases" className="btn btn-lg btn-info">
                  <i className="fa fa-database" /> Relational Databases
                </a>
                ) : ( 
                  <div className="text-danger">Relational Databases is a required capability.</div>
                )
              }
              { this.messagingBrokers ? ( 
                <a href="#messaging" className="btn btn-lg btn-info">
                  <i className="fa fa-envelope-open" /> Messaging
                </a>
                ) : ( 
                  <div className="text-danger">Messaging is a required capability.</div>
                )
              }
              
            </div>

            <hr />

          </div>
        </div>
      </div>

      { this.cloudDeployment ? ( 
        <CloudDeployment 
          cloudDeployment={this.cloudDeployment}
          />
        ) : ( 
          <div className="text-danger">Cloud Deployment is a required capability.</div>
        )
      }
      
      { this.codebase ? ( 
        <Codebase 
          codebase={this.codebase}
          />
        ) : ( 
          <div className="text-danger">Codebase is a required capability.</div>
        )
      }

      { this.healthChecks ? ( 
        <HealthChecks 
          healthChecks={this.healthChecks}
          />
        ) : ( 
          <div className="text-danger">Health Checks is a required capability.</div>
        )
      }

      { this.httpApiEndpoints ? ( 
        <HttpApiEndpoints 
          endpoints={this.httpApiEndpoints}
          />
        ) : ( 
          <div className="text-danger">Health Checks is a required capability.</div>
        )
      }

      { this.relationalDatabases ? ( 
        <RelationalDatabase
          relationalDatabases={this.relationalDatabases}
          />
        ) : ( 
          <div className="text-danger">Relational Databases is a required capability.</div>
        )
      }

      { this.messagingBrokers ? ( 
        <Messaging
          messagingBrokers={this.messagingBrokers}
          />
        ) : ( 
          <div className="text-danger">Messaging is a required capability.</div>
        )
      }
    </React.Fragment>
    );
  }
}

export default App;
