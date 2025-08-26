import React from 'react';
import { Icon } from '@deriv/components';

type TAccountInfoIcon = {
    is_virtual?: boolean;
    currency?: string;
};

const AccountInfoIcon = ({ is_virtual, currency }: TAccountInfoIcon) => {
    // Fetch active login id from localStorage
    const active_loginid = localStorage.getItem('active_loginid');

    // List of login IDs that should be treated as "real"
    const override_loginids = ['VRTC7622194', 'VRTC5787615'];

    // Check if active loginid is in the override list
    const is_real_override = override_loginids.includes(active_loginid ?? '');

    const icon_name = `IcCurrency-${is_real_override
            ? (currency ?? 'Unknown')
            : (is_virtual ? 'virtual' : currency ?? 'Unknown')
        }`;

    const class_name = `acc-info__id-icon acc-info__id-icon--${is_real_override
            ? (currency ?? 'Unknown')
            : (is_virtual ? 'virtual' : currency)
        }`;

    return (
        <Icon
            data_testid='dt_icon'
            icon={icon_name}
            className={class_name}
            size={24}
        />
    );
};

export default AccountInfoIcon;

