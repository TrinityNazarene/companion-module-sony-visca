const COLORS = require('./colors')

module.exports = (self) => {
	const feedbacks = {
		heldFeedback: {
			type: 'boolean',
			name: 'Button Hold Time Reached',
			description: 'Indicate if button is held long enough for secondary action',
			defaultStyle: {
				color: COLORS.BLACK,
				bgcolor: COLORS.YELLOW,
			},
			options: [],
			callback: function () {
				return self.data.heldThresholdReached
			},
		},
		lastPresetUsed: {
			type: 'boolean',
			name: 'Last Preset Used',
			description: 'Highlight the last preset used',
			defaultStyle: {
				color: COLORS.BLACK,
				bgcolor: COLORS.WHITE,
			},
			options: [],
			callback: function (feedback) {
				console.log('feedback:')
				console.dir(feedback)
				return self.data.heldThresholdReached
			},
		},
		zoomMode: {
			type: 'boolean',
			name: 'Lens - Zoom Mode',
			description: 'Indicate Zoom Mode',
			defaultStyle: {
				color: COLORS.WHITE,
				bgcolor: COLORS.BLACK,
				text: 'Optical\\nZoom',
			},
			options: [
				{
					type: 'dropdown',
					label: 'Zoom Mode',
					id: 'option',
					default: '3',
					choices: [
						{ id: '3', label: 'Optical Only' },
						{ id: '4', label: 'Clear Image' },
						{ id: '2', label: 'Digital Only' },
					],
				},
			],
			callback: function (feedback) {
				switch (feedback.options.option) {
					case '3':
						if (self.data.zoomMode === '3') {
							return true
						}
						break
					case '2':
						if (self.data.zoomMode === '2') {
							return true
						}
						break
					case '4':
						if (self.data.zoomMode === '4') {
							return true
						}
						break
					default:
						break
				}
				return false
			},
		},
		autoFocus: {
			type: 'boolean',
			name: 'Lens - Auto Focus State',
			description: 'Indicate if Auto focus is ON or OFF',
			defaultStyle: {
				color: COLORS.WHITE,
				bgcolor: COLORS.DARK_RED,
				text: 'Auto\\nFocus',
			},
			options: [
				{
					type: 'dropdown',
					label: 'Focus Mode',
					id: 'option',
					default: '1',
					choices: [
						{ id: '0', label: 'Manual' },
						{ id: '1', label: 'Auto' },
					],
				},
			],
			callback: function (feedback) {
				switch (feedback.options.option) {
					case '0':
						if (self.data.oaf === 'Manual') {
							return true
						}
						break
					case '1':
						if (self.data.oaf === 'Auto') {
							return true
						}
						break
					default:
						break
				}
				return false
			},
		},
		exposureAll: {
			type: 'boolean',
			name: 'Exposure Mode',
			description: 'Indicates the Exposure Mode set',
			defaultStyle: {
				color: COLORS.WHITE,
				bgcolor: COLORS.DARK_YELLOW,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Exposure Mode',
					id: 'option',
					default: '0',
					choices: [
						{ id: '0', label: 'Auto' },
						{ id: '1', label: 'Manual' },
						{ id: '2', label: 'Iris Priority' },
						{ id: '3', label: 'Shutter Priority' },
						{ id: '4', label: 'Gain Priority' },
						{ id: '5', label: 'Bright' },
					],
				},
			],
			callback: function (feedback) {
				var choices = this.options[0].choices;
				var choice = choices.find(x => x.id == feedback.options.option);
				return choice && choice.label == self.data.exposureMode;
			},
		},
		exposureAuto: {
			type: 'boolean',
			name: 'Auto Exposure Mode',
			description: 'Indicates if Exposure Mode is set to Full Auto',
			defaultStyle: {
				color: COLORS.WHITE,
				bgcolor: COLORS.DARK_YELLOW,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Exposure Mode',
					id: 'option',
					default: '0',
					choices: [
						{ id: '0', label: 'Other' },
						{ id: '1', label: 'Auto' },
					],
				},
			],
			callback: function (feedback) {
				if (feedback.options.option === '1' && self.data.exposureMode === 'Auto') return true
				if (feedback.options.option === '0' && self.data.exposureMode !== 'Auto') return true
				return false
			},
		},
		exposureManual: {
			type: 'boolean',
			name: 'Manual Exposure Mode',
			description: 'Indicates if Exposure Mode is set to Manual',
			defaultStyle: {
				color: COLORS.WHITE,
				bgcolor: COLORS.BLACK,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Exposure Mode',
					id: 'option',
					default: '1',
					choices: [
						{ id: '0', label: 'Other' },
						{ id: '1', label: 'Manual' },
					],
				},
			],
			callback: function (feedback) {
				if (feedback.options.option === '1' && self.data.exposureMode === 'Manual') return true
				if (feedback.options.option === '0' && self.data.exposureMode !== 'Manual') return true
				return false
			},
		},
		exposureIrisPriority: {
			type: 'boolean',
			name: 'Iris Exposure Mode',
			description: 'Indicates if Exposure Mode is set to Iris Priority',
			defaultStyle: {
				color: COLORS.WHITE,
				bgcolor: COLORS.BLACK,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Exposure Mode',
					id: 'option',
					default: '1',
					choices: [
						{ id: '0', label: 'Other' },
						{ id: '1', label: 'Iris Priority' },
					],
				},
			],
			callback: function (feedback) {
				if (feedback.options.option === '1' && self.data.exposureMode === 'Iris Priority') return true
				if (feedback.options.option === '0' && self.data.exposureMode !== 'Iris Priority') return true
				return false
			},
		},
		exposureShutterPriority: {
			type: 'boolean',
			name: 'Shutter Exposure Mode',
			description: 'Indicates if Exposure Mode is set to Shutter Priority',
			defaultStyle: {
				color: COLORS.WHITE,
				bgcolor: COLORS.BLACK,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Exposure Mode',
					id: 'option',
					default: '1',
					choices: [
						{ id: '0', label: 'Other' },
						{ id: '1', label: 'Shutter Priority' },
					],
				},
			],
			callback: function (feedback) {
				if (feedback.options.option === '1' && self.data.exposureMode === 'Shutter Priority') return true
				if (feedback.options.option === '0' && self.data.exposureMode !== 'Shutter Priority') return true
				return false
			},
		},
		exposureGainPriority: {
			type: 'boolean',
			name: 'Gain Exposure Mode',
			description: 'Indicates if Exposure Mode is set to Gain Priority',
			defaultStyle: {
				color: COLORS.WHITE,
				bgcolor: COLORS.BLACK,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Exposure Mode',
					id: 'option',
					default: '1',
					choices: [
						{ id: '0', label: 'Other' },
						{ id: '1', label: 'Gain Priority' },
					],
				},
			],
			callback: function (feedback) {
				if (feedback.options.option === '1' && self.data.exposureMode === 'Gain Priority') return true
				if (feedback.options.option === '0' && self.data.exposureMode !== 'Gain Priority') return true
				return false
			},
		},
		exposureBright: {
			type: 'boolean',
			name: 'Bright Exposure Mode',
			description: 'Indicates if Exposure Mode is set to Bright',
			defaultStyle: {
				color: COLORS.WHITE,
				bgcolor: COLORS.BLACK,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Exposure Mode',
					id: 'option',
					default: '1',
					choices: [
						{ id: '0', label: 'Other' },
						{ id: '1', label: 'Bright' },
					],
				}
			],
			callback: function (feedback) {
				if (feedback.options.option === '1' && self.data.exposureMode === 'Bright') return true
				if (feedback.options.option === '0' && self.data.exposureMode !== 'Bright') return true
				return false;
			},
		},
		exposureCompOnOff: {
			type: 'boolean',
			name: 'Exposure Compensation On/Off',
			description: 'Indicate if Exposure Compensation is ON or OFF',
			defaultStyle: {
				color: COLORS.BLACK,
				bgcolor: COLORS.PALE_YELLOW,
				text: 'ExpCmp\\nOn',
			},
			options: [
				{
					type: 'dropdown',
					label: 'Exposure Compensation',
					id: 'option',
					default: '1',
					choices: [
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'On' },
					],
				},
			],
			callback: function (feedback) {
				switch (feedback.options.option) {
					case '0':
						if (self.data.expCompState === 'Off') {
							return true
						}
						break
					case '1':
						if (self.data.expCompState === 'On') {
							return true
						}
						break
					default:
						break
				}
				return false
			},
		},
		backlightCompOnOff: {
			type: 'boolean',
			name: 'Backlight Compensation On/Off',
			description: 'Indicate if Backlight Compensation is ON or OFF',
			defaultStyle: {
				color: COLORS.WHITE,
				bgcolor: COLORS.Black,
				text: 'BckLite\\nOff',
			},
			options: [
				{
					type: 'dropdown',
					label: 'BackLight Compensation',
					id: 'option',
					default: '0',
					choices: [
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'On' },
					],
				},
			],
			callback: function (feedback) {
				switch (feedback.options.option) {
					case '0':
						if (self.data.backlightComp === 'Off') {
							return true
						}
						break
					case '1':
						if (self.data.backlightComp === 'On') {
							return true
						}
						break
					default:
						break
				}
				return false
			},
		},
		spotlightCompOnOff: {
			type: 'boolean',
			name: 'Spotlight Compensation On/Off',
			description: 'Indicate if Spotlight Compensation is ON or OFF',
			defaultStyle: {
				color: COLORS.WHITE,
				bgcolor: COLORS.Black,
				text: 'SptLite\\nOff',
			},
			options: [
				{
					type: 'dropdown',
					label: 'Spotlight Compensation',
					id: 'option',
					default: '0',
					choices: [
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'On' },
					],
				},
			],
			callback: function (feedback) {
				switch (feedback.options.option) {
					case '0':
						if (self.data.spotlightComp === 'Off') {
							return true
						}
						break
					case '1':
						if (self.data.spotlightComp === 'On') {
							return true
						}
						break
					default:
						break
				}
				return false
			},
		},
	}

	return feedbacks
}
