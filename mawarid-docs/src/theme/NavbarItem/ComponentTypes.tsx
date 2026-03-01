import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import SignOutNavbarItem from '@site/src/components/SignOutNavbarItem';
import UserProfileDropdown from '@site/src/components/UserProfileDropdown';

export default {
    ...ComponentTypes,
    'custom-sign-out': SignOutNavbarItem,
    'custom-userProfile': UserProfileDropdown,
} as typeof ComponentTypes;
