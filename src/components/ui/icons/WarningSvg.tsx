import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

function WarningSvg(props: SvgProps) {
  const scheme = useColorScheme();
  const pathFill = props.fill || Colors[scheme].text;
  return (
    <Svg viewBox="0 0 48 48" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M39 8H9C8.44771 8 8 8.44772 8 9V39C8 39.5523 8.44772 40 9 40H39C39.5523 40 40 39.5523 40 39V9C40 8.44772 39.5523 8 39 8ZM9 6C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6H9Z"
        fill={pathFill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.4888 16.3299C18.8459 16.6137 17.6486 18.0059 17.4535 19.6617L16 32H32L30.5445 19.645C30.3504 17.9974 29.1644 16.6076 27.5302 16.3218C25.0797 15.8934 23.0381 15.8894 20.4888 16.3299ZM21.7302 20.6478C21.7987 20.0998 21.4099 19.6 20.8619 19.5315C20.3139 19.463 19.8141 19.8517 19.7456 20.3998L18.8409 27.6379C18.7723 28.1859 19.1611 28.6857 19.7091 28.7542C20.2571 28.8227 20.7569 28.434 20.8254 27.8859L21.7302 20.6478Z"
        fill={pathFill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.4744 18.0768C23.3452 18.6959 23.8565 19.7614 23.7147 20.8959L22.81 28.134C22.7163 28.8836 22.3536 29.5338 21.8309 30H29.7506L28.5583 19.879C28.4559 19.0099 27.8543 18.4088 27.1858 18.2919C25.5147 17.9998 24.076 17.9246 22.4744 18.0768ZM30.5445 19.645C30.3504 17.9974 29.1644 16.6076 27.5302 16.3218C25.0797 15.8934 23.0381 15.8894 20.4888 16.3299C18.8459 16.6137 17.6486 18.0059 17.4535 19.6617L16 32H32L30.5445 19.645ZM21.7302 20.6478L20.8254 27.8859C20.7569 28.434 20.2571 28.8227 19.7091 28.7542C19.1611 28.6857 18.7723 28.1859 18.8409 27.6379L19.7456 20.3998C19.8141 19.8517 20.3139 19.463 20.8619 19.5315C21.4099 19.6 21.7987 20.0998 21.7302 20.6478Z"
        fill={pathFill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33 36H15V34H33V36Z"
        fill={pathFill}
      />
      <Path
        d="M13 24C13 24.3371 13.0152 24.6706 13.0448 25H10V23H13.0448C13.0152 23.3294 13 23.6629 13 24Z"
        fill={pathFill}
      />
      <Path
        d="M15.0124 17.6563C14.6285 18.1991 14.2927 18.7782 14.0109 19.3875L11.3756 17.866L12.3756 16.134L15.0124 17.6563Z"
        fill={pathFill}
      />
      <Path
        d="M19.3875 14.0109C18.7782 14.2927 18.1991 14.6286 17.6563 15.0124L16.134 12.3757L17.866 11.3757L19.3875 14.0109Z"
        fill={pathFill}
      />
      <Path
        d="M24 13C23.6629 13 23.3294 13.0152 23 13.0448V10H25V13.0448C24.6706 13.0152 24.3371 13 24 13Z"
        fill={pathFill}
      />
      <Path
        d="M30.3437 15.0124C29.8009 14.6286 29.2218 14.2927 28.6125 14.0109L30.134 11.3757L31.866 12.3757L30.3437 15.0124Z"
        fill={pathFill}
      />
      <Path
        d="M33.9891 19.3875C33.7073 18.7782 33.3715 18.1991 32.9876 17.6563L35.6244 16.134L36.6244 17.866L33.9891 19.3875Z"
        fill={pathFill}
      />
      <Path
        d="M35 24C35 23.6629 34.9848 23.3294 34.9552 23H38V25H34.9552C34.9848 24.6706 35 24.3371 35 24Z"
        fill={pathFill}
      />
    </Svg>
  );
}

export default WarningSvg;