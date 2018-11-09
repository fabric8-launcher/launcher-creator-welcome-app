import * as React from 'react';
import ICapability, { ICapabilityElement } from './Capability';

const Capability: React.SFC<ICapability> = (props) => {

  return (
    <div>
      <a id={'nav-capability-' + props.capability.id}/>
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <i className={props.capability.iconClasses}/> {props.capability.name}
          </div>
        </div>
        <div className="panel-body">

          {props.children}

        </div>
      </div>
    </div>
  );

}

export const CapabilityHeader: React.SFC<ICapability> = (props) => {
  return (
    <div className="row">
      { props.capability.imageURL ? (
        <React.Fragment>
          <div className="col-sm-2">
            <img src={props.capability.imageURL}
              className="img-responsive" 
              alt={props.capability.imageAlt} />
          </div>
          <div className="col-sm-10">
            {props.children}
          </div>
        </React.Fragment>
      ) : (
      <div className="col-sm-12">
        {props.children}
      </div>
      )
    }
    </div>
  );
}

export const CapabilitySpacer: React.SFC = (props) => {
  return (
    <div className="row">
      <div className="col-sm-12">
        <hr />
      </div>
    </div>
  );
}

export const CapabilityElement: React.SFC<ICapabilityElement> = (props) => {
  const icon = props.iconClasses ? <i className={props.iconClasses} /> : '';
  const name = props.url ? (<a 
    href={props.url} 
    data-toggle="tooltip"
    title={props.tooltip}
    target="_blank" >{props.name} <i className="fa fa-external-link-square" /></a>
    )
    :
    (props.name)
  // Default classes to apply to the name is bold
  const classes = props.classes ? props.classes : 'text-bold';
  const firstColSize = props.firstColSize ? props.firstColSize : 2;
  const secondColSize = 12-firstColSize;
  return (
    <div className="row">
      <div className={'col-sm-' + firstColSize}>
        {icon} <span className={classes}>{name}</span>
      </div>
      <div className={'col-sm-' + secondColSize}>
        {props.children}
      </div>
    </div>
  );
}

export default Capability;