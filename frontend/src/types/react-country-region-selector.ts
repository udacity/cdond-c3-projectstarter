declare module 'react-country-region-selector' {
  import { InputHTMLAttributes } from 'react';

  interface Region {
    name: string;
    shortCode: string;
  }

  interface Country {
    countryName: string;
    countryShortCode: string;
    regions: Region[];
  }

  interface ReactCountryDropdownProps extends InputHTMLAttributes<string> {
    value: string;
    classes?: string;
    showDefaultOption?: boolean;
    defaultOptionLabel?: string | number;
    labelType?: number;
    valueType?: 'short' | 'full';
    whitelist?: string[];
    blacklist?: string[];
  }

  interface ReactRegionDropdownProps extends InputHTMLAttributes<string> {
    country: string;
    value: string | number;
    classes?: string;
    showDefaultOption?: boolean;
    defaultOptionLabel?: string | number;
    labelType?: number;
    countryValueType?: 'short' | 'full';
    whitelist?: string[];
    blacklist?: string[];
    disableWhenEmpty?: boolean;
  }

  class CountryDropdown extends React.Component<ReactCountryDropdownProps> {}
  class RegionDropdown extends React.Component<ReactRegionDropdownProps> {}

  const CountryRegionData: Country[];

  export { CountryDropdown, RegionDropdown, CountryRegionData };
}
