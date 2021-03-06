import React, {Fragment} from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Box from 'reusecore/src/elements/Box';
import Text from 'reusecore/src/elements/Text';
import Heading from 'reusecore/src/elements/Heading';
import Logo from 'reusecore/src/elements/UI/Logo';
import Container from 'common/src/components/UI/Container';
import FooterWrapper, { List, ListItem } from './footer.style';
import Link from 'gatsby-link';
import LogoImage from 'common/src/assets/image/rentivo-logo.svg';

const Footer = ({
  row,
  col,
  colOne,
  colTwo,
  titleStyle,
  logoStyle,
  textStyle,
}) => {
  const Data = useStaticQuery(graphql`
    query {
      allContentfulMenu(filter: {category: {eq: "Footer"}}, sort: {fields: weight, order: ASC}) {
        edges {
          node {
            id
            title
            menuItems {
              text
              url
              to
              parentBlank
              id
            }
          }
        }
      }
    }
  `);
  return (
    <FooterWrapper>
      <Container className="footer_container">
        <Box className="row" {...row}>
          <Box {...colOne}>
            <Logo
              href="#"
              logoSrc={LogoImage}
              title="Rentivo Logo"
              logoStyle={logoStyle}
            />
          </Box>
          {/* End of footer logo column */}
          <Box {...colTwo}>
            {Data.allContentfulMenu.edges.map(({node }, index) => (
              <Box className="col" {...col} key={`footer-widget-${index}`}>
                <Heading content={node.title} {...titleStyle} />
                <List>
                  {node.menuItems.map((item, index) => (
                    <ListItem key={`footer-list-item-${item.id}`}>
                      { item && item.to &&
                        <Link to={item.to} className="ListItem">
                          {item.text}
                        </Link>
                      }
                      { item && item.url &&
                        <a href={item.url} className="ListItem">
                          {item.text}
                        </a>
                      }
                     
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Box>
          {/* End of footer List column */}
        </Box>
      </Container>
    </FooterWrapper>
  );
};

// Footer style props
Footer.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
  colOne: PropTypes.object,
  colTwo: PropTypes.object,
  titleStyle: PropTypes.object,
  textStyle: PropTypes.object,
  logoStyle: PropTypes.object,
};

// Footer default style
Footer.defaultProps = {
  // Footer row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
  },
  // Footer col one style
  colOne: {
    width: [1, '35%', '35%', '23%'],
    mt: [0, '13px'],
    mb: ['30px', 0],
    pl: ['15px', 0],
    pr: ['15px', '15px', 0],
  },
  // Footer col two style
  colTwo: {
    width: ['100%', '65%', '65%', '77%'],
    flexBox: true,
    flexWrap: 'wrap',
  },
  // Footer col default style
  col: {
    width: ['100%', '50%', '50%', '25%'],
    pl: '15px',
    pr: '15px',
    mb: '30px',
  },
  // widget title default style
  titleStyle: {
    color: '#343d48',
    fontSize: '16px',
    fontWeight: '700',
    mb: '30px',
  },
  // Default logo size
  logoStyle: {
    width: '100px',
    mb: '15px',
  },
  // widget text default style
  textStyle: {
    color: '#0f2137',
    fontSize: '16px',
    mb: '10px',
  },
};

export default Footer;
