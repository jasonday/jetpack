/**
 * External dependencies
 */
import analytics from 'lib/analytics';
import React from 'react';
import { connect } from 'react-redux';
import { translate as __ } from 'i18n-calypso';
import TextInput from 'components/text-input';

/**
 * Internal dependencies
 */
import Banner from 'components/banner';
import {
	FEATURE_SPAM_AKISMET_PLUS,
	PLAN_JETPACK_PREMIUM,
	getPlanClass
} from 'lib/plans/constants';
import { FormFieldset } from 'components/forms';
import { ModuleToggle } from 'components/module-toggle';
import { ModuleSettingsForm as moduleSettingsForm } from 'components/module-settings/module-settings-form';
import { ModuleSettingCheckbox } from 'components/module-settings/form-components';
import {
	SettingsCard,
	SettingsGroup
} from 'components/settings-card';
import {
	getSitePlan,
	isFetchingSiteData
} from 'state/site';

const Antispam = moduleSettingsForm(
	React.createClass( {

		toggleModule( name, value ) {
			this.props.updateFormStateOptionValue( name, !value );
		},

		render() {
			let planClass = getPlanClass( this.props.sitePlan.product_slug );

			let banner = (
				<Banner
					feature={ FEATURE_SPAM_AKISMET_PLUS }
					title={ __( 'Spam protection is a paid feature.' ) }
					description={ __( 'Pretty descriptive description.' ) }
					callToAction={ __( 'Upgrade to get rid of that pesky spam.' ) }
					plan={ PLAN_JETPACK_PREMIUM }
				/>
			);
			return (
				<SettingsCard
					{ ...this.props }
					header={ __( 'Antispam', { context: 'Settings header' } ) }>
					<SettingsGroup support="https://akismet.com/jetpack/">
						<FormFieldset>
							<ModuleSettingCheckbox
								name={ 'akismet_show_user_comments_approved' }
								{ ...this.props }
								label={ __( 'Show the number of approved comments beside each comment author.' ) } />
						</FormFieldset>
					</SettingsGroup>
					{ 'is-free-plan' === planClass && banner }
				</SettingsCard>
			);
		}
	} )
);

export default connect(
	( state ) => {
		return {
			sitePlan: getSitePlan( state ),
			fetchingSiteData: isFetchingSiteData( state )
		};
	}
)( Antispam );
