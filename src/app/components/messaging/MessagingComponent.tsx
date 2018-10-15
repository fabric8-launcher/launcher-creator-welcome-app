import * as React from 'react';
import { Control, LocalForm } from 'react-redux-form';
import CAPABILITIES from '../../data/Capabilities';
import Capability, {
  CapabilityElement,
  CapabilityHeader,
  CapabilitySpacer
} from '../shared/CapabilityComponent';
import { formatCurrentTime } from '../shared/Utilities'

export interface IMessagingBrokers {
  readonly messagingBrokers: IMessagingBroker[];
}

export interface IMessagingBroker {
  index?: number;
  messagingBroker: IMessagingBrokerProps;
}

export interface IMessagingBrokerProps {
  readonly consoleUrl: string;
  readonly description: string;
  // Name of the container image used
  readonly image: string;
  // Link to documentation (ie. RHT Container Catalog) about the image in use
  readonly imageUrl: string;
  readonly name: string;
  readonly password: string;
  readonly queues: IQueue[];
  readonly topics: ITopic[];
  readonly username: string;

}

export interface IQueue {
  index?: number;
  queue: IQueueProps;
}

export interface ITopic {
  index?: number;
  topic: ITopicProps;
}

export interface IQueueProps {
  readonly consumerSourceFileName: string;
  readonly consumerSourceUrl: string;
  readonly path: string;
  readonly producerSourceFileName: string;
  readonly producerSourceUrl: string;
}

export interface ITopicProps {
  readonly path: string;
  readonly publisherSourceFileName: string;
  readonly publisherSourceUrl: string;
  readonly subscriberSourceFileName: string;
  readonly subscriberSourceUrl: string;
}

const enum MessagingDestinationType {
  TOPIC ='Topic',
  QUEUE = 'Queue'
}

class MessagingDestination extends React.Component<IMessagingDestination, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      consoleContents: ''
    }

    this.sendMessage = this.sendMessage.bind(this);

  }

  public render() {
    return (
      <CapabilityElement
        name={this.props.destination}
        classes="text-monospace">

        <LocalForm
          onSubmit={this.sendMessage}
          className="form-horizontal"
        >

          <div className="input-group input-group-lg">

            <label
              htmlFor={`message${this.props.index}${this.props.type.toString}Input`}
            >{this.props.type===MessagingDestinationType.QUEUE ? 'Producer' : 'Publisher'}</label>

          </div>

          <div className="input-group input-group-lg">

            <Control.text
              className="form-control input-lg"
              model={`.message${this.props.index}${this.props.type}Input`}
              placeholder="Message"
            />

            <div className="input-group-btn">
              <Control.button
                model={`.message${this.props.index}${this.props.type}ExecuteButton`}
                className="btn btn-success btn-lg"
                type="submit">{this.props.type===MessagingDestinationType.QUEUE ? 'Enqueue' : 'Publish'} <i
                className="fa fa-play" />
              </Control.button>
            </div>
          </div>

          <div className="input-group input-group-lg">

            <label htmlFor="messageQueue1Listener"
                   className="margin-top-1rem"
            >{this.props.type===MessagingDestinationType.QUEUE ? 'Consumer' : 'Subscriber'}</label>

          </div>

          <div className="input-group input-group-lg">

              <textarea
                className="console"
                rows={5}
                disabled={true}
                value={this.state.consoleContents}
              />

            <p className="help-block">
              The source for this {this.props.type===MessagingDestinationType.QUEUE ? 'consumer' : 'subscriber'}
              may be found in your codebase at <samp>
              <a href={this.props.receiverSourceUrl} className="text-monospace" target="_blank" data-toggle="tooltip"
                 data-placement="bottom" title="Open in GitHub"
              >{this.props.receiverSourceFileName} <i className="fa fa-external-link-square" /></a></samp>
            </p>

          </div>
        </LocalForm>

      </CapabilityElement>
    );
  }

  private sendMessage(e: React.FormEvent<HTMLFormElement>, event: any) {
    const value = event.target[0].value;
    event.target[0].value = '';
    this.logToConsole(value);
  }

  private logToConsole(response: string) {
    this.setState((state: any, props: any) => ({
      consoleContents: formatCurrentTime() + ': ' + response + '\n' + state.consoleContents
    }));
  }
}

