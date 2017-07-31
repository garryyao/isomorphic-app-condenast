// Make Enzyme functions available in all test files without importing
import {shallow, render, mount} from 'enzyme';
import sinon from 'sinon'

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon