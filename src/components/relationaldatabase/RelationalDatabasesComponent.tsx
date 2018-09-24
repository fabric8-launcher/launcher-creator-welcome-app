import * as React from 'react';
import { Control, LocalForm } from 'react-redux-form';
import CAPABILITIES from '../../data/Capabilities';
import Capability, {
  CapabilityElement,
  CapabilityHeader,
  CapabilitySpacer
} from '../shared/CapabilityComponent';
import ShellCommand from '../shared/ShellCommandComponent';
import { formatCurrentTime, HttpMethodType } from '../shared/Utilities'
import './RelationalDatabasesComponent.css';

export interface IRelationalDatabases {
  readonly relationalDatabases: IRelationalDatabase[];
}

export interface IRelationalDatabase {
  index?: number;
  relationalDatabase: IRelationalDatabaseProps;
}

export interface IRelationalDatabaseProps {
  readonly baseUrl: string,
  readonly deploymentUrl: string;
  readonly description: string;
  readonly endpoints: IRelationalDatabaseEndpoint[];
  // Name of the container image used
  readonly image: string;
  // Link to documentation (ie. RHT Container Catalog) about the image in use
  readonly imageUrl: string;
  readonly jsonSpecUrl: string;
  readonly name: string;
  readonly password: string;
  // Link to the OpenShift Console where the user may define an external route for the DB service
  readonly routeUrl: string;
  readonly swaggerUrl: string;
  readonly username: string;

}

export interface IRelationalDatabaseEndpoint {
  index?: number;
  endpoint: IRelationalDatabaseEndpointProps;

  // These will get removed when the UI actually calls the backend;
  // for now mock a store of fruits
  fruits?: {};
  nextFruitPk?: number;

  // Supplied by combining parent's baseUrl and this path
  readonly url?: string;
}

export interface IRelationalDatabaseEndpointProps {
  readonly methods: HttpMethodType[]
  readonly name: string;
  readonly path: string;
  readonly sourceUrl: string;
}

const RelationalDatabases: React.SFC<IRelationalDatabases> = (props) => {
  return (
    <Capability capability={CAPABILITIES.relationalDatabases}>

      {
        props.relationalDatabases.map((db, i) => {
          return (
            <RelationalDatabase
              key={i}
              relationalDatabase={db.relationalDatabase}
              index={i}
            />
          );
        })
      }

    </Capability>
  );
}

const RelationalDatabase: React.SFC<IRelationalDatabase> = (props) => {

  const fruits = {
    0: "Apple",
    1: "Pear",
    2: "Tomato, for some reason"
  };
  const nextFruitPk = 3;

  return (
    <React.Fragment>
      <CapabilityHeader
        capability={CAPABILITIES.relationalDatabases}>

        <h2 className="mt-0">{props.relationalDatabase.name}</h2>
        <p>
          {props.relationalDatabase.description}
        </p>

        <CapabilityElement
          name="Username">
          <samp>{props.relationalDatabase.username}</samp>
        </CapabilityElement>

        <CapabilityElement
          name="Password">
          <samp>{props.relationalDatabase.password}</samp>
        </CapabilityElement>

        <CapabilityElement
          name="Deployment">
          <samp>
            <a href={props.relationalDatabase.deploymentUrl}
              target="_blank"
              data-toggle="tooltip"
              title="Launch the Console for this DB">
              {props.relationalDatabase.deploymentUrl} <i className="fa fa-external-link-square" />
            </a>
          </samp>
        </CapabilityElement>

        <CapabilityElement
          name="Image">
          <samp>
            <a href={props.relationalDatabase.imageUrl}
              target="_blank"
              data-toggle="tooltip"
              title="Learn more about this image from the catalog documentation">
              {props.relationalDatabase.image} <i className="fa fa-external-link-square" />
            </a>
          </samp>
        </CapabilityElement>

        <p className="margin-top-1rem">
          For security purposes, this database instance is not currently
          exposed to the world outside OpenShift. To do that, you may define a
            route <a href="#" target="_blank">here <i className="fa fa-external-link-square" /></a>
          . <span className="text-danger small">ALR Note: factor in discussion of Secrets or ConfigMap here
          to note how the user/pass info is managed? How about a link to documentation on how to
            change the user/pass and be sure the configs are updated to use the new auth data?</span>
        </p>

      </CapabilityHeader>

      <CapabilitySpacer />

      <p>
        As a starting point for your development, we have created a
        table and populated it with some data. We've additionally
        exposed CRUD operations via the following endpoints
        to give you a system that works end to end.
      </p>

      <CapabilityElement
        name="Base URL">
        <samp>
          {props.relationalDatabase.baseUrl}
        </samp>
      </CapabilityElement>

      <CapabilityElement
        name="Swagger URL">
        <samp>
          <a href={props.relationalDatabase.swaggerUrl}
            target="_blank"
            data-toggle="tooltip"
            title="Launch interactive Swagger Documentation">
            {props.relationalDatabase.swaggerUrl} <i className="fa fa-external-link-square" />
          </a>
        </samp>
      </CapabilityElement>

      <CapabilityElement
        name="JSON Spec">
        <samp>
          <a href={props.relationalDatabase.jsonSpecUrl}
            target="_blank"
            data-toggle="tooltip"
            title="Launch interactive Swagger Documentation">
            {props.relationalDatabase.jsonSpecUrl} <i className="fa fa-external-link-square" />
          </a>
        </samp>
      </CapabilityElement>

      {
        props.relationalDatabase.endpoints.map((endpoint, i) => {
          return (
            <React.Fragment key={i}>

              <CapabilitySpacer />

              <RelationalDatabaseEndpoint
                endpoint={endpoint.endpoint}
                index={i}
                fruits={fruits}
                nextFruitPk={nextFruitPk}
                url={props.relationalDatabase.baseUrl + endpoint.endpoint.path}
              />

            </React.Fragment>
          );
        })
      }

    </React.Fragment>
  );
}