const MessagingBroker: React.SFC<IMessagingBroker> = (props) => {

  return (

    <React.Fragment>

      <CapabilityHeader
        capability={CAPABILITIES.messaging}>

        <h2 className="mt-0">{props.messagingBroker.name}</h2>
        <p>
          {props.messagingBroker.description}
        </p>

        <CapabilityElement
          name="Console URL">
          <samp>
            <a href={props.messagingBroker.consoleUrl}
              target="_blank"
              data-toggle="tooltip"
              title="Launch the console for this broker">
              {props.messagingBroker.consoleUrl} <i className="fa fa-external-link-square" />
            </a>
          </samp>
        </CapabilityElement>

        <CapabilityElement
          name="Username">
          <samp>{props.messagingBroker.username}</samp>
        </CapabilityElement>

        <CapabilityElement
          name="Password">
          <samp>{props.messagingBroker.password}</samp>
        </CapabilityElement>

        <CapabilityElement
          name="Image">
          <samp>
            <a href={props.messagingBroker.imageUrl}
              target="_blank"
              data-toggle="tooltip"
              title="Learn more about this image from the catalog documentation">
              {props.messagingBroker.image} <i className="fa fa-external-link-square" />
            </a>
          </samp>
        </CapabilityElement>

        <p className="margin-top-1rem">
          This application contains the following messaging destinations. 
          For your convenince, we have provided mechanisms to both publish 
          and listen to them, so you're all hooked up.
        </p>
      
      </CapabilityHeader>

      <CapabilitySpacer />

      <CapabilityElement
          name="Queues">

      <p>
        <i>Queues</i> define a point-to-point messaging model. There may be many listeners
        upon a queue, but a message will only be processed by one of them. Messages
        remain on the queue until processed.
      </p>
      

      {
        props.messagingBroker.queues.map((queue, i) => {
          return (
            <React.Fragment key={i}>

              <CapabilitySpacer />

              <MessagingDestination
                destination={queue.queue.path}
                type={MessagingDestinationType.QUEUE}
                index={i}
                receiverSourceFileName={queue.queue.consumerSourceFileName}
                receiverSourceUrl={queue.queue.consumerSourceUrl}
                senderSourceFileName={queue.queue.producerSourceFileName}
                senderSourceUrl={queue.queue.producerSourceUrl}
                />

            </React.Fragment>
          );
        })
        
      }

      </CapabilityElement>

      <CapabilitySpacer />

      <CapabilityElement
          name="Topics">

        <p>
          <i>Topics</i> implement the publish/subscribe model of messaging. Many
          listeners may be subscribed to a topic at once, and all may receive
          the message. This is a pattern well-suited to the broadcast of information.
          If a listener is unsubscribed at the time a message is sent to the topic, it
          will not receive that particular message.
        </p>

        {
          props.messagingBroker.topics.map((topic, i) => {
            return (
              <React.Fragment key={i}>

                <CapabilitySpacer />

                <MessagingDestination
                  destination={topic.topic.path}
                  type={MessagingDestinationType.TOPIC}
                  index={i}
                  receiverSourceFileName={topic.topic.subscriberSourceFileName}
                  receiverSourceUrl={topic.topic.subscriberSourceUrl}
                  senderSourceFileName={topic.topic.publisherSourceFileName}
                  senderSourceUrl={topic.topic.publisherSourceUrl}
                  />

              </React.Fragment>
            );
          })
          
        }

      </CapabilityElement>

    </React.Fragment>

  );

}

interface IMessagingDestination {
  readonly index?: number;
  readonly destination: string;
  readonly receiverSourceFileName: string;
  readonly receiverSourceUrl: string;
  readonly senderSourceFileName: string;
  readonly senderSourceUrl: string;
  readonly type : MessagingDestinationType;
}


const Messaging: React.SFC<IMessagingBrokers> = (props) => {
  return (
    <Capability capability={CAPABILITIES.messaging}>

      {
        props.messagingBrokers.map((broker, i) => {
          return (
            <MessagingBroker
              key={i}
              messagingBroker={broker.messagingBroker}
              index={i}
            />
          );
        })
      }

    </Capability>
  );
}

export default Messaging;