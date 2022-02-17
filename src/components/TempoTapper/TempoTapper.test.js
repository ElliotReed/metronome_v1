import React from 'react';
import ReactDom from 'react-dom';
import TempoTapper from './TempoTapper';
import { calculteBeatsPerMinute } from './TempoTapper';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDom.render(<TempoTapper />, div);
	ReactDom.unmountComponentAtNode(div);
});

it('returns BPM', () => {
	const tap1 = new Date();
	const tap2 = new Date(tap1.getTime() + 2000);
	const taps = [tap1, tap2];
	expect(calculteBeatsPerMinute(taps)).toBe(60);
});
