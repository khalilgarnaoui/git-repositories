import React from 'react';
import { mount } from 'enzyme';
import { Home } from '../Components/Home';
import App from '../App';
import { MemoryRouter } from 'react-router';

describe('routes using memory router', () => {

    it('should show Home component for / router (using memory router)', () => {
        const component = mount(<MemoryRouter initialentries="{['/']}">
            <App />
        </Memoryrouter>
        );
        expect(component.find(Home)).toHaveLength(1);
    })

})