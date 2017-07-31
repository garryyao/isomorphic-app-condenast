import React from 'react';
import App from './App';
import fetchMock from 'fetch-mock';
import Promise from 'bluebird';
import {MemoryRouter} from 'react-router-dom'
import Config from './Config'
import toJson from 'enzyme-to-json'

jest.mock('./Router', () => {
  return ({children}) => {
    return <div>{children}</div>
  }
})

const mockFetch = fetchMock.sandbox().get(Config.apiUrl, require('../public/api-data.json'))
sinon.stub(global, 'fetch').callsFake(()=> {
  return mockFetch(Config.apiUrl)
})

// This function filter out any property that is unstable across test runs.
const snapshotFilter = function(key, val) {

  // React-router passing "history" and "location" properties should be ignored
  if(key === 'history' || key === 'location' || key === 'articles') { return }
  return val
}

function snapshot(node) {
  return JSON.stringify(toJson(node), snapshotFilter, '\t')
}

function expectNodeToMatchSnapshot(node) {
  expect(snapshot(node)).toMatchSnapshot();
}

test('renders initial loading screen', () => {

  const wrapper = mount(
    <MemoryRouter
      initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )
  expectNodeToMatchSnapshot(wrapper.find('App'))
});

test('renders list of articles', () => {
  const wrapper = mount(
    <MemoryRouter
      initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )

  return Promise.delay().then(()=> {
    expectNodeToMatchSnapshot(wrapper.find('ArticleList'))
  })
});

test('renders one article', () => {
  const wrapper = mount(
    <MemoryRouter
      initialEntries={['/article/1']}>
      <App />
    </MemoryRouter>
  )
  return Promise.delay().then(() => {
    expectNodeToMatchSnapshot(wrapper.find('Article'))
  })
});

test('renders one article (not found )', () => {
  const wrapper = mount(
    <MemoryRouter
      initialEntries={['/article/123']}>
      <App />
    </MemoryRouter>
  )
  return Promise.delay().then(() => {
    expectNodeToMatchSnapshot(wrapper.find('NotFound'))
  })
});