class RelationalDatabaseEndpoint extends React.Component<IRelationalDatabaseEndpoint, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      consoleContents: ""
    }

    this.execGet = this.execGet.bind(this);
    this.execPost = this.execPost.bind(this);
    this.execPut = this.execPut.bind(this);
    this.execDelete = this.execDelete.bind(this);
  }

  public render() {


    const methods = this.props.endpoint.methods.map((method, i) => {

      let returnValue;
      if (method === HttpMethodType.GET) {
        returnValue = (
          <LocalForm
            onSubmit={this.execGet}
            className="form-horizontal"
            key={i}>
            <div className="form-group">
              <div className="col-sm-2">

                <Control.button
                  model=".getButton"
                  name={"getButton" + method + "-" + i}
                  className="btn btn-info btn-lg"
                  type="submit"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Execute GET Request"
                >GET</Control.button>

              </div>
              <div className="col-sm-10">
                <label
                  htmlFor={"getButton" + method + "-" + i}
                  className="relationalDbEndpointLabel">
                  List all entries
              </label>
              </div>
            </div>
          </LocalForm>
        )
      } else if (method === HttpMethodType.POST) {
        returnValue = (
          <LocalForm
            onSubmit={this.execPost}
            className="form-horizontal"
            key={i}>
            <div className="form-group">
              <div className="col-sm-2">
                <Control.button
                  model=".postButton"
                  className="btn btn-success btn-lg"
                  type="submit"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Execute POST Request"
                >POST</Control.button>
              </div>
              <div className="col-sm-10">
                <Control.text
                  className="form-control input-lg"
                  model={'relationalDbMethod-' + method + 'PostInput' + i}
                  placeholder="Item to add"
                />
              </div>
            </div>
          </LocalForm>

        )
      } else if (method === HttpMethodType.PUT) {
        returnValue = (

          <LocalForm
            onSubmit={this.execPut}
            className="form-horizontal"
            key={i}>
            <div className="form-group">

              <div className="col-sm-2">
                <Control.button
                  model=".putButton"
                  className="btn btn-warning btn-lg"
                  type="submit"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Execute PUT Request"
                >PUT</Control.button>
              </div>

              <div className="col-sm-5">
                <Control.text
                  className="form-control input-lg"
                  model={'relationalDbMethod-' + method + 'PutInput1-' + i}
                  placeholder="ID"
                />
              </div>

              <div className="col-sm-5">
                <Control.text
                  className="form-control input-lg"
                  model={'relationalDbMethod-' + method + 'PutInput2-' + i}
                  placeholder="New value"
                />

              </div>
            </div>
          </LocalForm>
        )
      } else if (method === HttpMethodType.DELETE) {
        returnValue = (

          <LocalForm
            onSubmit={this.execDelete}
            className="form-horizontal"
            key={i}
          >
            <div className="form-group">
              <div className="col-sm-2">
                <Control.button
                  model=".deleteButton"
                  className="btn btn-danger btn-lg"
                  type="submit"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Execute DELETE Request"
                >DELETE</Control.button>
              </div>
              <div className="col-sm-10">
                <Control.text
                  className="form-control input-lg"
                  model={'relationalDbMethod-' + method + 'DeleteInput' + i}
                  placeholder="Item to remove"
                />
              </div>
            </div>
          </LocalForm>

        )
      }

      return returnValue;
    });

    return (
      <CapabilityElement
        name={this.props.endpoint.name}
        url={this.props.endpoint.sourceUrl}
        tooltip="View source on GitHub">
        <CapabilityElement
          name={this.props.endpoint.path}
          classes="text-monospace break-word"
          firstColSize={3}
        >
          <div className="col-sm-12">

            {methods}

            <textarea
              className="console"
              rows={5}
              disabled={true}
              value={this.state.consoleContents}
            />

            <ShellCommand
              command={"curl " + this.props.url}>
              You may test this directly by making an <samp>HTTP</samp> request using this
              URL. For instance, try with the <samp>cURL</samp> tool:
            </ShellCommand>

          </div>
        </CapabilityElement>
      </CapabilityElement>
    )
  }

  private execGet(e: React.FormEvent<HTMLFormElement>, event: any) {
    this.logToConsole(JSON.stringify(this.props.fruits));
  }

  private execPost(e: React.FormEvent<HTMLFormElement>, event: any) {

    const pk = this.props.nextFruitPk ? this.props.nextFruitPk : 0;
    const name = event.target[1].value;
    if (this.props.fruits) {
      this.props.fruits[pk] = name;
    }
    event.target[1].value = "";

    this.logToConsole("Created fruit \"" + name + "\" with ID " + pk + ".");

  }

  private execPut(e: React.FormEvent<HTMLFormElement>, event: any) {

    const pk = event.target[1].value;
    const name = event.target[2].value;
    if (this.props.fruits) {
      this.props.fruits[pk] = name;
    }
    event.target[1].value = "";
    event.target[2].value = "";

    this.logToConsole("Updated fruit with ID " + pk + " to \"" + name + "\"");
  }

  private execDelete(e: React.FormEvent<HTMLFormElement>, event: any) {

    const pk = event.target[1].value;
    if (this.props.fruits) {
      delete this.props.fruits[pk];
    }
    event.target[1].value = "";

    this.logToConsole("Removed fruit with ID " + pk + ".");
  }

  private logToConsole(response: string) {
    this.setState((state: any, props: any) => ({
      consoleContents: formatCurrentTime() + ": " + response + '\n' + state.consoleContents
    }));
  }
}

export default RelationalDatabases;
