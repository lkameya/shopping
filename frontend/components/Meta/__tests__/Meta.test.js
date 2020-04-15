import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Meta from '../index';

describe('<Meta />', () => {
  it('renders', () => {
    const wrapper = shallow(<Meta />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
