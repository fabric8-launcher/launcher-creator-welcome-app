import * as React from 'react';
import {shallow} from 'enzyme';
import RestCapability from '../RestCapability';
import {MockRestCapabilityApi} from '../RestCapabilityApi';


describe('<RestCapability />', () => {
  it('check that initial render is correct', () => {
    const component = shallow(<RestCapability apiService={new MockRestCapabilityApi()}/>);
    expect(component).toMatchSnapshot();
  });

  it('check that a click on the GET button adds a Hello World message in the console', async () => {
    const apiService = new MockRestCapabilityApi();
    const doGetGreetingSpy = jest.spyOn(apiService, 'doGetGreeting');
    const component = shallow(<RestCapability apiService={apiService}/>);
    const result = { content: 'Hello World!', time: 1542793377 };
    const promise = Promise.resolve(result);
    doGetGreetingSpy.mockReturnValue(promise);
    component.find('Button.http').simulate('click');
    expect(doGetGreetingSpy).toHaveBeenCalledWith('');
    await promise;
    component.update();
    expect(component.state('results')).toHaveLength(1);
    expect(component.state('results')[0]).toBe(result);
    expect(component).toMatchSnapshot();
  });

  it('check that after typing a name, a click on the GET button adds a Hello John message in the console', async () => {
    const apiService = new MockRestCapabilityApi();
    const doGetGreetingSpy = jest.spyOn(apiService, 'doGetGreeting');
    const component = shallow(<RestCapability apiService={apiService}/>);
    component.find('TextInput#http-api-name-input').simulate('change', false, { target: { name: 'name', value: 'John'} });
    const result = { content: 'Hello John!', time: 1542793377 };
    const promise = Promise.resolve(result);
    doGetGreetingSpy.mockReturnValue(promise);
    component.find('Button.http').simulate('click');
    expect(doGetGreetingSpy).toHaveBeenCalledWith('John');
    await promise;
    component.update();
    expect(component.state('results')).toHaveLength(1);
    expect(component.state('results')[0]).toBe(result);
    expect(component).toMatchSnapshot();
  });

});

