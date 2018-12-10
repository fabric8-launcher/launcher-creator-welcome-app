import * as React from 'react';
import {shallow} from 'enzyme';
import HealthChecksCapability from '../HealthChecksCapability';
import {MockHealthChecksCapabilityApi} from '../HealthChecksCapabilityApi';
import HttpRequest from '../../../../shared/components/HttpRequest';

const extra = {
  sourceMapping: {
    greetingEndpoint: 'src/main/java/org/your/GreetingApi.java',
  },
}

describe('<HealthChecksCapability />', () => {
  it('check that initial render is correct', () => {
    const component = shallow(<HealthChecksCapability apiService={new MockHealthChecksCapabilityApi()}/>);
    expect(component).toMatchSnapshot();
  });

  it('check that readiness is working', async () => {
    const apiService = new MockHealthChecksCapabilityApi();
    const doGetReadiness = jest.spyOn(apiService, 'doGetReadiness');
    const component = shallow(<HealthChecksCapability apiService={apiService}/>);
    const result = { content: 'OK', time: 1542793377 };
    const promise = Promise.resolve(result);
    doGetReadiness.mockReturnValue(promise);
    component.find(HttpRequest).at(1).prop('onExecute')();
    expect(doGetReadiness).toHaveBeenCalled();
    await promise;
    component.update();
    expect(component.state('results')).toHaveLength(1);
    expect(component.state('results')[0].content).toBe(result.content);
    expect(component).toMatchSnapshot();
  });


});

