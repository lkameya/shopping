import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Nav from '../index';

describe('<Nav />', () => {
  it('renders', () => {
    const wrapper = shallow(<Nav />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
